// Configuración Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ 
  alpha: true, 
  antialias: true 
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("canvas-container").appendChild(renderer.domElement);

// Crear espiral Fibonacci
const createSpiral = () => {
  const group = new THREE.Group();
  const geometry = new THREE.TetrahedronGeometry(0.4, 0);
  const material = new THREE.MeshBasicMaterial({
    color: 0x00a8ff,
    wireframe: true,
    transparent: true,
    opacity: 0.7
  });

  for (let i = 0; i < 400; i++) {
    const theta = i * 0.25;
    const radius = Math.sqrt(i) * 0.5;
    const x = radius * Math.cos(theta)*2;
    const y = radius * Math.sin(theta)*2;
    const shape = new THREE.Mesh(geometry, material);
    shape.position.set(x, y, 0); // Z=0 para todas
    group.add(shape);
  }
  return group;
};

const spiral = createSpiral();
scene.add(spiral);

// Posición inicial de la cámara
camera.position.z = 15;
let baseCameraY = camera.position.y;

// Control de scroll
let targetRotation = 0;
let currentRotation = 0;

window.addEventListener('scroll', () => {
  targetRotation = window.scrollY * 0.02; // Ajusta velocidad de rotación
  // Compensación del scroll moviendo la cámara (no la espiral)
  camera.position.y = baseCameraY - window.scrollY * 0.01; // Ajusta este valor para mayor/menor movimiento
});

// Animación
const animate = () => {
  requestAnimationFrame(animate);
  
  // Rotación suavizada
  currentRotation += (targetRotation - currentRotation) * 0.05;
  spiral.rotation.y = currentRotation;
  
  renderer.render(scene, camera);
};
animate();

// Responsive
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
