
var height = window.innerHeight / 2,
    width = window.innerWidth / 2;


var renderer = new THREE.WebGLRenderer( { antialias: true} );
renderer.setSize(width, height);
renderer.autoClear = true;
document.body.appendChild(renderer.domElement);

// perspective and orthographic cameras
var pCamera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var oCamera = new THREE.OrthographicCamera(width/-2, width/2, height/2, height/-2, 0.1, 1000);

var scene = new THREE.Scene();

var cubeMaterial = new THREE.MeshBasicMaterial( {color: 0x45ffee} ),
    cylMaterial = new THREE.MeshBasicMaterial( {color: 0x5a0a40} ),
    cylGeometry = new THREE.CylinderGeometry(1.25, 2.5, 1.5, 18),
    cubeGeo = new THREE.CubeGeometry(2, 2.5, 2);

window.addEventListener('resize', function() {
    var width = window.innerWidth / 2,
        height = window.innerHeight / 2;
    renderer.setSize(width, height);
    oCamera.aspect = width/height;
    oCamera.updateProjectionMatrix();
});

function objectFrame(object, color, posx, posy, posz) {
    var geo = new THREE.EdgesGeometry( object );
    var mat = new THREE.LineBasicMaterial( { color: color } );
    var obj = new THREE.LineSegments( geo, mat );
    obj.position.y=posy;
    obj.position.x=posx;
    obj.position.z=posz;
    scene.add( obj );    
}

function clearScene() {
    while(scene.children.length)
        scene.remove(scene.children[0]);
}

function side() {

    var cube = new THREE.Mesh(cubeGeo, cubeMaterial);
    objectFrame(cubeGeo, 0x000000, 0, 0, 0);

    var cylinder = new THREE.Mesh(cylGeometry, cylMaterial);
    objectFrame(cylGeometry, 0x000000, 0, 2, 0);
    cylinder.position.y = 2;

    var offset = 120, hei = window.innerHeight/2,
        camera = new THREE.OrthographicCamera(width/-offset, width/offset, 
                                               hei/offset, hei/-offset, .1, 1000 );
    camera.position.z = 0;
    camera.position.x = -20;
    camera.rotation.y = -90*Math.PI/180;
    
    scene.add(cube, cylinder, camera);

    renderer.clear();
    renderer.setClearColor(0xffefe0);
    renderer.render(scene, camera); 
    clearScene();
}

function front() {
 
    var cube = new THREE.Mesh(cubeGeo, cubeMaterial);
    objectFrame(cubeGeo, 0x000000, 0, 0, 0);
    
    var cylinder = new THREE.Mesh(cylGeometry, cylMaterial);
    objectFrame(cylGeometry, 0x000000, 0, 2, 0);
    cylinder.position.y = 2;
    
    var offset = 142,
        camera = new THREE.OrthographicCamera(width/-offset, width/offset,
                                              height/offset, height/-offset, .1, 1000 );
    camera.position.z = 5;

    scene.add(cube, cylinder, camera);

    renderer.clear();
    renderer.setClearColor(0xffefe0);
    renderer.render(scene, camera);
    clearScene();
}

function top_() {
    var wid = window.innerWidth/2; 
        hei = window.innerHeight/2;

    var cube = new THREE.Mesh(cubeGeo, cubeMaterial);
    objectFrame(cubeGeo, 0x000000, 0, 0, 0);

    var cylinder = new THREE.Mesh(cylGeometry, cylMaterial);
    cylinder.position.y = 1;
    objectFrame(cylGeometry, 0x000000, 0, 1, 0);

    var offset = 88;
    camera = new THREE.OrthographicCamera(wid/-offset, wid/offset,
        hei/offset, hei/-offset, .1, 1000);

    camera.position.z = 0;
    camera.position.y = 3;
    camera.rotation.x = -90*Math.PI/180;
        
    scene.add(cube, cylinder, camera);
    renderer.setClearColor(0xffefe0);
    renderer.render(scene, camera);
    clearScene();
}



/*
var update = function() {
    renderer.clear();
}

var render = function(scene, camera) {
    renderer.render(scene, camera);
}

var gameLoop = function() {
    requestAnimationFrame(gameLoop);

    // update scene
    update();

    //
    render();
};

//gameLoop();
*/