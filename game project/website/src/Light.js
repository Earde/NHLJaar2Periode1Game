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
var Light = (function (_super) {
    __extends(Light, _super);
    function Light(x, y, z, color) {
        var _this = _super.call(this, color, 1, 0, 2) || this;
        _this.position.set(x, y, z);
        _this.lookAt(new THREE.Vector3(0, 0, 0));
        _this.receiveShadow = false;
        _this.castShadow = true;
        _this.shadow.mapSize = new THREE.Vector2(2048, 2048);
        _this.shadow.bias = -0.005;
        return _this;
    }
    return Light;
}(THREE.PointLight));
//# sourceMappingURL=Light.js.map