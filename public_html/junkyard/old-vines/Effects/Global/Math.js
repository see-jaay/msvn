	
function randomFlt(min, max)
{
	return Math.random()*(max-min+1)+min;
}

function randomInt(min, max)
{
	return Math.floor(Math.random()*(max-min+1)+min);
}

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