 var scene = new THREE.Scene(),
 solCenter = new THREE.Object3D(),
 camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000000000000),
 renderer = new THREE.WebGLRenderer({ antialias: true}),
 controls = new THREE.OrbitControls(camera, renderer.domElement),
 spaceBodies = [];


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

  scene.add(solCenter);
  //sun
  var star = new CelestialBody(695.7,'sun.jpg',0,scene,0.01,0);

  //mercury
  var mercury = new CelestialBody(200.44,'mercury.jpg',57910,star,0.02,0.002);

  //venus
  var venus = new CelestialBody(600.05,'venus.jpg',108200,star,0.02,0.0015);

  //earth
  var earth = new CelestialBody(600.371,'earth.jpg',149600,star,0.1,0.005);
  //var rgeometry = new THREE.RingGeometry( 149900, 150100, 40 );
  //  var rmaterial = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
  //var rmesh = new THREE.Mesh( rgeometry, rmaterial );
  //scene.add( rmesh );

  //moon
  var moon = new CelestialBody(100.737,'moon.jpg',384,earth,0.001,0.01);

  //mars
  var mars = new CelestialBody(300.389,'mars.jpg',228000,star,0.01,0.01);

  //jupiter
  var jupiter = new CelestialBody(690.911,'jupiter.png',778500,star,0.01,0.01);

  //particles
  var geometry = new THREE.Geometry();
	for ( var i = 0; i < 10000; i ++ ) {
		var vertex = new THREE.Vector3();
		vertex.x = THREE.Math.randFloatSpread( 100000000000 );
		vertex.y = THREE.Math.randFloatSpread( 100000000000 );
		vertex.z = THREE.Math.randFloatSpread( 100000000000 );
		geometry.vertices.push( vertex );
	}
	var particles = new THREE.Points( geometry, new THREE.PointsMaterial( { color: 0x888888 } ) );

  scene.add(camera);
  scene.add(pointLight);
	scene.add(particles);
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
}

function render() {
  requestAnimationFrame(render);

  //addCamToBody(spaceBodies[0],spaceBodies[1],camera);
  moveBodies(spaceBodies);
  renderer.render(scene, camera);
}
