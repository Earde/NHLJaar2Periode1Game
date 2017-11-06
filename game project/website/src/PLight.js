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
var PLight = (function (_super) {
    __extends(PLight, _super);
    function PLight(x, y, z, color) {
        var _this = _super.call(this, color, 1, 0, 0) || this;
        _this.position.set(x, y, z);
        _this.lookAt(new THREE.Vector3(0, 0, 0));
        _this.receiveShadow = false;
        _this.castShadow = true;
        _this.shadow.bias = -0.005;
        _this.shadow.mapSize = new THREE.Vector2(2048, 2048);
        return _this;
    }
    PLight.prototype.update = function (creator, origin) {
        /*
        let rayCaster = new THREE.Raycaster(new THREE.Vector3(origin.x, origin.y, origin.z),
            new THREE.Vector3(creator.player.getWorldPosition().x - origin.x, creator.player.getWorldPosition().y - origin.y, creator.player.getWorldPosition().z - origin.z).normalize());
        let obj = rayCaster.intersectObject(creator.player);
        if (obj.length > 0) {
            let newPos = new THREE.Vector3(origin.x, origin.y, origin.z).add(rayCaster.ray.direction.multiplyScalar(obj[0].distance * 0.80));
            this.position.set(newPos.x, newPos.y, newPos.z);
        }
        */
        //this.lookAt(new THREE.Vector3(creator.player.getWorldPosition().x, creator.player.getWorldPosition().y, creator.player.getWorldPosition().z));
        //this.updateMatrix();
    };
    return PLight;
}(THREE.PointLight));
//# sourceMappingURL=PLight.js.map