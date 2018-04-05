


// vertex shader 
var vertexShaderText = ['precision mediump float;', 
                        '',
                        'attribute vec2 vertPosition;',
                        '',
                        'void main() {',
                        '   gl_Position = vec4(vertPosition, 0.0, 1.0);',
                        '}'].join('\n');

// fragment shader 
var fragmentShaderText = ['precision mediump float;',
                          '',
                          'void main() {',
                          '     gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0)',
                          '}' ].join('\n');



// get as much into the draw call tosave resurces
var main = function() {
    // console.log("It's working!");
    var canvas = document.getElementById("canvas");
    if(!canvas) {
        alert("Failed to retrieve <canvas> object!");
        return;
    }
    var gl = canvas.getContext('webgl');
    if(!gl) {
        alert("webgl not supported! Using experimental-webgl");
        gl = canvas.getContext("experimental-webgl");
    }

    //set color for clearing operations
    gl.clearColor(.75, .85, .8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    // create shaders
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    // set the shader source 
    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);

    // compile shaders
    gl.compileShader(vertexShader);
    if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error('ERROR: Compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
        return;
    }

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    
    //link the program together 
    gl.linkProgram(program);
    if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Error linking program!', gl.getProgramInfoLog(program));
        return;
    }

    gl.validateProgram(program);
    if(!gl.setProgramparameter(program, gl.VALIDATE_STATUS)) {
        console.error('Error validating program!', gl.getProgramInfoLog(program));
        return;
    }

    // create buffer 
    var triangleVertices = [0.0, 0.5, 
                            -0.5, -0.5, 
                            0.5, -0.5];
    
    // send infor to graphics card
    var triangleVertexBufferObject = gl.createBuffer();
    gl.bindbuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

    var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
    //specify the lay out of the attribute
    gl.vertexAttribPointer(
        positionAttribLocation, //location
        2,                      // # of elements per attribute
        gl.FLOAT,               // Type of elements
        gl.FALSE,
        2*Float32Array.BYTES_PER_ELEMENT, // size of individual vertex
        0                       // offset from beginning
    );
    gl.enableVertexAttribArray(positionAttribLocation);

    // Main render loop
    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);


};



// fragment shader
