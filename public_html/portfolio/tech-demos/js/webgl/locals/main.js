// let mat = (size) => {
//   return new Float32Array(size);
// }
// let matID = (size) => {
//   let mat = new Float32Array(size);
//
//   for(var i = 0; i < size; i++){
//     if(Math.floor(i % 4) == Math.floor(i / 4) )
//       mat[i] = 1;
//     else
//       mat[i] = 0;
//   }
//   return mat;
// }


class Object {
  constructor(file, pos, rot){
    this.positions = [];
    this.normals = [];
    this.faces = [];

    this.Init();
  }

  init() {
    this.verts = [];
    loadObj(file)
  }

  loadObj(file){
    const points = [[0,0,0]];
    const texcrds = [[0,0]];
    const normals = [[0,0,0]];

    const objVertData = [
      points,
      texcrds,
      normals,
    ]

    const glVertData = [[],[],[]];

    function addVert(vert){
      const pts = vert.split('/');
    }

    const keywords = {
      v(data) {
        points.push(data.map(parseFloat));
      },
      vn(data) {
        normals.push(data.map(parseFloat));
      },
      vt(data) {
        texcrds.push(data.map(parseFloat))
      },
      f(data) {
        const triCount = data.length - 2;
        for(let tri = 0; tri < triCount; ++tri){
          addVert(data[0]);
          addVert(data[tri + 1]);
          addVert(data[tri + 2]);
        }
      }
    };

    const keywordRE = /(\w*)(?: )*(.*)/;
    const lines = text.split('\n');

    for (let lineNo = 0; lineNo < lines.length; ++lineNo) {
      const line = lines[lineNo].trim();
      if (line === '' || line.startsWith('#')) {
        continue;
      }
      const m = keywordRE.exec(line);
      if (!m) {
        continue;
      }
      const [, keyword, unparsedArgs] = m;
      const parts = line.split(/\s+/).slice(1);
      const handler = keywords[keyword];
      if (!handler) {
        console.warn('unhandled keyword:', keyword, 'at line', lineNo + 1);
        continue;
      }
      handler(parts, unparsedArgs);
    }

    return {
      position: glVertData[0],
      texcoord: glVertData[1],
      normal: glVertData[2]
    };
  }
}

class Renderer {

  constructor(){
    this.gl = null
    this.canvas = null;
    this.programs = {};
    this.shaders = {};
    this.objectPool = [];
  }

  static drawScene() {

  }

