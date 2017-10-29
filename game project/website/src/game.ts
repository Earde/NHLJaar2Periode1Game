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
///<reference path="Light.ts" />
///<reference path="Enemy.ts" />
///<reference path="Text2D.ts" />
///<reference path="GameFunctions.ts" />

//Three.js init
let scene = new THREE.Scene();
let renderer = new THREE.WebGLRenderer();
let clock = new THREE.Clock();
let delta = clock.getDelta();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild( renderer.domElement );

//create meshes + light
let creator = new SceneCreator(scene);
creator.load();

//on window resize
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    creator.camera.windowResize();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

//game handler
let gameFunctions = new GameFunctions();

//mouse
let mouseX = 0.0, mouseY = 0.0;
let isMouseDown = false;
let isLocked = false;
document.addEventListener('mousedown', onDocumentMouseDown, false);
document.addEventListener('mousemove', onDocumentMouseMove, false);
document.addEventListener('mouseup', onDocumentMouseUp, false);
document.addEventListener('click', onDocumentMouseClick, false);
document.addEventListener('pointerlockchange', onDocumentPointerLockChanged, false);
function onDocumentMouseMove( event ) {
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
    if (document.pointerLockElement === document.body) isLocked = true;
    else isLocked = false;
}

//keyboard
let keyMap = [];
document.addEventListener("keydown", onDocumentKeyDown, true);
document.addEventListener("keyup", onDocumentKeyUp, true);
function onDocumentKeyDown(event) {
    if (isLocked) keyMap[event.keyCode] = true;
}
function onDocumentKeyUp(event){
    keyMap[event.keyCode] = false;
}

//networking
let network = new Networking(creator);
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
let render = function() {
    requestAnimationFrame( render );
    renderer.render( scene, creator.camera );
    ProcessGame();
};

render();