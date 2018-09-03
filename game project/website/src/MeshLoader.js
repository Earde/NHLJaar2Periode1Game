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
var MeshLoader = /** @class */ (function (_super) {
    __extends(MeshLoader, _super);
    function MeshLoader(mesh, material, w, h, d) {
        var _this = _super.call(this, mesh, material) || this;
        _this.loaded = false;
        _this.width = w;
        _this.height = h;
        _this.depth = d;
        _this.receiveShadow = true;
        _this.castShadow = true;
        return _this;
    }
    MeshLoader.prototype.load = function (scene) {
        scene.add(this);
        this.loaded = true;
    };
    MeshLoader.prototype.loadObject = function (obj, scene, scale) {
        var geometry = obj.geometry.clone();
        geometry.computeVertexNormals();
        this.geometry = geometry.clone();
        var box = new THREE.Box3().setFromObject(obj);
        this.scale.set(scale.x, scale.y, scale.z);
        this.width = (box.max.x - box.min.x) * this.scale.x;
        this.height = (box.max.z - box.min.z) * this.scale.y;
        this.depth = (box.max.y - box.min.y) * this.scale.z;
        this.middleOfObject = new THREE.Vector3((box.max.x + box.min.x) / 2 * this.scale.x, (box.max.y + box.min.y) / 2 * this.scale.y, (box.max.z + box.min.z) / 2 * this.scale.z);
        this.material = obj.material.clone();
        this.material.side = THREE.DoubleSide;
        this.material.needsUpdate = true;
        this.castShadow = true;
        this.receiveShadow = true;
        this.load(scene);
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
        texture.generateMipmaps = true;
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