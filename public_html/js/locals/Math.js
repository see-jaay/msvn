function InterpolatePoints(s, c1,c2,e,i, vine)
{
	for (var t = 0.0; t <= 1.0; t += vine.strokeWidth * .025) {
    	// var point = {BezierInterpolation(t, s.x, c1.x, c2.x, e.x), BezierInterpolation(t, s.y, c1.y, c2.y, e.y), 0);
		vine.IPs.push({x:BezierInterpolation(t, s.x, c1.x, c2.x, e.x), y:BezierInterpolation(t, s.y, c1.y, c2.y, e.y), z:0});
	}

	// console.log(this.interpoints.length);
}

function BezierInterpolation(t,a,b,c,d) {
    var t2 = t * t, t3 = t2 * t;

    return a + (-a * 3 + t * (3 * a - a * t)) * t
    + (3 * b + t * (-6 * b + b * 3 * t)) * t
    + (c * 3 - c * 3 * t) * t2
    + d * t3;
}


function VineAngle(p1, p2, radians = 0) {
     return Math.atan2(p2.y- p1.y, p2.x - p1.x) * 180 / Math.PI;
}


Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};



function WeightedRandom(min, max, weight)
{
  if(weight == 1)
  {
    return Math.floor(Math.abs(Math.random() - Math.random()) * (1 + max - min) + min);
  }
  else if(weight == .5)
  {
    return Math.round(Math.abs(Math.random() - Math.random()) * (1 + max - min) + min);
  }
  else {
    return Math.ceil(Math.abs(Math.random() - Math.random()) * (1 + max - min) + min);
  }
}

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function ParseCSS(css)
{
  if(css != undefined)
    return css.replace(/\s/g, '');
}

function lerp (start, end, amt, tol = 1000000000000000000){
	if(Math.abs(start - end) <= tol)
		return end;

  return (1-amt)*start+amt*end;
}





function swap(a, b){
	 var t = a;
	 a = b;
	 b = t;
}

function part(arr, min, max){
	var pivot = arr[max];
	var i = (min - 1);

	for(var j = min; j <= max - 1; j++)
		if(arr[j] < pivot)
		{
			i++;
			swap(arr[i], arr[j]);
		}

	swap(arr[i + 1], arr[max]);
	return(i + 1);
}

function qsort(arr, min, max){
	if(min < max)
	{
		var pi = part(arr, min, max);

		qsort(arr, min, pi - 1);
		qsort(arr, pi + 1, max);
	}
}


/* Map xy coords to index */

// get x ---- index % gridWidth
// get y ---- index / gridWidth


/* Map index to xy coords */

// get index ---- x + gridWidth*y
