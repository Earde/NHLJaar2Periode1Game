class Player extends MeshLoader {
    speed = 10.0;
    playerID = -1;
    health = 100;
    score = 0;
    deaths = 0;

    time = 0;

    constructor(w, h) {
        super(new THREE.CylinderGeometry(w, w, h), new THREE.Material(), w, h, w);
    }

    load(camera: Camera) {
        let material = this.createMaterial(true, THREE.FrontSide, 1, 1, "textures/heightmap.png");
        this.material = material;
        this.position.set(0, 0, 0);
        this.lookAt(new THREE.Vector3(0, 0, -1));
        super.load(camera);
    }

    update() {
        let v = new THREE.Vector3(this.parent.getWorldPosition().x, this.parent.getWorldPosition().y + this.height, this.parent.getWorldPosition().z);
        this.parent.worldToLocal(v);
        this.lookAt(v); //dit moet nog gefixed worden, is nu vanuit camera perspectief en dit moet nog in wereld perspectief
    }

    updateScore(data, creator) {
        if (this.playerID == data.enemyid) {
            this.score++;
        } //killed player data.id
        creator.text2D.createText(this.score.toString());
    }

    updateFromNetwork(creator, data) {
        this.playerID = data.id;
        creator.camera.updateNetwork(new THREE.Vector3(data.posx, data.posy, data.posz), new THREE.Vector3(data.dirx, data.diry, data.dirz));
    }

    sendToNetwork(network: Networking, delta, creator) {
        this.time += delta;
        if (this.time > creator.tickTime) {
            this.time -= creator.tickTime;
            let data = {
                posx: this.getWorldPosition().x,
                posz: this.getWorldPosition().z,
                health: this.health,
                score: this.score
            };
            network.sendData("playerData", data);
        }
    }

    hit(power, network, enemyID) {
        this.health -= power;
        if (this.health <= 0) {
            let dataResponse = {
                enemyid: enemyID
            };
            network.sendData("kill", dataResponse);
            this.revive(network);
        }
    }

    revive(network) {
        this.health = 100;
        this.deaths++;
        let data = {
            deaths: this.deaths
        };
        network.sendData("revive", data);
    }
}