  static Init() {
    this.canvas = document.getElementById('wgl_demo_canvas');
    this.canvas.width = $(window).innerWidth();
    this.canvas.height = $(window).innerHeight();
    this.gl = this.canvas.getContext('webgl');
    // this.worker = worker;


    this.programs = this.getPrograms();

    let gl = this.gl;
    let p = this.programs['basic'];

    let triVerts = [
      0.0, 0.5, 0.0,    1.0, 0.0, 0.0,
      -0.5, -0.5, 0.0,  0.0, 1.0, 0.0,
      0.5, -0.5, 0.0,   0.0, 0.0, 1.0
    ];

    let triVertBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triVertBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triVerts), gl.STATIC_DRAW);


    let positionAttribLocation = gl.getAttribLocation(p, 'vertPosition');
    let colorAttribLocation = gl.getAttribLocation(p, 'vertColor');
    // let prevAttribLocation = gl.getAttribLocation(p, 'prev');
    // let nextAttribLocation = gl.getAttribLocation(p, 'next');


    gl.vertexAttribPointer(
      positionAttribLocation,
      3,
      gl.FLOAT,
      gl.FALSE,
      6 * Float32Array.BYTES_PER_ELEMENT,
      0
    )
    gl.vertexAttribPointer(
      colorAttribLocation,
      3,
      gl.FLOAT,
      gl.FALSE,
      6 * Float32Array.BYTES_PER_ELEMENT,
      3 * Float32Array.BYTES_PER_ELEMENT
    )

    gl.useProgram(p);


    let mWorldUniformLocation = gl.getUniformLocation(p, 'mWorld');
    let mViewUniformLocation = gl.getUniformLocation(p, 'mView');
    let mProjUniformLocation = gl.getUniformLocation(p, 'mProj');

    let mWorld = new Float32Array();
    let mView = new Float32Array();
    let mProj = new Float32Array();

    mWorld = Mat4.identity(mWorld);
    // mView.identity();
    // mProj.identity();
    mView = Mat4.lookAt(mView,
      new V3(0,0,-5),
      new V3(2,0,0),
      new V3(0,1,0));
    // mView.lookAt(
    //   /*camera position*/new V3(0, 0, -25),
    //   /*to location*/ new V3(0, 0, 0),
    //   /*up direction*/ new V3(0, 1, 0));
    mProj = Mat4.per(mProj, deg2Rad(45), this.canvas.width/this.canvas.height, 0.1, 1000.0);
    // console.log(mProj.data);
    // mProj.orthoper(1000.0, 0.1, 0, this.canvas.width, 0, this.canvas.height);

    gl.uniformMatrix4fv(mWorldUniformLocation, gl.FALSE, mWorld);
    gl.uniformMatrix4fv(mViewUniformLocation, gl.FALSE, mView);
    gl.uniformMatrix4fv(mProjUniformLocation, gl.FALSE, mProj);


    // console.log(this.canvas.width/this.canvas.height);
    // mProj.mult(mView.mult(mWorld));
    // console.log(mView);
    // console.log(mProj);







    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);

    this.init = true;

  }


  static Update(dt){
    if(!this.init)
      return;

    this.gl.clearColor(0.5,0.5,0.5,0.6);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);


    this.gl.useProgram(this.programs['basic']);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);






    this.drawScene();
  }





  static getPrograms (){

    // getShaders();
    //////// specification of shaders by text -- will be external later
    let vertexShaderText = [
      'precision mediump float;',
      '',
      'attribute vec3 vertPosition;',
      'attribute vec3 vertColor;',
      'varying vec3 fragColor;',
      'uniform mat4 mWorld;',
      'uniform mat4 mView;',
      'uniform mat4 mProj;',
      '',
      'void main()',
      '{',
      'fragColor = vertColor;',
      'gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);',
      '}'
    ].join('\n');

    let fragmentShaderText = [
      'precision mediump float;',
      '',
      'varying vec3 fragColor;',
      'void main()',
      '{',
      'gl_FragColor = vec4(fragColor, 1.0);',
      '}'
    ].join('\n');
    ///////////////////////////////////////////////////////////////////

    let gl = this.gl;

    if(!gl){
      this.gl = this.canvas.getContext('experimental-webgl');
      gl = this.gl;
    }



    let vertexShader = gl.createShader(gl.VERTEX_SHADER);
    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);

    gl.compileShader(vertexShader);
    if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      console.error('err compiling vertex shader');
      console.log(gl.getShaderInfoLog(vertexShader));
      return;
    }


    gl.compileShader(fragmentShader);
    if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.error('err compiling fragment shader');
      return;
    }


    let programs = {};
    programs['basic'] = this.createProgram([vertexShader, fragmentShader]);

    return programs;
  }

  static createProgram(shaders){
    let gl = this.gl;
    let p = gl.createProgram();

    for(let s in shaders)
      gl.attachShader(p, shaders[s]);

    gl.linkProgram(p);

    if(!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      console.error('err linking program', gl.getProgramInfoLog(p));
      return;
    }

    // /* testing only
    gl.validateProgram(p);
    if(!gl.getProgramParameter(p, gl.VALIDATE_STATUS)) {
      console.error('err validating program', gl.getProgramInfoLog(p));
      return;
    }
    // */

    return p;
  }

  onresize(){

  }
}

Renderer.canvas = null;
Renderer.gl = null
Renderer.programs = {};
Renderer.shaders = {};
