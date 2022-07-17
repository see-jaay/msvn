class V3 {
  constructor(x = 0, y = 0, z = 0){
    this.x = x;
    this.y = y;
    this.z = z;
    this.mag = 0;
    // this.null = {x:0, y:0, z:0};
    // this.uv = {x:0, y:0, z:0};
  }


  plus(v){
    let vsum = new V3(this.x + v.x, this.y + v.y, this.z + v.z);
    return vsum;
  }
  minus(v){
    let vdiff = new V3(this.x - v.x,this.y - v.y,this.z - v.z);
    return vdiff;
  }
  mult(v){
    let vprod = new V3(this.x * v.x,this.y * v.y,this.z * v.z);
    return vprod;
  }
  div(v){
    let vq = new V3(this.x / v.x, this.y / v.y, this.z / v.z);

    return vq;
  }

  mgn(){
    let m = Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
    return m;
  }
  norm(){
    let m = this.mgn();
    let n = new V3(this.x/m, this.y/m, this.z/m);
    return n;
  }
  cross(v){
    let cross = new V3((this.y*v.z) - (this.z*v.y), (this.z*v.x) - (this.x*v.z), (this.x*v.y) - (this.y*v.x));
    return cross;
  }
  dot(v){
    return (this.x * v.x) + (this.y * v.y) + (this.z * v.z);
  }
  negate(){
    this.x *= -1;
    this.y *= -1;
    this.z *= -1;

    return new V3(-this.x, - this.y, -this.z);
  }
}
class Mat4 {
  constructor(){
    // this.data = new Float32Array();
    // this.empty = new Float32Array();
    // // this.identity = new Float32Array(size);
  }
  static identity(m){
    let v = new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
    return v;
  }
  static lookAt(m, pos, to, up){
    let z = to.minus(pos).norm();
    let x = up.cross(z).norm();
    let y = z.cross(x).norm();
    // console.log(pos);
    // z.negate();

    let d = [
      x.x, x.y, x.z, 0,
      y.x, y.y, y.z, 0,
      z.x, z.y, z.z, 0,
      pos.x,   pos.y,   pos.z,    1
    ];

    return d;
  }





  //generation of perspective matrix is being annoying


  static orthoper(m, f, n, l, r, t, b){
    let d = m;

    d[0] = 2/(r-l);
    d[1] = 0;
    d[2] = 0;
    d[3] = -((r+l)/(r-l));
    d[4] = 0;
    d[5] = 2/(t-b);
    d[6] = 0;
    d[7] = -((t+b)/(t-b));
    d[8] = 0;
    d[9] = 0;
    d[10] = -(2/(f-n));
    d[11] = -((f+n)/(f-n));
    d[12] = 0;
    d[13] = 0;
    d[14] = 0;
    d[15] = 1;

    return m;
  }

  static per(m, fov, a, near, far){
    let f = Math.tan(Math.PI * 0.5 - 0.5 * fov);
    let r = 1/(near-far);
    // console.log(fov);
    let d = new Float32Array([
      f/a, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (near + far) * r, -1,
        0, 0, near * far * r * 2, 0
    ]);
    // d[0] = f/a;
    // d[1] =  0;
    // d[2] =  0;
    // d[3] =  0;
    // d[4] =  0;
    // d[5] =  f;
    // d[6] =  0;
    // d[7] =  0;
    // d[8] =  0;
    // d[9] =  0;
    // d[10] = (near+far) * r;
    // d[11] = -1;
    // d[12] =  0;
    // d[13] =  0;
    // d[14] = near * far * r * 2;
    // d[15] =  0;

    return d;
  }

  static perspective(fov, ar, near, far) {
    const f = 1.0 / Math.tan(fov / 2);
    // console.log(fov);
    let d = this.data;
    d[0] = 1 / (ar * Math.tan(fov / 2));
    d[1] =  0;
    d[2] =  0;
    d[3] =  0;
    d[4] =  0;
    d[5] =  f;
    d[6] =  0;
    d[7] =  0;
    d[8] =  0;
    d[9] =  0;
    d[10] = -((far+near)/(far-near));
    d[11] = -(2 * (far*near) / (far-near));
    d[12] =  0;
    d[13] =  0;
    d[14] = -1;
    d[15] =  0;

    // if(far != null && far !== Infinity){
    //   const nf = 1 / (near - far);
    //   // d[10] = (far + near) * nf;
    //   d[10] = (far + near) * nf;
    //   d[14] = 2 * far * near * nf;
    //   // console.log('asdf');
    // }else{
    //   d[10] = -1;
    //   d[14] = -2 * near;
    // }
    // this.data[1] = 5;
    // console.log(fov);
  }

  static translate(tx, ty, tz){
    return [

    ]
  }

  static mult(a, b){

    let a00 = a[0 * 4 + 0];
    let a01 = a[0 * 4 + 1];
    let a02 = a[0 * 4 + 2];
    let a03 = a[0 * 4 + 3];
    let a10 = a[1 * 4 + 0];
    let a11 = a[1 * 4 + 1];
    let a12 = a[1 * 4 + 2];
    let a13 = a[1 * 4 + 3];
    let a20 = a[2 * 4 + 0];
    let a21 = a[2 * 4 + 1];
    let a22 = a[2 * 4 + 2];
    let a23 = a[2 * 4 + 3];
    let a30 = a[3 * 4 + 0];
    let a31 = a[3 * 4 + 1];
    let a32 = a[3 * 4 + 2];
    let a33 = a[3 * 4 + 3];
    let b00 = b[0 * 4 + 0];
    let b01 = b[0 * 4 + 1];
    let b02 = b[0 * 4 + 2];
    let b03 = b[0 * 4 + 3];
    let b10 = b[1 * 4 + 0];
    let b11 = b[1 * 4 + 1];
    let b12 = b[1 * 4 + 2];
    let b13 = b[1 * 4 + 3];
    let b20 = b[2 * 4 + 0];
    let b21 = b[2 * 4 + 1];
    let b22 = b[2 * 4 + 2];
    let b23 = b[2 * 4 + 3];
    let b30 = b[3 * 4 + 0];
    let b31 = b[3 * 4 + 1];
    let b32 = b[3 * 4 + 2];
    let b33 = b[3 * 4 + 3];

    return [
      b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
      b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
      b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
      b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
      b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
      b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
      b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
      b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
      b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
      b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
      b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
      b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
      b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
      b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
      b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
      b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
    ]

  }

  // static per(out, fovy, aspect, near, far) {
  //   const f = 1.0 / Math.tan(fovy / 2);
  //   out[0] = f / aspect;
  //   out[1] = 0;
  //   out[2] = 0;
  //   out[3] = 0;
  //   out[4] = 0;
  //   out[5] = f;
  //   out[6] = 0;
  //   out[7] = 0;
  //   out[8] = 0;
  //   out[9] = 0;
  //   out[11] = -1;
  //   out[12] = 0;
  //   out[13] = 0;
  //   out[15] = 0;
  //   if (far != null && far !== Infinity) {
  //     const nf = 1 / (near - far);
  //     out[10] = (far + near) * nf;
  //     out[14] = 2 * far * near * nf;
  //   } else {
  //     out[10] = -1;
  //     out[14] = -2 * near;
  //   }
  //   return out;
  // }
}
