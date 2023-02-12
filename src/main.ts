import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './style.css'


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#canvas')
});
const loader = new GLTFLoader();



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(30)

loader.load('/scene.gltf', function (gltf) {

  const material = new THREE.MeshStandardMaterial({ color: 0xff3347 })
  // const car = new THREE.Mesh(gltf.mesh, material)
  // scene.add(car);
  scene.add(gltf.scene)

  const softLight = new THREE.AmbientLight(0x404040, 50); // soft white light
  scene.add(softLight);

  const pl = new THREE.PointLight(0xffffff, 20)
  pl.position.set(50, 50, 50)
  scene.add(pl)

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  scene.background = new THREE.Color(0x333333);
  // scene.environment = new RGBELoader().load('/venice_sunset_1k.hdr');
  // scene.environment.mapping = THREE.EquirectangularReflectionMapping;
  scene.fog = new THREE.Fog(0x333333, 0, 300);

  let grid = new THREE.GridHelper(20, 40, 0xffffff, 0xffffff);
  grid.material.opacity = 0.2;
  grid.material.depthWrite = false;
  grid.material.transparent = true;
  scene.add(grid);

  camera.position.set(0, 20, 100);
  controls.update();

  function animate() {

    requestAnimationFrame(animate);

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();

    renderer.render(scene, camera);

  }
  animate()



}, undefined, function (error) {

  console.error(error);

});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.85;

// camera.position.z = 30;

// function animate() {
//   requestAnimationFrame(animate);
//   renderer.render(scene, camera);
// }
// animate();
