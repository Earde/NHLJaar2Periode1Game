class Player extends MeshLoader {
    speed = 25.0;
    playerID = -1;
    health = 100;
    score = 0;
    deaths = 0;

    time = 0;

    constructor() {
        super(new THREE.Geometry(), new THREE.MeshPhongMaterial(), 0, 0, 0);
    }

    //load mesh object
    loadObject(obj, scene, scale) {
        super.loadObject(obj, scene, scale);
        this.position.set(0, -this.height * 0.9, 0);
        this.material.side = THREE.FrontSide;
        this.material.transparent = true;
        this.material.opacity = 0;
        this.material.needsUpdate = true;
    }

    //update position based on camera
    update() {
        if (this.loaded) {
            let v = new THREE.Vector3(this.parent.getWorldPosition().x, this.parent.getWorldPosition().y + this.height, this.parent.getWorldPosition().z);
            this.parent.worldToLocal(v);
            this.lookAt(v);
            //this.rotateX(-Math.PI / 2);
            this.updateMatrixWorld(true);
        }
    }

    //update score if player killed enemy
    updateScore(data, creator) {
        if (this.playerID == data.enemyid) {
            this.score++;
        } //killed player data.id
        this.updateScoreText(creator);
    }

    //update Kill/Death text
    updateScoreText(creator) {
        creator.text2D.createText("K: " + this.score.toString() + ' ' + "D: " + this.deaths.toString());
    }

    //new position from server (after death or new connection)
    updateFromNetwork(creator, data) {
        this.playerID = data.id;
        creator.camera.updateNetwork(new THREE.Vector2(creator.heightmap.width * data.percentagex - creator.heightmap.width / 2, creator.heightmap.depth * data.percentagez - creator.heightmap.depth / 2));
    }

    //send data to network tick based
    sendToNetwork(network: Networking, delta, creator) {
        this.time += delta;
        if (this.time > creator.tickTime) {
            this.time -= creator.tickTime;
            let data = {
                posx: creator.camera.getWorldPosition().x,
                posz: creator.camera.getWorldPosition().z,
                longitude: creator.camera.lon,
                health: this.health,
                score: this.score
            };
            network.sendData("playerData", data);
        }
    }

    //player is hit by enemy bullet
    hit(power, network, enemyID, hitPoint, creator) {
        //headshot
        if (hitPoint > this.parent.position.y + (this.height / 2) * 0.80) {
            power *= 3;
        }
        this.health -= power;
        //death
        if (this.health <= 0) {
            let dataResponse = {
                enemyid: enemyID
            };
            network.sendData("kill", dataResponse);
            this.revive(network, creator);
        }
    }

    //send to server to revive player
    revive(network, creator) {
        this.health = 100;
        this.deaths++;
        this.updateScoreText(creator);
        let data = {
            deaths: this.deaths
        };
        network.sendData("revive", data);
    }
}