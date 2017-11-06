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
    function Weapon() {
        var _this = _super.call(this, new THREE.Geometry(), new THREE.MeshPhongMaterial(), 0, 0, 0) || this;
        _this.shot = false;
        _this.power = 40;
        _this.lookDistance = 0;
        return _this;
    }
    Weapon.prototype.loadObject = function (obj, scene, scale) {
        var geometry = obj.geometry.clone();
        geometry.computeVertexNormals();
        this.geometry = geometry.clone();
        var box = new THREE.Box3().setFromObject(obj);
        this.scale.set(scale.x, scale.y, scale.z);
        this.width = box.max.x * this.scale.x;
        this.height = box.max.z * this.scale.y;
        this.depth = box.max.y * this.scale.z;
        this.material = obj.material.clone();
        this.material.side = THREE.DoubleSide;
        this.material.needsUpdate = true;
        this.castShadow = true;
        this.receiveShadow = true;
        this.load(scene);
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
            var endOfWeapon = this.getWorldPosition().add(creator.camera.getWorldDirection().multiplyScalar(this.depth));
            creator.bullet.shoot(endOfWeapon.clone(), this.getWorldPosition().add(creator.camera.getWorldDirection().multiplyScalar(this.lookDistance)), network, this.power);
            creator.scene.add(creator.bullet);
            this.shot = true;
        }
    };
    Weapon.prototype.resize = function (width, height) {
        this.position.set(width / 24, -(height / 10 * 4), 0);
    };
    return Weapon;
}(MeshLoader));
//# sourceMappingURL=Weapon.js.map