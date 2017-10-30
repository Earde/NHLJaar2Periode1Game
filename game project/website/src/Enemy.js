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
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(w, h) {
        var _this = _super.call(this, new THREE.CylinderGeometry(w, w, h), new THREE.Material(), w, h, w) || this;
        _this.enemyID = -1;
        _this.active = false;
        _this.health = 100;
        _this.score = 0;
        _this.oldPosition = new THREE.Vector2();
        _this.newestPosition = new THREE.Vector2();
        _this.movementTime = 0;
        return _this;
    }
    Enemy.prototype.load = function (scene) {
        var material = this.createMaterial(true, THREE.DoubleSide, 1, 1, "textures/heightmap.png");
        this.material = material;
        _super.prototype.load.call(this, scene);
    };
    Enemy.prototype.reset = function () {
        this.active = false;
        this.health = 0;
        this.enemyID = -1;
    };
    Enemy.prototype.update = function (delta, creator) {
        if (this.active) {
            this.visible = true;
            this.move(delta, creator);
        }
        else {
            this.visible = false;
        }
    };
    Enemy.prototype.move = function (delta, creator) {
        this.movementTime += delta;
        if (this.movementTime > creator.tickTime) {
            this.movementTime = creator.tickTime;
        }
        var lerp = new THREE.Vector2().lerpVectors(this.oldPosition, this.newestPosition, this.movementTime / creator.tickTime);
        this.position.x = lerp.x;
        this.position.z = lerp.y;
        this.position.y = creator.heightmap.getHeightAt(this.position) + this.height / 2;
    };
    Enemy.prototype.forceUpdateFromNetwork = function (data, creator) {
        this.active = true;
        this.enemyID = data.id;
        this.position.set(creator.heightmap.width * data.percentagex - creator.heightmap.width / 2, 0, creator.heightmap.depth * data.percentagez - creator.heightmap.depth / 2);
    };
    Enemy.prototype.updateFromNetwork = function (data) {
        this.active = true;
        this.oldPosition.set(this.newestPosition.x, this.newestPosition.y);
        this.newestPosition.set(data.posx, data.posz);
        this.movementTime = 0;
        this.health = data.health;
        this.score = data.score;
    };
    return Enemy;
}(MeshLoader));
//# sourceMappingURL=Enemy.js.map