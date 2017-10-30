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
var Camera = (function (_super) {
    __extends(Camera, _super);
    function Camera() {
        var _this = _super.call(this, 90, window.innerWidth / window.innerHeight, 0.1, 6000) || this;
        _this.lon = 0;
        _this.lat = 0;
        _this.verticalMin = -89;
        _this.verticalMax = 89;
        _this.verticalSpeed = 5;
        _this.horizontalSpeed = 5;
        return _this;
    }
    Camera.prototype.update = function (delta, keyMap, mouseX, mouseY, creator) {
        //movement
        var speed = creator.player.speed * delta;
        //move in camera direction (if you look up or down you won't move backward or forward)
        if (keyMap[87]) {
            this.translateZ(-speed);
        }
        if (keyMap[83]) {
            this.translateZ(speed);
        }
        if (keyMap[65]) {
            this.translateX(-speed);
        }
        if (keyMap[68]) {
            this.translateX(speed);
        }
        //set camera height based on heightmap
        this.position.y = creator.heightmap.getHeightAt(this.position) + creator.player.height / 2;
        //look movement
        this.lon += mouseX * delta * this.horizontalSpeed;
        this.lat -= mouseY * delta * this.verticalSpeed;
        if (this.lat < this.verticalMin) {
            this.lat = this.verticalMin;
        }
        else if (this.lat > this.verticalMax) {
            this.lat = this.verticalMax;
        }
        var phi = (90 - this.lat) * Math.PI / 180;
        var theta = this.lon * Math.PI / 180;
        var target = new THREE.Vector3(0, 0, 0);
        target.x = this.position.x + 100 * Math.sin(phi) * Math.cos(theta);
        target.y = this.position.y + 100 * Math.cos(phi);
        target.z = this.position.z + 100 * Math.sin(phi) * Math.sin(theta);
        this.lookAt(target);
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i] instanceof Weapon) {
                var weapon = this.children[i];
                var distance = creator.heightmap.getDistanceAt(this.getWorldPosition(), this.getWorldDirection());
                if (distance <= 0) {
                    distance = creator.skybox.getDistanceAt(this.getWorldPosition(), this.getWorldDirection());
                }
                weapon.update(distance);
            }
        }
        this.updateMatrix();
    };
    Camera.prototype.windowResize = function () {
        this.aspect = window.innerWidth / window.innerHeight;
        this.updateProjectionMatrix();
        this.resizeChildren();
    };
    Camera.prototype.resizeChildren = function () {
        var fovRadians = THREE.Math.degToRad(this.fov);
        var cameraHeight = 2 * Math.tan(fovRadians / 2);
        var cameraWidth = cameraHeight * this.aspect;
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i] instanceof Weapon) {
                var weapon = this.children[i];
                weapon.resize(cameraWidth, cameraHeight);
            }
        }
    };
    Camera.prototype.updateNetwork = function (pos) {
        this.position.set(pos.x, 0, pos.y);
    };
    return Camera;
}(THREE.PerspectiveCamera));
//# sourceMappingURL=Camera.js.map