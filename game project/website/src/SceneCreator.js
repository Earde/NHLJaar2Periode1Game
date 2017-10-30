var SceneCreator = (function () {
    function SceneCreator(s) {
        this.tickTime = 0.02;
        this.scene = s;
    }
    SceneCreator.prototype.load = function () {
        this.skybox = new Skybox(3000, 3000, 3000);
        this.skybox.load(scene);
        this.heightmap = new Heightmap(750, 50, 750);
        this.heightmap.load(scene);
        this.camera = new Camera();
        this.player = new Player(2, 16);
        this.player.load(this.camera);
        this.weapon = new Weapon(0.1, 1, 0.1);
        this.weapon.load(this.camera);
        //0xAAFFAA = classic groene crosshair
        this.crosshair = new Crosshair(0.01, 0.01, 1, 0xFF1111);
        this.crosshair.load(this.camera);
        var lightColor = 0xffffff;
        this.lights = [];
        this.lights.push(new Light(0, this.heightmap.height * 5, 0, lightColor));
        this.lights.push(new THREE.AmbientLight(lightColor, 1));
        for (var i = 0; i < this.lights.length; i++) {
            scene.add(this.lights[i]);
        }
        this.bullet = new Bullet();
        this.bullet.load();
        var enemyCountMax = 20;
        this.enemies = [];
        this.enemyBullets = [];
        for (var i = 0; i < enemyCountMax; i++) {
            this.enemies.push(new Enemy(this.player.width, this.player.height));
            this.enemyBullets.push(new EnemyBullet());
            this.enemies[i].load(scene);
            this.enemyBullets[i].load();
        }
        this.text2D = new Text2D(50, 25, 35);
        this.text2D.load(this.scene);
        this.text2D.createText("0");
        scene.add(this.camera);
        this.camera.resizeChildren();
    };
    return SceneCreator;
}());
//# sourceMappingURL=SceneCreator.js.map