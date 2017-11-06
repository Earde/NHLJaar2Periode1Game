var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this, new THREE.Geometry(), new THREE.MeshPhongMaterial(), 0, 0, 0) || this;
        _this.speed = 100.0;
        _this.playerID = -1;
        _this.health = 100;
        _this.score = 0;
        _this.deaths = 0;
        _this.time = 0;
        return _this;
    }
    Player.prototype.loadObject = function (obj, scene, scale) {
        _super.prototype.loadObject.call(this, obj, scene, scale);
        this.position.set(0, -this.height * 0.9, 0);
        this.material.side = THREE.FrontSide;
        this.material.transparent = true;
        this.material.opacity = 0;
        this.material.needsUpdate = true;
    };
    Player.prototype.update = function () {
        if (this.loaded) {
            var v = new THREE.Vector3(this.parent.getWorldPosition().x, this.parent.getWorldPosition().y + this.height, this.parent.getWorldPosition().z);
            this.parent.worldToLocal(v);
            this.lookAt(v);
            //this.rotateX(-Math.PI / 2);
            this.updateMatrixWorld(true);
        }
    };
    Player.prototype.updateScore = function (data, creator) {
        if (this.playerID == data.enemyid) {
            this.score++;
        } //killed player data.id
        this.updateScoreText(creator);
    };
    Player.prototype.updateScoreText = function (creator) {
        creator.text2D.createText("K: " + this.score.toString() + ' ' + "D: " + this.deaths.toString());
    };
    Player.prototype.updateFromNetwork = function (creator, data) {
        this.playerID = data.id;
        creator.camera.updateNetwork(new THREE.Vector2(creator.heightmap.width * data.percentagex - creator.heightmap.width / 2, creator.heightmap.depth * data.percentagez - creator.heightmap.depth / 2));
    };
    Player.prototype.sendToNetwork = function (network, delta, creator) {
        this.time += delta;
        if (this.time > creator.tickTime) {
            this.time -= creator.tickTime;
            var data = {
                posx: creator.camera.getWorldPosition().x,
                posz: creator.camera.getWorldPosition().z,
                rotz: creator.camera.getWorldRotation().z,
                health: this.health,
                score: this.score
            };
            network.sendData("playerData", data);
        }
    };
    Player.prototype.hit = function (power, network, enemyID, hitPoint, creator) {
        if (hitPoint > this.parent.position.y + (this.height / 2) * 0.80) {
            power *= 3;
        }
        this.health -= power;
        if (this.health <= 0) {
            var dataResponse = {
                enemyid: enemyID
            };
            network.sendData("kill", dataResponse);
            this.revive(network, creator);
        }
    };
    Player.prototype.revive = function (network, creator) {
        this.health = 100;
        this.deaths++;
        this.updateScoreText(creator);
        var data = {
            deaths: this.deaths
        };
        network.sendData("revive", data);
    };
    return Player;
}(MeshLoader));
//# sourceMappingURL=Player.js.map