/*
*   Author: Patrick Kyoyetera
*   Description: Final Project Phase 4
*   Date: Wed, May 2, 2018
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
    //camera.lookAt(scene.position);

    // Keyboard controls 
    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    // lighting
    var light2 = new THREE.SpotLight(0xff0000);
    light2.position.set(75, 120, 80);
    light2.intensity = 7.5;

    var light1 = new THREE.DirectionalLight(0xfffffe, .51)//, 50);
    light1.position.set(75, 120, 80);
    light1.intensity = 2.5;
    light1.castShadow = true;
    
    
    /*
    light.shadow.mapSize.width = 512;  
    light.shadow.mapSize.height = 512; 
    light.shadow.camera.near = 0.5;    
    light.shadow.camera.far = 500 

    */
    // bulb object
    var bulb = new THREE.SphereGeometry(5, 25, 25);
    var bulbFrame = objectFrame(bulb, 0x4F1133, 75, 120, 80);

    scene.add(camera, light1, bulbFrame);

    // house object
    var cubeMaterial = new THREE.MeshPhongMaterial( {color: 0x45ffee} ),
        cylMaterial = new THREE.MeshPhongMaterial( {color: 0x5a0a40} ),
        cylGeometry = new THREE.CylinderGeometry(25, 85, 33, 6),
        cubeGeo = new THREE.BoxGeometry(84, 85, 82);
        

    var house = new THREE.Mesh(cubeGeo, cubeMaterial),
        house_frame = objectFrame(cubeGeo, 0x000000, 0, 0, 0);

    var roof = new THREE.Mesh(cylGeometry, cylMaterial);
    roof.castShadow = true;
    house,castShadow = true;

    roof.position.y = 50;
    var roof_frame = objectFrame(cylGeometry, 0x000000, roof.position.x, roof.position.y, roof.position.z);

    //scene.add(house, roof);

    var planeGeometry = new THREE.PlaneBufferGeometry( 220, 220, 32, 32 );
    var planeMaterial = new THREE.MeshPhysicalMaterial( { color: 0xFFFEFF } )
    var floor = new THREE.Mesh( planeGeometry, planeMaterial );
    floor.rotation.set(-Math.PI, 0, 0);
    floor.receiveShadow = true;
    //scene.add( plane );

    // group all house objects for easy control 
    var objGroup = new THREE.Group();
    objGroup.add(roof);
    objGroup.add(house);
    objGroup.add(house_frame);
    objGroup.add( roof_frame);
    //objGroup.add(floor);

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
                   translate: 0,                                   
                   xShear: 0, yShear: 0, zShear: 0,
                   scaleval: 0,
                   color: "ff004b",
                   One_Point:false, Two_Point: false, Three_Point: false,
                    Directional: false, Spot: false,
                   isometric: false, dimetric: false, trimetric: false, vanishing: false,
                   reset: function() {
                     reset();
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
    shear_folder.close();

    // projection folder 
    var projections_folder = menu.addFolder('Projections');
    var isometric = projections_folder.add(params, 'isometric').listen(),
        dimetric = projections_folder.add(params, 'dimetric').listen(),
        trimetric = projections_folder.add(params, 'trimetric').listen();
        vanishing = projections_folder.add(params, 'vanishing').listen();
        oneP = projections_folder.add(params, 'One_Point').listen();
        twoP = projections_folder.add(params, 'Two_Point').listen();
        threeP = projections_folder.add(params, 'Three_Point').listen();
    projections_folder.open();

    var lightFolder = menu.addFolder('Lights: Directional and Spot');
    var dir_light = lightFolder.add(params, 'Directional').listen(),
        spot_light = lightFolder.add(params, 'Spot').listen();
    lightFolder.open();

    // shear functionality 
    function shear(val, group, shearType) {
        var xShearMatrix = new THREE.Matrix4(),
            yShearMatrix = new THREE.Matrix4(),
            zShearMatrix = new THREE.Matrix4();

        xShearMatrix.set(1, val, val, 0,
                         0, 1, 0, 0,
                         0, 0, 1, 0, 
                         0, 0, 0, 0 );

        yShearMatrix.set(1, 0, 0, 0,
                         val, 1, val, 0,
                         0, 0, 1, 0,
                         0, 0, 0, 0);

        zShearMatrix.set(1, 0, 0, 0,
                         0, 1, 0, 0,
                         val, val, 1, 0,
                         0, 0, 0, 0);

        switch(shearType) {
            case 'x':
                group.applyMatrix(xShearMatrix);
                break;
            case 'y':
                group.applyMatrix(yShearMatrix);
                break;
            case 'z':
                group.applyMatrix(zShearMatrix);
            //alert("Yet to be implemented");
                break;
            default:
                alert("Go Home, you're drunk!");
        };
    }
    var count = 1;

    
    // scale option
    var scalearg = menu.add(params, 'scaleval').min(0).max(10).step(0.5).listen();

    //translate
    var trans = menu.add(params, 'translate').min(0).max(10).step(1).listen();

    //var reset = menu.add(params, 'Reset').
    
    menu.add(params, 'reset');

    function reset() {
        clearScene();
        scene.add(camera, light1, bulbFrame);
        scene.add(objGroup);        
    }

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
        shearZ.onChange( function (value) {
            shear(value, objGroup, 'z');
        });

        // scale object
        scalearg.onChange(function (value) {
            objGroup.scale.set(value, value, value);
        });
        
        // translate
        trans.onChange(function(value) {
            var mat = new THREE.Matrix4();
            mat.set(1, 0, 0, value, 
                    0, 1, 0, value, 
                    0, 0, 1, value,
                    0, 0, 0, 1);

            objGroup.applyMatrix(mat);
        });

        // projections 
        isometric.onChange(function () {
            if(true) {
                var matrix = new THREE.Matrix4();
                /*matrix.set(Math.cos(Math.PI/6), -Math.cos(Math.PI/6),  0, 0, 
                           Math.sin(Math.PI/6),  Math.sin(Math.PI/6),  1, 0, 
                                             0,                    0,  0, 0, 
                                             0,                    0,  0, 1);
                */
                matrix.set(1, 0, -1, 0,
                           0, 1, -1, 0,
                           0, 0,  1, 0,
                           0, 0,  0, 1);
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
                           0, 0, -1, 0, 
                           0, 0, 0, 1);
    
                objGroup.applyMatrix(matrix);
                
               //matrix.makePerspective(1, 1, 1, 1, 0.1, 1000);
               //objGroup.applyMatrix(matrix);
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

        vanishing.onChange(function() {
            //var camera = new THREE.PerspectiveCamera(120, width/height, 0.1, 1000);
            camera.position.x = -50;
            camera.position.y = 100;
            camera.position.z = -100;
            camera.rotation.y = -45 * Math.PI / 180 ;
        });

        oneP.onChange(function() {
            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = 400;
        });

        twoP.onChange(function() {
            camera.position.x = -400;
            camera.position.y = 0;
            camera.position.z = 400;
        });

        threeP.onChange(function() {
            camera.position.x = -400;
            camera.position.y = 200;
            camera.position.z = 400;
            //camera.rotation.y = -45 * Math.PI / 180 ;

        });

        dir_light.onChange(function() {
            scene.remove(light2);
            scene.add(light1);
        });
        spot_light.onChange(function() {
            scene.remove(light1);
            scene.add(light2);
        });

//        reset.onChange(function() {

  //      });

    }

    function clearScene() {
        while(scene.children.length)
            scene.remove(scene.children[0]);
    }

    function render() {
        renderer.clear();
        renderer.setClearColor(0xffffeb);
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

