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
var Text2D = /** @class */ (function (_super) {
    __extends(Text2D, _super);
    function Text2D(w, h, d) {
        var _this = _super.call(this, new THREE.SpriteMaterial()) || this;
        _this.width = w;
        _this.height = h;
        _this.depth = d;
        _this.createText("K: 0 D: 0");
        return _this;
    }
    Text2D.prototype.load = function (scene) {
        scene.add(this);
    };
    Text2D.prototype.update = function (camera, buttonPressed) {
        if (buttonPressed) {
            var target = camera.getWorldPosition().add(camera.getWorldDirection().multiplyScalar(this.depth));
            this.position.set(target.x, target.y, target.z);
            this.visible = true;
        }
        else {
            this.visible = false;
        }
    };
    Text2D.prototype.createText = function (message) {
        var parameters = {};
        parameters["fontface"] = "Arial";
        parameters["fontsize"] = 24;
        parameters["borderThickness"] = 1;
        parameters["borderColor"] = { r: 0, g: 0, b: 0, a: 1.0 };
        parameters["backgroundColor"] = { r: 255, g: 255, b: 255, a: 1.0 };
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        context.font = "Bold " + parameters["fontsize"] + "px " + parameters["fontface"];
        // get size data (height depends only on font size)
        var metrics = context.measureText(message);
        var textWidth = metrics.width;
        // background color
        context.fillStyle = "rgba(" + parameters["backgroundColor"].r + "," + parameters["backgroundColor"].g + ","
            + parameters["backgroundColor"].b + "," + parameters["backgroundColor"].a + ")";
        // border color
        context.strokeStyle = "rgba(" + parameters["borderColor"].r + "," + parameters["borderColor"].g + ","
            + parameters["borderColor"].b + "," + parameters["borderColor"].a + ")";
        context.lineWidth = parameters["borderThickness"];
        // 1.4 is extra height factor for text below baseline: g,j,p,q.
        this.roundRect(context, parameters["borderThickness"] / 2, parameters["borderThickness"] / 2, textWidth + parameters["borderThickness"], parameters["fontsize"] * 1.4 + parameters["borderThickness"], 6);
        // text color
        context.fillStyle = "rgba(0, 0, 0, 1.0)";
        context.fillText(message, parameters["borderThickness"], parameters["fontsize"] + parameters["borderThickness"]);
        // canvas contents will be used for a texture
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        this.material = new THREE.SpriteMaterial({ map: texture });
        this.material.needsUpdate = true;
        this.scale.set(this.width, this.height, 1);
        this.updateMatrix();
    };
    Text2D.prototype.roundRect = function (ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    };
    return Text2D;
}(THREE.Sprite));
//# sourceMappingURL=Text2D.js.map