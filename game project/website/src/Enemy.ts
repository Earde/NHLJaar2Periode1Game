class Enemy extends MeshLoader {
    enemyID = -1;
    active = false;
    health = 100;
    score = 0;
    oldPosition = new THREE.Vector2();
    newestPosition = new THREE.Vector2();
    oldTheta = 0;
    newTheta = 0;

    movementTime = 0;

    constructor() {
        super(new THREE.Geometry(), new THREE.Material(), 0, 0, 0);
    }

    loadObject(obj, scene, scale) {
        super.loadObject(obj, scene, scale);
        this.position.set(0, 0, 0);
        this.rotateX(-Math.PI / 2);
        this.material.side = THREE.DoubleSide;
        this.material.needsUpdate = true;
    }

    reset() {
        this.active = false;
        this.health = 0;
        this.enemyID = -1;
    }

    update(delta, creator) {
        if (this.loaded) {
            if (this.active) {
                this.visible = true;
                this.move(delta, creator);
            } else {
                this.visible = false;
            }
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
        this.position.y = creator.heightmap.getHeightAt(this.position);
        let theta = this.oldTheta + (this.newTheta - this.oldTheta) * (this.movementTime / creator.tickTime);
        this.lookAt(new THREE.Vector3(this.position.x + Math.cos(theta) * 5, this.position.y, this.position.z + Math.sin(theta) * 5));
        this.rotateX(-Math.PI / 2);
        this.updateMatrixWorld(true);
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
        this.oldTheta = this.newTheta;
        this.newTheta = data.longitude * Math.PI / 180;
        this.movementTime = 0;
        this.health = data.health;
        this.score = data.score;
    }
}