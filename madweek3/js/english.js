import * as THREE from '../node_modules/three/build/three.module.js';
import gsap from 'https://cdn.skypack.dev/gsap';

import {OrbitControls} from '../node_modules/three/build/OrbitControls.js';
import {FontLoader} from '../node_modules/three/build/FontLoader.js';
import {TextGeometry} from '../node_modules/three/build/TextGeometry.js';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101010);

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Animation
function animate() {
  requestAnimationFrame(animate);

  // Rotate the cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start the animation
animate();