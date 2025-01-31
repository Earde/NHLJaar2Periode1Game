var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var SceneCreator = /** @class */ (function () {
    function SceneCreator(s) {
        var _this = this;
        this.tickTime = 0.02;
        this.createObjects = function () { return __awaiter(_this, void 0, void 0, function () {
            var lightColor, lightOrigin, enemyCountMax, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.models = [];
                        this.skybox = new Skybox(3000, 3000, 3000);
                        this.heightmap = new Heightmap(750, 52, 750);
                        this.camera = new Camera();
                        this.player = new Player();
                        //0xAAFFAA = classic groene crosshair
                        //rood 0xFF1111
                        this.crosshair = new Crosshair(0.01, 0.01, 1, 0xEEEEEE);
                        lightColor = 0xffffff;
                        this.lights = [];
                        lightOrigin = new THREE.Vector3(-(this.skybox.width / 2), this.skybox.height / 3, -(this.skybox.depth / 2) / 4);
                        this.lights.push(new DirectLight(lightOrigin.x, lightOrigin.y, lightOrigin.z, lightColor));
                        this.lights.push(new THREE.AmbientLight(lightColor, 1));
                        enemyCountMax = 20;
                        this.enemies = [];
                        this.enemyBullets = [];
                        for (i = 0; i < enemyCountMax; i++) {
                            this.enemies.push(new Enemy());
                            this.enemyBullets.push(new EnemyBullet());
                        }
                        this.text2D = new Text2D(50, 25, 100);
                        this.text2D.createText("0");
                        this.weapon = new Weapon();
                        this.bullet = new Bullet();
                        return [4 /*yield*/, this.loadObjects()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.loadObjects = function () { return __awaiter(_this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                this.skybox.load(this.scene);
                this.heightmap.load(this.scene);
                this.scene.add(this.camera);
                this.crosshair.load(this.camera);
                for (i = 0; i < this.lights.length; i++) {
                    this.scene.add(this.lights[i]);
                }
                this.bullet.load();
                return [2 /*return*/];
            });
        }); };
        this.scene = s;
    }
    SceneCreator.prototype.loadModels = function (n) {
        if (n == 0) {
            this.weapon.loadObject(this.models[n], this.camera, new THREE.Vector3(0.6, 0.6, 0.6));
            this.camera.resizeChildren();
        }
        else if (n == 1) {
            this.player.loadObject(this.models[n], this.camera, new THREE.Vector3(3, 3, 3));
            for (var i = 0; i < this.enemies.length; i++) {
                this.enemies[i].loadObject(this.models[n], this.scene, new THREE.Vector3(3, 3, 3));
            }
        }
    };
    SceneCreator.prototype.failed = function (error) {
        console.log(error);
    };
    SceneCreator.prototype.load = function () {
        try {
            this.createObjects();
        }
        catch (error) {
            this.failed(error);
        }
    };
    return SceneCreator;
}());
//# sourceMappingURL=SceneCreator.js.map