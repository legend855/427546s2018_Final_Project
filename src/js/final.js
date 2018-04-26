/*
*   Author: Patrick Kyoyetera
*   Description: Final Project Phase 4
*   Date: Wed, April 18, 2018
*
*/

function init() {
        
    var renderer, controls, gameLoop,
        width = window.innerWidth,
        height = window.innerHeight;
    
    function objectFrame(object, color, posx, posy, posz) {
        var geo = new THREE.EdgesGeometry( object );
        var mat = new THREE.LineBasicMaterial( { color: color } );
        var obj = new THREE.LineSegments( geo, mat );
        obj.position.y=posy;
        obj.position.x=posx;
        obj.position.z=posz;
        //scene.add( obj );
        return obj;  
    }        

    // Renderer
    var renderer = new THREE.WebGLRenderer( {antialias: true});
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);


    /***************************************************
    *                  HOUSE OBJECT                    *
    ****************************************************/
    // scene
    scene = new THREE.Scene();

    // camera 
    var view_angle = 45, aspect_ratio = width/height;
    var camera = new THREE.PerspectiveCamera(view_angle, aspect_ratio, 0.1, 10000);
    camera.position.set(0, 150, 300);
    camera.lookAt(scene.position);

    // Keyboard controls 
    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    // lighting
    var lighting = new THREE.PointLight(0xfffffe, 1, 20);
    lighting.position.set(0, 250, 0);
    scene.add(camera, lighting);

    // house object
    var cubeMaterial = new THREE.MeshBasicMaterial( {color: 0x45ffee} ),
        cylMaterial = new THREE.MeshBasicMaterial( {color: 0x5a0a40} ),
        cylGeometry = new THREE.CylinderGeometry(25, 85, 33, 6),
        cubeGeo = new THREE.BoxGeometry(84, 85, 82);

    var house = new THREE.Mesh(cubeGeo, cubeMaterial),
        house_frame = objectFrame(cubeGeo, 0x000000, 0, 0, 0);

    var roof = new THREE.Mesh(cylGeometry, cylMaterial);
    roof.position.y = 50;
    var roof_frame = objectFrame(cylGeometry, 0x000000, roof.position.x, roof.position.y, roof.position.z);

    //scene.add(house, roof);

    // group all house objects for easy control 
    var objGroup = new THREE.Group();
    objGroup.add(roof);
    objGroup.add(house);
    objGroup.add(house_frame);
    objGroup.add( roof_frame);
    scene.add(objGroup);

    // keep object within window when window is resized
    window.addEventListener('resize', function() {
        var width = window.innerWidth,
            height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width/height;
        camera.updateProjectionMatrix();
    });

    /*****************************************************
    *            MENU TO SUPPORT PARAMETER CHANGING      *
    ******************************************************/
    var menu = new dat.GUI();

    var params = { x: 0, y: 0, z: 0, 
                   x_axis:0, y_axis:0, z_axis: 0,
                   v:1, h:1,
                   xShear: 0, yShear: 0, zShear: 0,
                   scaleval: 0,
                   color: "ff004b",
                   visible: true,
                   material: "Phong",
                   isometric: false, dimetric: false, trimetric: false,
                   reset: function() {
                     resetObject();
                    }
                 };

    // add individual params to respective translation folders
    // position folder
    var position_folder = menu.addFolder('Position');
    var posx = position_folder.add(params, 'x').min(-100).max(100).step(1).listen(),
        posy = position_folder.add(params, 'y').min(-100).max(100).step(1).listen(),
        posz = position_folder.add(params, 'z').min(-100).max(100).step(1).listen();
    //position_folder.open();

    // rotation folder 
    var rotation_folder = menu.addFolder('Rotation');
    var rotx = rotation_folder.add(params, 'x_axis').min(0).max(Math.PI*2).step(0.1).listen(),
        roty = rotation_folder.add(params, 'y_axis').min(0).max(Math.PI*2).step(0.1).listen(),
        rotz = rotation_folder.add(params, 'z_axis').min(0).max(Math.PI*2).step(0.1).listen();
    //rotation_folder.open();
    
    // shear folder
    var shear_folder = menu.addFolder('Shear');
    var shearX = shear_folder.add(params, 'xShear').min(0).max(0.5).step(0.05).listen(),
        shearY = shear_folder.add(params, 'yShear').min(0).max(0.5).step(0.05).listen(),
        shearZ = shear_folder.add(params, 'zShear').min(0).max(0.5).step(0.05).listen();
    shear_folder.open();

    // projection folder 
    var projections_folder = menu.addFolder('Projections');
    var isometric = projections_folder.add(params, 'isometric').listen(),
        dimetric = projections_folder.add(params, 'dimetric').listen(),
        trimetric = projections_folder.add(params, 'trimetric').listen();
    projections_folder.close();

    // shear functionality 
    function shear(val, group, shearType) {
        var xShearMatrix = new THREE.Matrix4(),
            yShearMatrix = new THREE.Matrix4(),
            zShearMatrix = new THREE.Matrix4();

        xShearMatrix.set(1, 0, 0, 0,
                         val, 1, 0, 0,
                         0, 0, 1, 0, 
                         0, 0, 0, 0 );
        yShearMatrix.set(1, val, 0, 0,
                         0, 1, 0, 0,
                         0, 0, 1, 0);
        //zShearMatrix.set()

        switch(shearType) {
            case 'x':
                group.applyMatrix(xShearMatrix);
                break;
            case 'y':
                group.applyMatrix(yShearMatrix);
                break;
            case 'z':
                alert("Yet to be implemented");
                break;
            default:
                alert("Go Home, you're drunk!");
        };
    }
    var count = 1;

    // projections

    
    // scale option
    var scalearg = menu.add(params, 'scaleval').min(0).max(10).step(0.5).listen();

    // translations will be done here    
    var update = function() {
        // Change position
        posx.onChange(function (value) {
            objGroup.position.x = value;
        });
        posy.onChange(function (value) {
            objGroup.position.y = value;
        });
        posz.onChange(function (value) {
           objGroup.position.z = value;
        });

        // Rotate object
        rotx.onChange(function (value) {
            objGroup.rotation.x = value;
        });
        roty.onChange(function (value) {
            objGroup.rotation.y = value;
        });
        rotz.onChange(function (value) {
            objGroup.rotation.z = value;        
        });

        // shear object
        shearX.onChange( function (value) {
            shear(value, objGroup, 'x');
        });
        shearY.onChange( function (value) {
            shear(value, objGroup, 'y');
        });

        // scale object
        scalearg.onChange(function (value) {
            objGroup.scale.set(value, value, value);
        });

        // projections 
        isometric.onChange(function () {
            if(true) {
                var matrix = new THREE.Matrix4();
                matrix.set(1, 0, -1, 0, 
                           0, 1, -1, 0, 
                           0, 0, 1, 0, 
                           0, 0, 0, 1);
    
                objGroup.applyMatrix(matrix);
                //camera.position.set(220, 220, 220);
                //camera.lookAt(scene.position);
            }
        });

        dimetric.onChange(function () {
            if(true) {
                var matrix = new THREE.Matrix4();
                matrix.set(1, 0, -1, 0, 
                           0, 1, 0, 0, 
                           0, 0, 1, 0, 
                           0, 0, 0, 1);
    
                objGroup.applyMatrix(matrix);
            }
        });
        
        trimetric.onChange(function () {
            if(true) {
                var matrix = new THREE.Matrix4();
                matrix.set(1, 0, -1, 0, 
                           0, 01, 0, 0, 
                           0, 0, 1, 0, 
                           0, 0, -01, 1);
    
                objGroup.applyMatrix(matrix);
            }
        });

        


    }





    function render() {
        renderer.clear();
        renderer.setClearColor(0xffefe0);
        renderer.render(scene, camera);
    }

    var gameLoop = function() {
        requestAnimationFrame(gameLoop);
    
        // update & render scene
        update();
        render();
    };

    gameLoop();
}

