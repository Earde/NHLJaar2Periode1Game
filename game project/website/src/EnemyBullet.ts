class EnemyBullet extends Bullet {
    enemyID = -1;
    active = false;

    constructor() {
        super();
    }

    updateFromNetwork(network, creator, data) {
        if (this.enemyID == data.id) {
            this.active = true;
            let geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(data.startx, data.starty, data.startz));
            geometry.vertices.push(new THREE.Vector3(data.endx, data.endy, data.endz));
            this.geometry = geometry;
            creator.scene.add(this);
            this.checkForHit(network, creator, data);
        }
    }

    checkForHit(network, creator, data) {
        let rayCaster = new THREE.Raycaster(new THREE.Vector3(data.startx, data.starty, data.startz),
            new THREE.Vector3(data.endx - data.startx, data.endy - data.starty, data.endz - data.startz).normalize());
        creator.player.geometry.verticesNeedUpdate = true;
        creator.player.geometry.normalsNeedUpdate = true;
        creator.player.geometry.computeFaceNormals();
        creator.player.geometry.computeVertexNormals();
        creator.player.geometry.computeBoundingBox();
        let ray = new THREE.Ray();
        let inverseMatrix = new THREE.Matrix4();
        inverseMatrix.getInverse(creator.player.matrixWorld);
        ray.copy(rayCaster.ray).applyMatrix4(inverseMatrix);
        if (ray.isIntersectionBox(creator.player.geometry.boundingBox)) {
            creator.player.hit(data.power, network, this.enemyID);
        }
    }

    updateEnemyBullet(creator, delta) {
        if (this.active) {
            if (!super.update(delta)) {
                this.active = false;
                creator.scene.remove(this);
            }
        }
    }

    updateID(id) {
        this.enemyID = id;
    }
}