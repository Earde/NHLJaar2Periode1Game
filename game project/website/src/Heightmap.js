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
var Heightmap = (function (_super) {
    __extends(Heightmap, _super);
    function Heightmap(w, h, d) {
        var _this = _super.call(this, new THREE.PlaneGeometry(w, d), new THREE.Material(), w, h, d) || this;
        _this.castShadow = false;
        return _this;
    }
    Heightmap.prototype.getHeightData = function (img) {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var context = canvas.getContext('2d');
        context.drawImage(img, 0, 0, img.width, img.height);
        var pix = context.getImageData(0, 0, img.width, img.height).data;
        var data = [];
        var j = 0;
        for (var i = 0; i < pix.length; i += 4) {
            data.push((pix[i] + pix[i + 1] + pix[i + 2]) / 3);
        }
        return data;
    };
    Heightmap.prototype.load = function (scene) {
        var _this = this;
        var img = new Image();
        var imagePrefix = "textures/";
        var imageName = "heightmap1";
        var imageSuffix = ".png";
        img.onload = function () {
            var material = _this.createMaterial(true, THREE.DoubleSide, 1, 1, imagePrefix + imageName + imageSuffix);
            material.wireframe = false;
            _this.material = material;
            var geometry = new THREE.PlaneGeometry(_this.width, _this.depth, img.width - 1, img.height - 1);
            var data = _this.getHeightData(img);
            for (var i = 0; i < geometry.vertices.length; i++) {
                geometry.vertices[i].z -= data[i] / 255 * _this.height;
            }
            geometry.verticesNeedUpdate = true;
            geometry.computeFaceNormals();
            geometry.computeVertexNormals();
            _this.geometry = geometry;
            _this.position = new THREE.Vector3(0, 0, 0);
            var q = new THREE.Quaternion();
            q.setFromAxisAngle(new THREE.Vector3(-1, 0, 0), 1.5 * Math.PI);
            _this.quaternion.multiplyQuaternions(q, _this.quaternion);
            _super.prototype.load.call(_this, scene);
        };
        img.src = imagePrefix + imageName + imageSuffix;
    };
    Heightmap.prototype.getHeightAt = function (pos) {
        var ray = new THREE.Raycaster(new THREE.Vector3(pos.x, this.height + 1, pos.z), new THREE.Vector3(0, -1, 0));
        var obj = ray.intersectObject(this);
        if (obj.length > 0) {
            return this.height + 1 - obj[0].distance;
        }
        return 0;
    };
    return Heightmap;
}(MeshLoader));
//# sourceMappingURL=Heightmap.js.map