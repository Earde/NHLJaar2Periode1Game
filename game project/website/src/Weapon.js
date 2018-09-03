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
var Weapon = /** @class */ (function (_super) {
    __extends(Weapon, _super);
    function Weapon() {
        var _this = _super.call(this, new THREE.Geometry(), new THREE.MeshPhongMaterial(), 0, 0, 0) || this;
        _this.shot = false;
        _this.power = 40;
        _this.lookDistance = 0;
        return _this;
    }
    Weapon.prototype.update = function (distance) {
        //rotate weapon to where crosshair is looking
        this.lookAt(new THREE.Vector3(0, 0, -distance));
        this.rotateX(-Math.PI / 2);
        this.lookDistance = distance;
        //this.updateMatrix();
    };
    Weapon.prototype.shoot = function (creator, isMouseDown, delta, network) {
        if (this.shot) {
            this.shot = creator.bullet.update(delta);
            if (!this.shot) {
                creator.scene.remove(creator.bullet);
            }
        }
        else if (isMouseDown && !this.shot) {
            //let middleOfWeapon = this.getWorldPosition().add(new THREE.Vector3(this.middleOfObject.x * this.rotation.x, this.middleOfObject.y * this.rotation.y, this.middleOfObject.z * this.rotation.z));
            //let endOfWeapon = middleOfWeapon.add(creator.camera.getWorldDirection().multiplyScalar(this.depth / 2));
            var endOfWeapon = this.getWorldPosition().clone();
            //p1 = end of weapon position, p2 = crosshair position on heightmap
            creator.bullet.shoot(endOfWeapon.clone(), this.getWorldPosition().add(creator.camera.getWorldDirection().multiplyScalar(this.lookDistance)), network, this.power);
            creator.scene.add(creator.bullet);
            this.shot = true;
        }
    };
    Weapon.prototype.resize = function (width, height) {
        this.position.set(width / 16, -(height / 10 * 4), -1);
    };
    return Weapon;
}(MeshLoader));
//# sourceMappingURL=Weapon.js.map