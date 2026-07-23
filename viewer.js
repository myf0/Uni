import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const container = document.getElementById("viewer");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#f8f8f8");

// Camera
const camera = new THREE.PerspectiveCamera(
45,
container.clientWidth / container.clientHeight,
0.1,
1000
);

camera.position.set(0,1.2,3);

// Renderer
const renderer = new THREE.WebGLRenderer({
antialias:true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(container.clientWidth,container.clientHeight);

container.appendChild(renderer.domElement);

// Controls
const controls=new OrbitControls(camera,renderer.domElement);

controls.enableDamping=true;
controls.autoRotate=true;
controls.autoRotateSpeed=1;

controls.minDistance=1;
controls.maxDistance=6;

// Lights
const ambient=new THREE.AmbientLight(0xffffff,2);

scene.add(ambient);

const light1=new THREE.DirectionalLight(0xffffff,4);

light1.position.set(5,5,5);

scene.add(light1);

const light2=new THREE.DirectionalLight(0xffffff,2);

light2.position.set(-5,5,-5);

scene.add(light2);

// Ground Shadow
const plane=new THREE.Mesh(

new THREE.CircleGeometry(2,64),

new THREE.ShadowMaterial({
opacity:0.2
})

);

plane.rotation.x=-Math.PI/2;

scene.add(plane);

// Loader
const loader=new GLTFLoader();

let model;

// Load Default Model
loader.load(

"models/cap.glb",

(gltf)=>{

model=gltf.scene;

scene.add(model);

fitModel();

},

undefined,

(error)=>{

console.log(error);

}

);

// Fit Camera
function fitModel(){

const box=new THREE.Box3().setFromObject(model);

const size=box.getSize(new THREE.Vector3()).length();

const center=box.getCenter(new THREE.Vector3());

controls.target.copy(center);

camera.position.set(
center.x,
center.y+size/4,
center.z+size
);

controls.update();

}

// Upload Model
const upload=document.getElementById("upload");

upload.addEventListener("change",(e)=>{

const file=e.target.files[0];

if(!file)return;

const url=URL.createObjectURL(file);

loader.load(url,(gltf)=>{

if(model){

scene.remove(model);

}

model=gltf.scene;

scene.add(model);

fitModel();

});

});

// Reset Camera
document.getElementById("resetCamera")

.addEventListener("click",()=>{

camera.position.set(0,1.2,3);

controls.target.set(0,0,0);

});

// Resize
window.addEventListener("resize",()=>{

camera.aspect=container.clientWidth/container.clientHeight;

camera.updateProjectionMatrix();

renderer.setSize(
container.clientWidth,
container.clientHeight
);

});

// Animation
function animate(){

requestAnimationFrame(animate);

controls.update();

renderer.render(scene,camera);

}

animate();