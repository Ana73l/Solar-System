class CelestialBody {
  constructor(radius,texture,positionX,orbitsAround,rotSpeed,orbitSpeed) {
    //the actual body, referred as body.children[0]
    this.self = new THREE.Mesh(
      new THREE.SphereGeometry(radius,32,32),
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(texture)
      })
    );
    this.self.position.set(positionX,0,200);

    //its pivot for orbitting around another body
    this.body = new THREE.Object3D();
    this.body.position.set(orbitsAround.children[0].position.x,
      orbitsAround.children[0].position.y,
       orbitsAround.children[0].position.z);
    this.body.rotSpeed = rotSpeed;
    this.body.orbitSpeed = orbitSpeed;

    //attach camera to this, reffered as body.chidren[1]
    this.forCam = new THREE.Object3D();
    this.forCam.radius = radius;
    this.forCam.position.set(positionX,0,200);

    this.body.add(this.self);
    this.body.add(this.forCam);
    orbitsAround.add(this.body);
    spaceBodies.push(this.body);
    return this.body;
  }
}

function  moveBodies(bodies) {
  _(bodies).forEach(function(body){
    body.children[0].rotation.y += body.rotSpeed;
    body.rotation.y += body.orbitSpeed;

  });
}

function addCamToBody(lookAt,attBody,camera) {
  lookAt.children[1].rotation.y += attBody.orbitSpeed;
  lookAt.children[1].add(camera);
  camera.position.set(attBody.children[1].position.x,
    attBody.children[1].position.y,
      attBody.children[1].position.z);

}

