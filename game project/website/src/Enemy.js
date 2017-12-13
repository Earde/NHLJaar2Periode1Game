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
    function Enemy() {
        var _this = _super.call(this, new THREE.Geometry(), new THREE.Material(), 0, 0, 0) || this;
        _this.enemyID = -1;
        _this.active = false;
        _this.health = 100;
        _this.score = 0;
        _this.oldPosition = new THREE.Vector2();
        _this.newestPosition = new THREE.Vector2();
        _this.oldTheta = 0;
        _this.newTheta = 0;
        _this.movementTime = 0;
        return _this;
    }
    Enemy.prototype.loadObject = function (obj, scene, scale) {
        _super.prototype.loadObject.call(this, obj, scene, scale);
        this.position.set(0, 0, 0);
        this.rotateX(-Math.PI / 2);
        this.material.side = THREE.DoubleSide;
        this.material.needsUpdate = true;
    };
    Enemy.prototype.reset = function () {
        this.active = false;
        this.health = 0;
        this.enemyID = -1;
    };
    Enemy.prototype.update = function (delta, creator) {
        if (this.loaded) {
            if (this.active) {
                this.visible = true;
                this.move(delta, creator);
            }
            else {
                this.visible = false;
            }
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
        this.position.y = creator.heightmap.getHeightAt(this.position);
        var theta = this.oldTheta + (this.newTheta - this.oldTheta) * (this.movementTime / creator.tickTime);
        this.lookAt(new THREE.Vector3(this.position.x + Math.cos(theta) * 5, this.position.y, this.position.z + Math.sin(theta) * 5));
        this.rotateX(-Math.PI / 2);
        this.updateMatrixWorld(true);
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
        this.oldTheta = this.newTheta;
        this.newTheta = data.longitude * Math.PI / 180;
        this.movementTime = 0;
        this.health = data.health;
        this.score = data.score;
    };
    return Enemy;
}(MeshLoader));
//# sourceMappingURL=Enemy.js.map