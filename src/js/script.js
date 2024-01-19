import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

//  User Variables
const width = window.innerWidth;
const height = window.innerHeight;
let step = 0;

//#region       SCENE SET UP

//      CREATE RENDERER & APPEND TO DOCUMENT
const renderer = new THREE.WebGLRenderer();

renderer.setSize(width, height);

document.body.appendChild(renderer.domElement);

//      CREATE A SCENE & CAMERA
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    width / height,
    0.1,
    1000
);

camera.position.set(-7, 35, 55);

//#endregion


//#region       HELPERS

//      ORBIT CONTROLS
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

//      CREATE AXES HELPER
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//      GRID HELPER
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

//#endregion


//#region       OBJECTS

//      CREATE & ADD PLANE
const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff55,
    side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);

//      CREATE & ADD BOX
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00bb00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

//      CREATE & ADD SPHERE
const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    wireframe: false
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-10, 10, 0);
scene.add(sphere);

//#endregion


//#region       GUI

const gui = new dat.GUI();

const options = {
    sphereColor: '#0000ff',
    wireframe: false,
    speed: 0.01
};

gui.addColor(options, 'sphereColor').onChange((e) => {
    sphere.material.color.set(e);
});

gui.add(options, 'wireframe').onChange((e) => {
    sphere.material.wireframe = e;
});

gui.add(options, 'speed', 0, 0.1);

//#endregion


//#region       ANIMATION

//      CREATE ANIMATION
const animate = (time) => {
    box.rotation.x = time/1000;
    box.rotation.y = time / 1000;
    
    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step));
    
    renderer.render(scene, camera);
};

//#endregion



//      RENDER ON-SCREEN
renderer.setAnimationLoop(animate);




