let scene, camera, render;

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdddddd);

  camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    1,
    5000
  );
  camera.rotation.y = (45 / 180) * Math.PI;
  camera.position.x = 80;
  camera.position.y = 10;
  camera.position.z = 20;

  hlight = new THREE.AmbientLight(0x404040, 100);
  scene.add(hlight);

  directionalLight = new THREE.DirectionalLight(0xffffff, 100);
  directionalLight.position.set(0, 1, 0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  light = new THREE.PointLight(0xc4c4cc4, 10);
  light.position.set(0, 300, 500);
  scene.add(light);

  light2 = new THREE.PointLight(0xc4c4cc4, 10);
  light.position.set(500, 100, 0);
  scene.add(light2);

  light3 = new THREE.PointLight(0xc4c4cc4, 10);
  light.position.set(0, 100, -500);
  scene.add(light3);

  light4 = new THREE.PointLight(0xc4c4cc4, 10);
  light.position.set(-5000, 300, 0);
  scene.add(light4);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  document.body.appendChild(renderer.domElement);

  let loader = new THREE.GLTFLoader();
  loader.load("../3d-obj-loader/bulbe/bulb.gltf", function(gltf) {
    car = gltf.scene.children[0];
    car.scale.set(10, 10, 10);
    scene.add(gltf.scene);
    animate();
    var bb = new THREE.Box3();
    bb.setFromObject(car);
    bb.center(controls.target);
  });

  // var loader = new THREE.OBJLoader();
  // loader.load("../3d-obj-loader/pokeplante.obj", function(object) {
  //   object.traverse(function(child) {
  //     if (child instanceof THREE.Mesh) {
  //       child.material.ambient.setHex(0xff0000);
  //       child.material.color.setHex(0x00ff00);
  //     }
  //   });

  //   object.position.y = 0;
  //   scene.add(object);
  // });

  // let loader = new THREE.OBJLoader();
  // loader.load("../3d-obj-loader/pokeplante.obj", function(obj) {
  //   car = obj.scene.children[0];
  //   car.scale.set(10, 10, 10);
  //   scene.add(obj);
  //   animate();

  //   var bb = new THREE.Box3();
  //   bb.setFromObject(car);
  //   bb.center(controls.target);
  // });
}

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
init();
