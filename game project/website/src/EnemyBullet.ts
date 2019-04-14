class EnemyBullet extends Bullet {
    enemyID = -1;
    active = false;

    constructor() {
        super();
    }

    //check for new bullet and link to enemy who shot
    updateFromNetwork(network, creator, data) {
        if (this.enemyID == data.id) {
            this.active = true;
            let geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(data.startx, data.starty, data.startz));
            geometry.vertices.push(new THREE.Vector3(data.endx, data.endy, data.endz));
            this.geometry = geometry;
            this.geometry.computeFaceNormals();
            this.geometry.computeVertexNormals(true);
            creator.scene.add(this);
            this.checkForHit(network, creator, data);
        }
    }

    //check if enemy bullet hits player
    checkForHit(network, creator, data) {
        let rayCaster = new THREE.Raycaster(new THREE.Vector3(data.startx, data.starty, data.startz),
            new THREE.Vector3(data.endx - data.startx, data.endy - data.starty, data.endz - data.startz).normalize());
        let obj = rayCaster.intersectObject(creator.player);
        if (obj.length > 0) {
            creator.player.hit(data.power, network, this.enemyID, obj[0].point.y, creator);
        }
    }

    //check if bullet is alive and update mesh
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