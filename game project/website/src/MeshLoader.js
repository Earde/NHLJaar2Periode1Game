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
var MeshLoader = (function (_super) {
    __extends(MeshLoader, _super);
    function MeshLoader(mesh, material, w, h, d) {
        var _this = _super.call(this, mesh, material) || this;
        _this.width = w;
        _this.height = h;
        _this.depth = d;
        _this.receiveShadow = true;
        _this.castShadow = true;
        return _this;
    }
    MeshLoader.prototype.load = function (scene) {
        scene.add(this);
    };
    MeshLoader.prototype.createMaterial = function (phong, side, xSets, ySets, uri) {
        var material;
        if (phong) {
            material = new THREE.MeshPhongMaterial();
        }
        else {
            material = new THREE.MeshBasicMaterial();
        }
        var texture = new THREE.TextureLoader().load(uri);
        texture.wrapS = material.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(xSets, ySets);
        //texture.generateMipmaps = true;
        material.map = texture;
        material.side = side;
        material.needsUpdate = true;
        return material;
    };
    MeshLoader.prototype.getDistanceAt = function (pos, dir) {
        var ray = new THREE.Raycaster(new THREE.Vector3(pos.x, pos.y, pos.z), new THREE.Vector3(dir.x, dir.y, dir.z));
        var obj = ray.intersectObject(this);
        if (obj.length > 0) {
            return obj[0].distance;
        }
        return 0;
    };
    return MeshLoader;
}(THREE.Mesh));
//# sourceMappingURL=MeshLoader.js.map