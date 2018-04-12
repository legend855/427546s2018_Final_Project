

var scene = new THREE.Scene( );
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)

var renderer = new THREE.WebGLRenderer( );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
});

controls = new THREE.OrbitControls(camera, renderer.domElement);

/*      SHAPES AND MATERIALS     */
var geometry = new THREE.BoxGeometry(2, 2, 2);
var cubeMaterials = [
        new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('img/side.png'), side: THREE.DoubleSide}),  // left 
        new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('img/front.png'), side: THREE.DoubleSide}),  // top
        new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load('img/top.png'), side: THREE.DoubleSide}),  // bottom
        new THREE.MeshLambertMaterial({color: 0x00FFFF, side: THREE.DoubleSide}), // front
        new THREE.MeshLambertMaterial({color: 0xFF00FF, side: THREE.DoubleSide}), // back
        new THREE.MeshLambertMaterial({color: 0xFFFF00, side: THREE.DoubleSide})
    ];
var material = new THREE.MeshFaceMaterial( cubeMaterials);
var cube = new THREE.Mesh(geometry, material);

var sphGeometry = new THREE.SphereGeometry(1, 8, 8);
var sMaterial = new THREE.MeshPhongMaterial({color: 0x333333});
var sphere = new THREE.Mesh(sphGeometry, sMaterial);
sphere.position.set(1, 0, 0);
cube.position.set(-1, 0, 0);
scene.add(cube);
scene.add(sphere);



/*      CAMERA      */
// change camera position from origin 
camera.position.z = 5;
//camera.position.y = 10;


/*   LIGHTING   */
//color and intensity are the params
var ambientlight = new THREE.AmbientLight(0xFFFFFF, 0.5);
scene.add(ambientlight);

// Point light
var light1 = new THREE.PointLight(0x490045, 3.4, 50);
var light2 = new THREE.PointLight(0x000045, 3.3, 50);
var light3 = new THREE.PointLight(0xFF00B1, 3.3, 40);

scene.add(light1);
scene.add(light2);
scene.add(light3);


// directional light
var directionalLight = new THREE.DirectionalLight(0xFF0048, 3.0);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);

// logic 
var update = function() {
    var time = Date.now() * 0.0005;

    light1.position.x = Math.sin(time*0.7) * 30;
    light1.position.y = Math.cos(time*0.5) * 40;
    light1.position.z = Math.cos(time*0.6) * 30;

    light2.position.x = Math.sin(time*0.7) * 30;
    light2.position.y = Math.cos(time*0.5) * 40;
    light2.position.z = Math.sin(time*0.6) * 30;

    light3.position.x = Math.cos(time*0.7) * 30;
    light3.position.y = Math.sin(time*0.5) * 40;
    light3.position.z = Math.cos(time*0.6) * 30;
    
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    sphere.rotation.z += 0.01;
    
}

// draw scene
var render = function() {
    // everything to be d rawn will go here 
    renderer.render(scene, camera);
}

var gameLoop = function() {
    requestAnimationFrame(gameLoop);

    // update scene
    update();

    //
    render();

};

gameLoop();

