const sizeof = function (o){
  let q = [o]; // object tree queue
  let cat = []; // catalogue
  let size = 0;
  while (q.length){
    let v = q.pop();

    size += (typeof v === 'number') ? 8 : (typeof v === 'string') ? v.length * 2 :
            (typeof v === 'boolean') ? 4 :
            (typeof v === 'object' && !cat.contains(v)) ? () =>
            {
              cat.push(v);
              for(let i in v) (v) => q.push(v[i]);
            } : 0;
  }

  return size;
}

export {sizeof}
