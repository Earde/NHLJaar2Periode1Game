var Networking = /** @class */ (function () {
    //hier wordt de connectie met de server gemaakt
    function Networking(creator) {
        this.creator = creator;
        this.socket = io('https://127.0.0.1', { secure: true, rejectUnauthorized: false, port: '443' });
    }
    Networking.prototype.updatePlayer = function (data) {
        this.creator.player.updateFromNetwork(this.creator, data);
        var dataResponse = {};
        this.sendData("connectedResponse", dataResponse);
    };
    Networking.prototype.revivePlayer = function (data) {
        this.creator.player.updateFromNetwork(this.creator, data);
    };
    Networking.prototype.updateEnemies = function (data) {
        for (var i = 0; i < this.creator.enemies.length; i++) {
            this.creator.enemies[i].reset();
        }
        for (var i = 0; i < data.length && i < this.creator.enemies.length; i++) {
            if (this.creator.player.playerID != data[i].id) {
                this.creator.enemies[i].forceUpdateFromNetwork(data[i], creator);
                this.creator.enemyBullets[i].updateID(data[i].id);
            }
        }
    };
    Networking.prototype.updateDataEnemies = function (data) {
        for (var i = 0; i < this.creator.enemies.length; i++) {
            if (this.creator.enemies[i].enemyID == data.id) {
                this.creator.enemies[i].updateFromNetwork(data);
            }
        }
    };
    Networking.prototype.updateShotsEnemies = function (data) {
        for (var i = 0; i < this.creator.enemyBullets.length; i++) {
            this.creator.enemyBullets[i].updateFromNetwork(this, creator, data);
        }
    };
    Networking.prototype.updateEnemyKilled = function (data) {
        this.creator.player.updateScore(data, this.creator);
    };
    //hier wordt er naar de server geluisterd of er nieuwe data is
    Networking.prototype.connect = function () {
        this.socket.on("hoi", function (data) {
            this.updatePlayer(data);
        }.bind(this));
        //update de lijst van spelers
        this.socket.on("players", function (data) {
            this.updateEnemies(data);
        }.bind(this));
        this.socket.on("enemyData", function (data) {
            this.updateDataEnemies(data);
        }.bind(this));
        this.socket.on("enemyShot", function (data) {
            this.updateShotsEnemies(data);
        }.bind(this));
        this.socket.on("enemyKilled", function (data) {
            this.updateEnemyKilled(data);
        }.bind(this));
        this.socket.on("playerKilled", function (data) {
            this.revivePlayer(data);
        }.bind(this));
    };
    Networking.prototype.sendData = function (code, data) {
        data["id"] = creator.player.playerID;
        this.socket.emit(code, data);
    };
    return Networking;
}());
//# sourceMappingURL=Networking.js.map