///<reference path="../typings/index.d.ts" />
///<reference path="Camera.ts" />
///<reference path="SceneCreator.ts" />
///<reference path="MeshLoader.ts" />
///<reference path="Player.ts" />
///<reference path="Skybox.ts" />
///<reference path="Heightmap.ts" />
///<reference path="Crosshair.ts" />
///<reference path="Weapon.ts" />
///<reference path="Bullet.ts" />
///<reference path="EnemyBullet.ts" />
///<reference path="PLight.ts" />
///<reference path="DirectLight.ts" />
///<reference path="Enemy.ts" />
///<reference path="Text2D.ts" />
///<reference path="ObjectLoader.ts" />
///<reference path="GameFunctions.ts" />
//Three.js init
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
var clock = new THREE.Clock();
var delta = clock.getDelta();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);
//create meshes + light
var creator = new SceneCreator(scene);
creator.load();
//load object files
var objectLoader = new ObjectLoader();
objectLoader.loadObjectFiles(creator);
//on window resize
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    creator.camera.windowResize();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
//game handler
var gameFunctions = new GameFunctions();
//mouse
var mouseX = 0.0, mouseY = 0.0;
var isMouseDown = false;
var isLocked = false;
document.addEventListener('mousedown', onDocumentMouseDown, false);
document.addEventListener('mousemove', onDocumentMouseMove, false);
document.addEventListener('mouseup', onDocumentMouseUp, false);
document.addEventListener('click', onDocumentMouseClick, false);
document.addEventListener('pointerlockchange', onDocumentPointerLockChanged, false);
function onDocumentMouseMove(event) {
    if (isLocked) {
        mouseX += event.movementX;
        mouseY += event.movementY;
    }
}
function onDocumentMouseDown(event) {
    isMouseDown = true;
}
function onDocumentMouseUp(event) {
    isMouseDown = false;
}
function onDocumentMouseClick(event) {
    document.body.requestPointerLock();
}
function onDocumentPointerLockChanged(event) {
    if (document.pointerLockElement === document.body)
        isLocked = true;
    else
        isLocked = false;
}
//keyboard
var keyMap = [];
document.addEventListener("keydown", onDocumentKeyDown, true);
document.addEventListener("keyup", onDocumentKeyUp, true);
function onDocumentKeyDown(event) {
    if (isLocked)
        keyMap[event.keyCode] = true;
}
function onDocumentKeyUp(event) {
    keyMap[event.keyCode] = false;
}
//networking
var network = new Networking(creator);
network.connect();
//game handler
function ProcessGame() {
    delta = clock.getDelta();
    gameFunctions.update(creator, network, delta, keyMap, mouseX, mouseY, isMouseDown);
    //reset mouse movement
    mouseX = 0.0;
    mouseY = 0.0;
}
//loop function for drawing + game process
var render = function () {
    requestAnimationFrame(render);
    renderer.render(scene, creator.camera);
    ProcessGame();
};
render();
//# sourceMappingURL=game.js.map