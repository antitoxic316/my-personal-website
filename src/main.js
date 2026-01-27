import * as THREE from 'three'
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';


// some code adapted from https://threejs.org/manual/#en/picking

const pickPosition = {x: 0, y: 0};
clearPickPosition();
 
class PickHelper {
  constructor() {
    this.raycaster = new THREE.Raycaster();
    this.pickedObject = null;
    this.pickedObjectSavedColor = 0;
    this.pickedObjectSavedAlpha = 0;
  }
  pick(normalizedPosition, scene, camera, time) {
    // restore the color if there is a picked object
    if (this.pickedObject) {
      this.pickedObject.material.emissive.setHex(this.pickedObjectSavedColor);
      this.pickedObject.material.opacity = this.pickedObjectSavedAlpha;
      this.pickedObject = undefined;
    }
 
    this.raycaster.setFromCamera(normalizedPosition, camera);
    const intersectedObjects = this.raycaster.intersectObjects(scene.children);
    if (intersectedObjects.length) {
      // pick the first object. It's the closest one
      this.pickedObject = intersectedObjects[0].object;

      this.pickedObjectSavedColor = this.pickedObject.material.emissive.getHex();
      this.pickedObject.material.emissive.setHex((time * 8) % 2 > 1 ? 0xFFFF00 : 0xFF0000);

      this.pickedObjectSavedAlpha = this.pickedObject.material.opacity;
      this.pickedObject.material.opacity = 1;
    }
  }
}

class CanvasRotator {
  prevEv = null;
  mousePressed = false;

  constructor(canvasContainer, obj){
    this.obj = obj;

    canvasContainer.addEventListener('mousedown', (event) => {
      this.mousePressed = true;
    });
    canvasContainer.addEventListener('mouseup', (event) => {
      this.mousePressed = false;
      this.prevEv = null;
    });
    
    canvasContainer.addEventListener('mousemove', (event) => {
      if (!this.mousePressed) return;
      if (!this.prevEv){
        this.prevEv = event;
        return;
      }
    
      this.dragRotate(this.prevEv, event);
      this.prevEv = event;
    });
  }

  dragRotate(prevEv, ev) {
    console.log(this.prevEv.clientX - ev.clientX)
    console.log(this.prevEv.clientY - ev.clientY)

    var xVec = this.prevEv.clientX - ev.clientX;
    var yVec = this.prevEv.clientY - ev.clientY;

    this.obj.rotation.y -= xVec / canvas.clientWidth * Math.PI;
    this.obj.rotation.x -= yVec / canvas.clientHeight * Math.PI;
  }
}

const elem = document.getElementById("rendererDiv")
const canvas = elem.firstElementChild

if(elem) {
  const defWidth = 200;
  const defHeight = 200;

  //if one of div dimensions rendered wrong due to style misconfig
  const width = elem.clientWidth ? elem.clientWidth : defWidth;
  const height = elem.clientHeight ? elem.clientHeight : defHeight;

  const fov = 75;
  const aspect = width / height;
  const near = 0.1;
  const far = 1000;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
  renderer.setSize( width, height );

  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  camera.position.set(0, 1, 5);

  const gltfLoader = new GLTFLoader();
  gltfLoader.load(elem.dataset.laptopObjUrl, (gltf) => {
    const root = gltf.scene;
    scene.add(root);
    root.rotation.z += 0.5

    const canvasRotator = new CanvasRotator(elem, root);
  });

  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.AmbientLight(color, intensity);

  camera.add(light)

  const cameraPole = new THREE.Object3D();
  scene.add(cameraPole);
  cameraPole.add(camera);

  const pickHelper = new PickHelper();

  function animate() {
    renderer.render( scene, camera );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    pickHelper.pick(pickPosition, scene, camera, 0);
  }  

  renderer.setAnimationLoop( animate ); 
}


function getCanvasRelativePosition(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * canvas.width  / rect.width,
    y: (event.clientY - rect.top ) * canvas.height / rect.height,
  };
}
 
function setPickPosition(event) {
  const pos = getCanvasRelativePosition(event);
  pickPosition.x = (pos.x / canvas.width ) *  2 - 1;
  pickPosition.y = (pos.y / canvas.height) * -2 + 1;  // note we flip Y
}
 
function clearPickPosition() {
  // unlike the mouse which always has a position
  // if the user stops touching the screen we want
  // to stop picking. For now we just pick a value
  // unlikely to pick something
  pickPosition.x = -100000;
  pickPosition.y = -100000;
}
 
window.addEventListener('mousemove', setPickPosition);
window.addEventListener('mouseout', clearPickPosition);
window.addEventListener('mouseleave', clearPickPosition);
window.addEventListener('touchstart', (event) => {
  // prevent the window from scrolling
  event.preventDefault();
  setPickPosition(event.touches[0]);
}, {passive: false});
 
window.addEventListener('touchmove', (event) => {
  setPickPosition(event.touches[0]);
});
 
window.addEventListener('touchend', clearPickPosition);