var scene = new THREE.Scene(),
 camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000000),
 renderer = new THREE.WebGLRenderer({ antialias: true }),
 controls = new THREE.OrbitControls(camera, renderer.domElement),
 earth,
 moon,
 star,
 mercuryPivot,
 earthPivot,
 moonPivot;


function init() {
  //scale 1 000 000 = 1 000
  camera.position.z = 500000;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;

  //light
  var pointLight = new THREE.PointLight(0xFFFFF);
  pointLight.position.z = 100;

  //sun
  var starGeometry = new THREE.SphereGeometry(695.7, 32, 32);
  var starTexture = new THREE.TextureLoader().load('sun.jpg');
  var starMaterial = new THREE.MeshBasicMaterial({ map: starTexture });
  star = new THREE.Mesh(starGeometry, starMaterial);

  //mercury
  mercuryPivot = new THREE.Object3D();
  mercuryPivot.position = star.position;
  star.add(mercuryPivot);
  var mercuryGeometry = new THREE.SphereGeometry(2.44, 32, 32);
  var mercuryTexture = new THREE.TextureLoader().load('mercury.jpg');
  var mercuryMaterial = new THREE.MeshBasicMaterial({ map: mercuryTexture });
  mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
  mercury.position.set(58000,100,200);
  mercuryPivot.add(mercury);

  //earth
  earthPivot = new THREE.Object3D();
  earthPivot.position = star.position;
  star.add(earthPivot);
  var earthGeometry = new THREE.SphereGeometry(6.371, 32, 32);
  var earthTexture = new THREE.TextureLoader().load('earth.jpg');
  var earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
  earth = new THREE.Mesh(earthGeometry, earthMaterial);
  earth.position.set(150000,100,200);
  earthPivot.add(earth);

  //moon
  moonPivot = new THREE.Object3D();
  moonPivot.position = earth.position;
  earth.add(moonPivot);
  var moonGeometry = new THREE.SphereGeometry(1.737, 32, 32);
  var moonTexture = new THREE.TextureLoader().load('moon.jpg');
  var moonMaterial = new THREE.MeshBasicMaterial( { map: moonTexture });
  moon = new THREE.Mesh(moonGeometry, moonMaterial);
  moon.position.set(3840, 100, 200);
  moonPivot.add(moon);


  //particles
  var geometry = new THREE.Geometry();
	for ( var i = 0; i < 10000; i ++ ) {
		var vertex = new THREE.Vector3();
		vertex.x = THREE.Math.randFloatSpread( 10000000 );
		vertex.y = THREE.Math.randFloatSpread( 10000000 );
		vertex.z = THREE.Math.randFloatSpread( 10000000 );
		geometry.vertices.push( vertex );
	}
	var particles = new THREE.Points( geometry, new THREE.PointsMaterial( { color: 0x888888 } ) );

  scene.add(pointLight);
	scene.add(particles);
  scene.add(star);
}

function render() {
  requestAnimationFrame(render);

  earth.rotation.y -= 0.02;
  //earth.position.x += -2;
  moon.rotation.y += 0.1;
  moonPivot.rotation.y += 0.001;
  earthPivot.rotation.y += 0.01;
  mercuryPivot.rotation.y += 0.01;
  //moon.position.x += -2;

  renderer.render(scene, camera);
}
