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
var Crosshair = (function (_super) {
    __extends(Crosshair, _super);
    function Crosshair(w, h, d) {
        var _this = _super.call(this, new THREE.BoxGeometry(w, h, 0.01), new THREE.Material(), w, h, d) || this;
        _this.castShadow = false;
        _this.receiveShadow = false;
        return _this;
    }
    Crosshair.prototype.load = function (camera) {
        var material = new THREE.LineBasicMaterial({ color: 0xAAFFAA });
        this.material = material;
        this.position.set(0, 0, -this.depth);
        _super.prototype.load.call(this, camera);
    };
    return Crosshair;
}(MeshLoader));
//# sourceMappingURL=Crosshair.js.map