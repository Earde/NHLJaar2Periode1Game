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
var Skybox = (function (_super) {
    __extends(Skybox, _super);
    function Skybox(w, h, d) {
        var _this = _super.call(this, new THREE.BoxGeometry(w, h, d), new THREE.Material(), w, h, d) || this;
        _this.castShadow = false;
        _this.receiveShadow = false;
        return _this;
    }
    Skybox.prototype.load = function (scene) {
        var imagePrefix = "textures/skybox-";
        var directions = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
        var imageSuffix = ".jpg";
        var materialArray = [];
        for (var i = 0; i < 6; i++) {
            materialArray.push(this.createMaterial(false, THREE.BackSide, 1, 1, imagePrefix + directions[i] + imageSuffix));
        }
        var material = new THREE.MeshFaceMaterial(materialArray);
        this.material = material;
        _super.prototype.load.call(this, scene);
    };
    return Skybox;
}(MeshLoader));
//# sourceMappingURL=Skybox.js.map