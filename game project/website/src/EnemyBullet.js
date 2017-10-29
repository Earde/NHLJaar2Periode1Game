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
var EnemyBullet = (function (_super) {
    __extends(EnemyBullet, _super);
    function EnemyBullet() {
        var _this = _super.call(this) || this;
        _this.enemyID = -1;
        _this.active = false;
        return _this;
    }
    EnemyBullet.prototype.updateFromNetwork = function (network, creator, data) {
        if (this.enemyID == data.id) {
            this.active = true;
            var geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(data.startx, data.starty, data.startz));
            geometry.vertices.push(new THREE.Vector3(data.endx, data.endy, data.endz));
            this.geometry = geometry;
            creator.scene.add(this);
            this.checkForHit(network, creator, data);
        }
    };
    EnemyBullet.prototype.checkForHit = function (network, creator, data) {
        var rayCaster = new THREE.Raycaster(new THREE.Vector3(data.startx, data.starty, data.startz), new THREE.Vector3(data.endx - data.startx, data.endy - data.starty, data.endz - data.startz).normalize());
        creator.player.geometry.verticesNeedUpdate = true;
        creator.player.geometry.normalsNeedUpdate = true;
        creator.player.geometry.computeFaceNormals();
        creator.player.geometry.computeVertexNormals();
        creator.player.geometry.computeBoundingBox();
        var ray = new THREE.Ray();
        var inverseMatrix = new THREE.Matrix4();
        inverseMatrix.getInverse(creator.player.matrixWorld);
        ray.copy(rayCaster.ray).applyMatrix4(inverseMatrix);
        if (ray.isIntersectionBox(creator.player.geometry.boundingBox)) {
            creator.player.hit(data.power, network, this.enemyID);
        }
    };
    EnemyBullet.prototype.updateEnemyBullet = function (creator, delta) {
        if (this.active) {
            if (!_super.prototype.update.call(this, delta)) {
                this.active = false;
                creator.scene.remove(this);
            }
        }
    };
    EnemyBullet.prototype.updateID = function (id) {
        this.enemyID = id;
    };
    return EnemyBullet;
}(Bullet));
//# sourceMappingURL=EnemyBullet.js.map