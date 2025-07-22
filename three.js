// let scene,
//   camera,
//   renderer,
//   objects = [];

// // Mouse control variables
// let mouseX = 0;
// let mouseY = 0;
// let targetX = 0;
// let targetY = 0;
// let windowHalfX = window.innerWidth / 2;
// let windowHalfY = window.innerHeight / 2;
// let zoomLevel = 1;

// function createPlanet(radius, texturePath, posX, posY, posZ, options = {}) {
//   const planetGroup = new THREE.Group();

//   // Load texture
//   const textureLoader = new THREE.TextureLoader();

//   // Create planet sphere with texture
//   const planetGeometry = new THREE.SphereGeometry(radius, 64, 64);
//   const planetMaterial = new THREE.MeshPhongMaterial({
//     map: textureLoader.load(texturePath),
//     bumpMap: options.bumpMap ? textureLoader.load(options.bumpMap) : null,
//     bumpScale: 0.04,
//     specularMap: options.specularMap ? textureLoader.load(options.specularMap) : null,
//     specular: new THREE.Color('grey'),
//     shininess: 50,
//   });
//   const planet = new THREE.Mesh(planetGeometry, planetMaterial);

//   // Add atmosphere glow
//   const atmosphereGeometry = new THREE.SphereGeometry(radius * 1.15, 64, 64);
//   const atmosphereMaterial = new THREE.ShaderMaterial({
//     transparent: true,
//     side: THREE.BackSide,
//     uniforms: {
//       color: { value: new THREE.Color(options.glowColor || 0x93cfef) },
//       viewVector: { value: camera.position },
//     },
//     vertexShader: `
//       uniform vec3 viewVector;
//       varying float intensity;
//       void main() {
//         vec3 vNormal = normalize(normalMatrix * normal);
//         vec3 vNormel = normalize(normalMatrix * viewVector);
//         intensity = pow(0.6 - dot(vNormal, vNormel), 2.0);
//         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//       }
//     `,
//     fragmentShader: `
//       uniform vec3 color;
//       varying float intensity;
//       void main() {
//         gl_FragColor = vec4(color, 1.0) * intensity;
//       }
//     `,
//   });
//   const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);

//   // Add rings if provided
//   if (options.ringTexture) {
//     const ringGeometry = new THREE.RingGeometry(radius * 1.4, radius * 2.2, 64);
//     const ringMaterial = new THREE.MeshPhongMaterial({
//       map: textureLoader.load(options.ringTexture),
//       transparent: true,
//       side: THREE.DoubleSide,
//     });
//     const ring = new THREE.Mesh(ringGeometry, ringMaterial);
//     ring.rotation.x = Math.PI / 2;
//     planetGroup.add(ring);
//   }

//   // Add clouds if provided
//   if (options.cloudTexture) {
//     const cloudGeometry = new THREE.SphereGeometry(radius * 1.01, 64, 64);
//     const cloudMaterial = new THREE.MeshPhongMaterial({
//       map: textureLoader.load(options.cloudTexture),
//       transparent: true,
//       opacity: 0.8,
//     });
//     const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
//     planetGroup.add(clouds);
//   }

//   planetGroup.add(planet);
//   planetGroup.add(atmosphere);
//   planetGroup.position.set(posX, posY, posZ);
//   return planetGroup;
// }

// function init() {
//   scene = new THREE.Scene();
//   camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//   renderer = new THREE.WebGLRenderer({
//     canvas: document.querySelector('#threeCanvas'),
//     alpha: true,
//     antialias: true,
//   });
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   renderer.setPixelRatio(window.devicePixelRatio);

//   // Lights
//   const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
//   scene.add(ambientLight);

//   const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
//   directionalLight.position.set(5, 3, 5);
//   scene.add(directionalLight);

//   // Create planets
//   const earth = createPlanet(1.2, 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg', 4, 0, -5, {
//     bumpMap: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
//     specularMap: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
//     cloudTexture: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png',
//     glowColor: 0x0077ff,
//   });
//   scene.add(earth);
//   objects.push({ mesh: earth, floatSpeed: 0.001, rotationSpeed: 0.002 });

//   const saturn = createPlanet(0.8, 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/saturn_surface.jpg', 7, 1, -4, {
//     ringTexture: 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/saturn_rings.png',
//     glowColor: 0xffaa00,
//   });
//   scene.add(saturn);
//   objects.push({ mesh: saturn, floatSpeed: 0.0015, rotationSpeed: 0.001 });

//   // Add stars with different colors
//   const starsGeometry = new THREE.BufferGeometry();
//   const starsCount = 3000;
//   const posArray = new Float32Array(starsCount * 3);
//   const colors = new Float32Array(starsCount * 3);

//   for (let i = 0; i < starsCount * 3; i += 3) {
//     posArray[i] = Math.random() * 30 + 10;
//     posArray[i + 1] = (Math.random() - 0.5) * 30;
//     posArray[i + 2] = (Math.random() - 0.5) * 30;

//     // Random star colors (white, blue, yellow)
//     const colorChoice = Math.random();
//     if (colorChoice < 0.6) {
//       colors[i] = 1;
//       colors[i + 1] = 1;
//       colors[i + 2] = 1; // white
//     } else if (colorChoice < 0.8) {
//       colors[i] = 0.6;
//       colors[i + 1] = 0.8;
//       colors[i + 2] = 1; // blue
//     } else {
//       colors[i] = 1;
//       colors[i + 1] = 1;
//       colors[i + 2] = 0.8; // yellow
//     }
//   }

//   starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
//   starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

//   const starsMaterial = new THREE.PointsMaterial({
//     size: 0.05,
//     vertexColors: true,
//     transparent: true,
//     opacity: 0.8,
//   });

//   const starField = new THREE.Points(starsGeometry, starsMaterial);
//   scene.add(starField);
//   objects.push({ mesh: starField, floatSpeed: 0.0001, rotationSpeed: 0.0001 });

//   camera.position.x = 2;
//   camera.position.z = 8;

//   document.addEventListener('mousemove', onDocumentMouseMove);
//   document.addEventListener('wheel', onDocumentMouseWheel);
// }

// function onDocumentMouseMove(event) {
//   mouseX = (event.clientX - windowHalfX) * 0.001;
//   mouseY = (event.clientY - windowHalfY) * 0.001;
// }

// function onDocumentMouseWheel(event) {
//   const delta = Math.sign(event.deltaY);
//   zoomLevel = Math.max(0.5, Math.min(2, zoomLevel + delta * -0.1));
//   camera.position.z = 8 * zoomLevel;
// }

// function animate() {
//   requestAnimationFrame(animate);

//   const time = Date.now() * 0.001;

//   // Smoother camera movement
//   targetX = mouseX * 3;
//   targetY = mouseY * 3;

//   camera.position.x += (targetX - camera.position.x) * 0.05;
//   camera.position.y += (-targetY - camera.position.y) * 0.05;
//   camera.lookAt(scene.position);

//   objects.forEach((obj) => {
//     // Gentle floating animation
//     obj.mesh.position.y += Math.sin(time) * obj.floatSpeed;

//     // Rotation influenced by mouse and individual speed
//     obj.mesh.rotation.x += obj.rotationSpeed + mouseY * 0.03;
//     obj.mesh.rotation.y += obj.rotationSpeed + mouseX * 0.03;
//   });

//   renderer.render(scene, camera);
// }

// function onWindowResize() {
//   windowHalfX = window.innerWidth / 2;
//   windowHalfY = window.innerHeight / 2;
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// }

// window.addEventListener('resize', onWindowResize, false);

// init();
// animate();
