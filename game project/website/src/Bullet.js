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
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        var _this = _super.call(this, new THREE.Geometry(), new THREE.LineBasicMaterial()) || this;
        _this.bulletTime = 0;
        _this.bulletTimeMax = 1;
        _this.castShadow = true;
        _this.receiveShadow = false;
        return _this;
    }
    Bullet.prototype.load = function () {
        /*
        var material = new THREE.LineBasicMaterial({
            color: 0xff00ff,
            linewidth: 1,
            scale: 1,
            lights: false
        } ); //linewidth & lights werken niet op windows ;(
        */
        var material = new MeshLoader(new THREE.Geometry(), new THREE.Material(), 0, 0, 0)
            .createMaterial(true, THREE.DoubleSide, 1, 1, "textures/bullet/smoke.jpg");
        this.material = material;
        this.material.opacity = 0;
        this.material.transparent = true;
        this.material.needsUpdate = true;
    };
    Bullet.prototype.shoot = function (start, end, network, power) {
        var geometry = new THREE.Geometry();
        geometry.vertices.push(start);
        geometry.vertices.push(end);
        this.geometry = geometry;
        var data = {
            startx: start.x,
            starty: start.y,
            startz: start.z,
            endx: end.x,
            endy: end.y,
            endz: end.z,
            power: power
        };
        network.sendData("shoot", data);
    };
    Bullet.prototype.update = function (delta) {
        this.material.opacity = 1.0 - (this.bulletTime / this.bulletTimeMax);
        this.bulletTime += delta;
        if (this.bulletTime >= this.bulletTimeMax) {
            this.bulletTime = 0;
            return false;
        }
        return true;
    };
    return Bullet;
}(THREE.Line));
//# sourceMappingURL=Bullet.js.map