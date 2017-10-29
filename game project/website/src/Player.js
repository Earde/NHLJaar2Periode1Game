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
    function Player(w, h) {
        var _this = _super.call(this, new THREE.CylinderGeometry(w, w, h), new THREE.Material(), w, h, w) || this;
        _this.speed = 10.0;
        _this.playerID = -1;
        _this.health = 100;
        _this.score = 0;
        _this.deaths = 0;
        _this.time = 0;
        return _this;
    }
    Player.prototype.load = function (camera) {
        var material = this.createMaterial(true, THREE.FrontSide, 1, 1, "textures/heightmap.png");
        this.material = material;
        this.position.set(0, 0, 0);
        this.lookAt(new THREE.Vector3(0, 0, -1));
        _super.prototype.load.call(this, camera);
    };
    Player.prototype.update = function () {
        var v = new THREE.Vector3(this.parent.getWorldPosition().x, this.parent.getWorldPosition().y + this.height, this.parent.getWorldPosition().z);
        this.parent.worldToLocal(v);
        this.lookAt(v); //dit moet nog gefixed worden, is nu vanuit camera perspectief en dit moet nog in wereld perspectief
    };
    Player.prototype.updateScore = function (data, creator) {
        if (this.playerID == data.enemyid) {
            this.score++;
        } //killed player data.id
        creator.text2D.createText(this.score.toString());
    };
    Player.prototype.updateFromNetwork = function (creator, data) {
        this.playerID = data.id;
        creator.camera.updateNetwork(new THREE.Vector3(data.posx, data.posy, data.posz), new THREE.Vector3(data.dirx, data.diry, data.dirz));
    };
    Player.prototype.sendToNetwork = function (network, delta, creator) {
        this.time += delta;
        if (this.time > creator.tickTime) {
            this.time -= creator.tickTime;
            var data = {
                posx: this.getWorldPosition().x,
                posz: this.getWorldPosition().z,
                health: this.health,
                score: this.score
            };
            network.sendData("playerData", data);
        }
    };
    Player.prototype.hit = function (power, network, enemyID) {
        this.health -= power;
        if (this.health <= 0) {
            var dataResponse = {
                enemyid: enemyID
            };
            network.sendData("kill", dataResponse);
            this.revive(network);
        }
    };
    Player.prototype.revive = function (network) {
        this.health = 100;
        this.deaths++;
        var data = {
            deaths: this.deaths
        };
        network.sendData("revive", data);
    };
    return Player;
}(MeshLoader));
//# sourceMappingURL=Player.js.map