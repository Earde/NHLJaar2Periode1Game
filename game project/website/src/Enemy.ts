class Enemy extends MeshLoader {
    enemyID = -1;
    active = false;
    health = 100;
    score = 0;
    oldPosition = new THREE.Vector2();
    newestPosition = new THREE.Vector2();

    movementTime = 0;

    constructor(w, h) {
        super(new THREE.CylinderGeometry(w, w, h), new THREE.Material(), w, h, w);
    }

    load(scene) {
        let material = this.createMaterial(true, THREE.DoubleSide, 1, 1, "textures/heightmap.png");
        this.material = material;
        super.load(scene);
    }

    reset() {
        this.active = false;
        this.health = 0;
        this.enemyID = -1;
    }

    update(delta, creator) {
        if (this.active) {
            this.visible = true;
            this.move(delta, creator);
        } else {
            this.visible = false;
        }
    }

    move(delta, creator) {
        this.movementTime += delta;
        if (this.movementTime > creator.tickTime) {
            this.movementTime = creator.tickTime;
        }
        let lerp = new THREE.Vector2().lerpVectors(this.oldPosition, this.newestPosition, this.movementTime / creator.tickTime);
        this.position.x = lerp.x;
        this.position.z = lerp.y;
        this.position.y = creator.heightmap.getHeightAt(this.position) + this.height / 2;
    }

    forceUpdateFromNetwork(data, creator) {
        this.active = true;
        this.enemyID = data.id;
        this.position.set(creator.heightmap.width * data.percentagex - creator.heightmap.width / 2, 0, creator.heightmap.depth * data.percentagez - creator.heightmap.depth / 2);
    }

    updateFromNetwork(data) {
        this.active = true;
        this.oldPosition.set(this.newestPosition.x, this.newestPosition.y);
        this.newestPosition.set(data.posx, data.posz);
        this.movementTime = 0;
        this.health = data.health;
        this.score = data.score;
    }
}