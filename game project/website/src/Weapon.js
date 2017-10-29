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
var Weapon = (function (_super) {
    __extends(Weapon, _super);
    function Weapon(w, h, d) {
        var _this = _super.call(this, new THREE.BoxGeometry(w, h, d), new THREE.Material(), w, h, d) || this;
        _this.shot = false;
        _this.power = 100;
        _this.lookDistance = 0;
        return _this;
    }
    Weapon.prototype.load = function (camera) {
        var material = this.createMaterial(true, THREE.DoubleSide, 1, 1, "textures/gun.jpg");
        this.material = material;
        _super.prototype.load.call(this, camera);
    };
    Weapon.prototype.update = function (distance) {
        //rotate weapon to where crosshair is looking
        this.lookAt(new THREE.Vector3(0, 0, -distance));
        this.rotateX(Math.PI / 2);
        this.lookDistance = distance;
        this.updateMatrix();
    };
    Weapon.prototype.shoot = function (creator, isMouseDown, delta, network) {
        if (this.shot) {
            this.shot = creator.bullet.update(delta);
            if (!this.shot) {
                creator.scene.remove(creator.bullet);
            }
        }
        else if (isMouseDown && !this.shot) {
            //p1 = end of weapon position, p2 = crosshair point on map
            creator.bullet.shoot(this.getWorldPosition().add(creator.camera.getWorldDirection().multiplyScalar(this.height / 2)), this.getWorldPosition().add(creator.camera.getWorldDirection().multiplyScalar(this.lookDistance)), network, this.power);
            creator.scene.add(creator.bullet);
            this.shot = true;
        }
    };
    Weapon.prototype.resize = function (width, height) {
        this.position.set(width / 8, -height / 4, -this.height / 2);
    };
    return Weapon;
}(MeshLoader));
//# sourceMappingURL=Weapon.js.map