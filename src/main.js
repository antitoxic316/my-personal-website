import * as THREE from 'three'
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';

const elem = document.getElementById("rendererDiv")
console.log(elem)
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

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( width, height );
  elem.appendChild( renderer.domElement );

  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  camera.position.set(0, 5, 15);

  const objLoader = new OBJLoader();
  objLoader.load(elem.dataset.laptopObjUrl, (root) => {
    scene.add(root);
  }, undefined, function ( error ) {
    console.error( error );
  });

  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.AmbientLight(color, intensity);
  scene.add(light);

  function animate() {
    renderer.render( scene, camera );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }  

  renderer.setAnimationLoop( animate ); 
}