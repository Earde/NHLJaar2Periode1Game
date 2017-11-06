class SceneCreator {
    scene;

    skybox: Skybox;
    heightmap: Heightmap;
    player: Player;
    weapon: Weapon;
    camera: Camera;
    crosshair: Crosshair;

    lights; //Light[]

    bullet: Bullet;

    enemies;
    enemyBullets;

    text2D;

    models;

    tickTime = 0.02;

    constructor(s) {
        this.scene = s;
    }

    createObjects = async() => {
        this.models = [];
        this.skybox = new Skybox(3000, 3000, 3000);
        this.heightmap = new Heightmap(750, 50, 750);
        this.camera = new Camera();
        this.player = new Player();
        //0xAAFFAA = classic groene crosshair
        //rood 0xFF1111
        this.crosshair = new Crosshair(0.01, 0.01, 1, 0xEEEEEE);
        let lightColor = 0xffffff;
        this.lights = [];
        let lightOrigin = new THREE.Vector3(-(this.skybox.width / 2), this.skybox.height / 3, -(this.skybox.depth / 2) / 4);
        this.lights.push(new DirectLight(lightOrigin.x, lightOrigin.y, lightOrigin.z, lightColor));
        this.lights.push(new THREE.AmbientLight(lightColor, 1));
        let enemyCountMax = 20;
        this.enemies = [];
        this.enemyBullets = [];
        for (let i = 0; i < enemyCountMax; i++) {
            this.enemies.push(new Enemy());
            this.enemyBullets.push(new EnemyBullet());
        }
        this.text2D = new Text2D(50, 25, 35);
        this.text2D.createText("0");
        this.weapon = new Weapon();
        this.bullet = new Bullet();
        await this.loadObjects();
    };

    loadObjects = async() => {
        this.skybox.load(this.scene);
        this.heightmap.load(this.scene);
        this.scene.add(this.camera);
        this.crosshair.load(this.camera);
        for (let i = 0; i < this.lights.length; i++) {
            this.scene.add(this.lights[i]);
        }
        this.bullet.load();
    };

    loadModels(n) {
        if (n == 0) {
            this.weapon.loadObject(this.models[n], this.camera, new THREE.Vector3(0.06, 0.06, 0.06));
            this.camera.resizeChildren();
        } else if (n == 1) {
            this.player.loadObject(this.models[n], this.camera, new THREE.Vector3(3, 3, 3));
            for (let i = 0; i < this.enemies.length; i++) {
                this.enemies[i].loadObject(this.models[n], this.scene, new THREE.Vector3(3, 3, 3));
            }
        }
    }

    failed(error) {
        console.log(error);
    }

    load() {
        try {
            this.createObjects();
        } catch (error) {
            this.failed(error);
        }
    }
}