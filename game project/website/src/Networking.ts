class Networking {
    socket;
    creator;

    //hier wordt de connectie met de server gemaakt
    constructor(creator) {
        this.creator = creator;
        this.socket = io('https://127.0.0.1', { secure: true, rejectUnauthorized: false, port: '443'});
    }

    updatePlayer(data) {
        this.creator.player.updateFromNetwork(this.creator, data);
        let dataResponse = {};
        this.sendData("connectedResponse", dataResponse);
    }

    revivePlayer(data) {
        this.creator.player.updateFromNetwork(this.creator, data);
    }

    updateEnemies(data) {
        for (let i = 0; i < this.creator.enemies.length; i++) {
            this.creator.enemies[i].reset();
        }
        for (let i = 0; i < data.length && i < this.creator.enemies.length; i++) {
            if (this.creator.player.playerID != data[i].id) {
                this.creator.enemies[i].forceUpdateFromNetwork(data[i], creator);
                this.creator.enemyBullets[i].updateID(data[i].id);
            }
        }
    }

    updateDataEnemies(data) {
        for (let i = 0; i < this.creator.enemies.length; i++) {
            if (this.creator.enemies[i].enemyID == data.id) {
                this.creator.enemies[i].updateFromNetwork(data);
            }
        }
    }

    updateShotsEnemies(data) {
        for (let i = 0; i < this.creator.enemyBullets.length; i++) {
            this.creator.enemyBullets[i].updateFromNetwork(this, creator, data);
        }
    }

    updateEnemyKilled(data) {
        this.creator.player.updateScore(data, this.creator);
    }

    //listen to server and process data
    connect() {
        this.socket.on("hoi", function(data) {
            this.updatePlayer(data);
        }.bind(this));

        //update de lijst van spelers
        this.socket.on("players", function(data) {
            this.updateEnemies(data);
        }.bind(this));

        this.socket.on("enemyData", function(data) {
            this.updateDataEnemies(data);
        }.bind(this));

        this.socket.on("enemyShot", function(data) {
            this.updateShotsEnemies(data);
        }.bind(this));

        this.socket.on("enemyKilled", function(data) {
            this.updateEnemyKilled(data);
        }.bind(this));

        this.socket.on("playerKilled", function(data) {
            this.revivePlayer(data);
        }.bind(this));
    }

    sendData(code, data) {
        data["id"] = creator.player.playerID;
        this.socket.emit(code, data);
    }
}