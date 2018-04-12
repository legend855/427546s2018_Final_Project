
var height = window.innerHeight / 2,
    width = window.innerWidth / 2;

var renderer = new THREE.WebGLRenderer( { antialias: true} );
renderer.setSize(width, height);
renderer.autoClear = true;
document.body.appendChild(renderer.domElement);

// perspective and orthographic cameras
var pCamera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var oCamera = new THREE.OrthographicCamera(width/-2, width/2, height/2, height/-2, 0.1, 1000);

var scene;// = new THREE.Scene();

window.addEventListener('resize', function() {
    var width = window.innerWidth / 2,
        height = window.innerHeight / 2;
    renderer.setSize(width, height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix();
});

function createObject(object, color, posx, posy, posz) {
    var geo = new THREE.EdgesGeometry( object );
    var mat = new THREE.LineBasicMaterial( { color: color } );
    var obj = new THREE.LineSegments( geo, mat );
    obj.position.y=posy;
    obj.position.x=posx;
    obj.position.z=posz;
    scene.add( obj );    
}

function side() {
    scene = new THREE.Scene();

    var house = new THREE.CubeGeometry(2, 2.5, 2);
    var material = new THREE.MeshBasicMaterial( {color: 0x45ffee} );
    var cube = new THREE.Mesh(house, material);
    //scene.add(cube);
    createObject(house, 0x000000, 0, 0, 0);

    var wGeometry = new THREE.CylinderGeometry(1.25, 1.5, 1.5, 4);
    material = new THREE.MeshBasicMaterial( {color: 0x5a0a4e} );
    var cylinder = new THREE.Mesh(wGeometry, material);
    cylinder.position.y = 2;
    //scene.add(cylinder);

    createObject(wGeometry, 0x000000, 0, 0, 0);
    
    var offset = 142,
        camera = new THREE.OrthographicCamera(width / - offset, width / offset, height / offset, height / - offset, .1, 1000 );
    camera.position.z = 5;
    camera.position.x = -10;
    camera.position.y = -90*Math.PI/180;

    scene.add(cube, cylinder, camera);

    renderer.clear();
    renderer.setClearColor(0xffefe0);
    renderer.render(scene, camera); 
    //render(scene, camera);

}

function front() {
    scene = new THREE.Scene();
 
    var house = new THREE.CubeGeometry(2, 2.3, 2);
    var material = new THREE.MeshBasicMaterial( {color: 0x45ffee} );
    var cube = new THREE.Mesh(house, material);

    //scene.add(cube);
    createObject(house, 0x000000, 0, 0, 0);

    var wGeometry = new THREE.CylinderGeometry(1.25, 1.5, 1.5, 4);
    material = new THREE.MeshBasicMaterial( {color: 0x5a0a4e} );
    var cylinder = new THREE.Mesh(wGeometry, material);
    cylinder.position.y = 2;
    //scene.add(cylinder);

    createObject(house, 0x000000, 0, 0, 0, scene);
    
    var offset = 142,
        camera = new THREE.OrthographicCamera(width / - offset, width / offset, height / offset, height / - offset, .1, 1000 );

    camera.position.z = 5;

    //scene.add(camera);
    scene.add(cube, cylinder, camera);

    renderer.clear();
    renderer.setClearColor(0xffefe0);
    renderer.render(scene, camera);
    //render(scene, camera);

}

function top_() {
    var house = new THREE.CubeGeometry(2, 2.5, 2);
    var material = new THREE.MeshBasicMaterial( {color: 0x45ffee} );
    var cube = new THREE.Mesh(house, material);

    createObject(house, 0x000000, 0, 0, 0);


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