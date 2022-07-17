



class VineLocal {

	constructor(index, x, y, z, weight, angle) {
		this.index = index;

		this.x = x;
		this.y = y;
		this.angle = angle;

		this.canvas = null;
		this.ctx = null;
		this.cvLim = [];

		this.depth = z;
		this.strokeWidth;
		this.weight = weight;
		this.opacity;
		this.blur = blur;
		this.color;
		this.as = 1;
	}

	Init(){
		var c = '<canvas id="VC--'+ this.index +'" class="vine-canvas"></canvas>';
		var va = $('#vineArt');
		va.append(c);

		this.canvas = document.getElementById('VC--'+ this.index);
		// this.canvas.width = $(window).width() * 4;
		this.ctx = setupCanvas( this.canvas );



		$(this.canvas).css({
		// 	'margin-left': this.x + 'vw',
		// 	'margin-top': this.y + 'vh',
			'z-index':this.depth
		});

		this.Set();

		CreateVineWorker2([this.strokeWidth, this.weight, {x:(this.angle > 0) ? 0 : this.canvas.width, y:0, z:this.depth}, this.angle, this.deviation]);
	}

	UpdateCSS(){
		this.ctx.strokeStyle = this.ctx.fillStyle = $(':root').css('--text-color');
	}

	Set()
	{
		// console.log(this.ctx.strokeStyle);

		if(this.x && this.y)
		{
			// $(this.canvas).css({
			// 	'margin-left': this.x +'vw',
			// 	'margin-top': this.y +'vh'
			// });
		}

		if(this.depth)
		{
			var range = 4;
			// this.ctx.lineWidth = (1.25*this.depth+4).clamp(1, 10000);
			// this.strokeWidth =  (1.25*this.depth+4).clamp(1, 10000);

			// this.ctx.lineWidth = 7.5;
			// this.strokeWidth =  7.5;
			// this.ctx.lineWidth = this.strokeWidth = 3 + this.depth;
			this.ctx.lineWidth = this.strokeWidth = 6;


			// this.blur = (1.25*this.depth+.5).clamp(1, 4);

			var mxblr = 2;
			var mxscl = 7.5;
			var decay = 90;
			var blrdk = 7;

			this.blur = (-1/( ( (2 + this.depth/blrdk) /mxblr) + (1/mxblr) ))+mxblr;
			// this.blur = 1;

			this.deviation = this.depth;


			$(this.canvas).css({
				'opacity':this.depth / 10,
				// 'transform': 'scale(1.5) scale('+ ( (-1/( (this.depth/(mxscl * decay)) + (1/mxblr) ))+mxscl )*.5   +')'
				'transform': 'translateX(-50%) translateY(-50%) scale('+ (.9+ this.depth/2)+') translateX('+this.x+'%) translateY('+this.y+'%)',
				// 'transform': 'translateX(-50%) translateY(-50%) scale('+ 1+') translateX('+this.x+'%) translateY('+this.y+'%)',

				//'filter':'blur('+(3*depth+2).clamp(1, 10000)+'px)'
			});

			// this.ctx.filter = 'blur('+(3*depth+2).clamp(1, 10000)+'px)';
			this.canvas.style.filter = 'blur('+this.blur+'px)';
		}
	}

	Draw(splines, thorns){

		var canvas = this.canvas;
		var ctx = this.ctx;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		// ctx.scale(1.3,1.3);

				ctx.beginPath();
		for(var i = 0; i < splines.length; i++)
		{
			var sp = splines[i];

				ctx.moveTo(sp[0], sp[1]);
				ctx.bezierCurveTo(sp[2], sp[3], sp[4], sp[5], sp[6], sp[7]);
		}
				ctx.stroke();

		ctx.setTransform(1, 0, 0, 1, 0, 0);



		for(var i = 0; i < thorns.length; i++)
		{
			// var transform = thorns[i].split('~');
			var pos = thorns[i][0];
			var x = pos[0];
			var y = pos[1];

			var scale = thorns[i][1];
			var sx = scale[0];
			var sy = scale[1];

			var rot = thorns[i][2];

				// ctx.scale(1.3,1.3);

  			var x1 = this.cvLim[0];
  			var x2 = this.cvLim[1];
  			var y1 = this.cvLim[2];
  			var y2 = this.cvLim[3];

			if(x > x1 && x < x2 && y > y1 && y < y2)
			{
				ctx.translate(x, y);
				ctx.translate((this.strokeWidth)* sx, 0);
				ctx.scale(sx*2, sy*2);
				ctx.rotate(rot * Math.PI / 180);

				ctx.beginPath();
				ctx.moveTo(0,0);
				//ctx.lineTo(8, 17);
				ctx.lineTo(19, 24);
				//ctx.lineTo(25, 25);
				ctx.lineTo(40, 20);
				ctx.lineTo(20, 47);
				ctx.lineTo(10, 68);
				ctx.lineTo(0, 100);
				ctx.fill();

			}
			ctx.setTransform(1, 0, 0, 1, 0, 0);
		}


		// if(randomFloat(0, 10000) > 9000)
		// {
		// 	var imgDat = ctx.getImageData(0, randomInt(0, canvas.height), canvas.width, randomInt(2, canvas.height/4));
		// 	ctx.putImageData(imgDat, 0, randomInt(0, canvas.height));
		// }
	}
}


var requestAnimationFrame = window.requestAnimationFrame;


var vineLocals = [];
var vineWorkerData = [];
var hPage;
var delVines = false;

var vinesLoaded = false;
// var pen = new Pendulum();
// var pen2 = new Pendulum();

// nodeCount, vineLength, vineMass, vineTension, vinePosition

// var v3 = new Vine(5, 250, 1, 200, new Vector3(500,0,0));
// var v4 = new Vine(4, 600, 4, 200, new Vector3(1500,0,0));
// var v5 = new Vine(9, 250, 1, 200, new Vector3(2000,0,0));


var _vineWorker;
var vineCount, positions = [];
var vReInit = true;

var canvas;
var ctx;
var vineColor, vc;

var updateCanvases = true;
var canvases = [];
var ctxs = [];

//  vineData = [ vine length, vine position ]

function VinesInit(index)
{
	console.log("vine-" + index + " Loaded");
	document.getElementById("vine-" + index).contentWindow.init(vines[index]);
	// console.log(document.getElementById("vine-"+index));


}

var windCounter = 0;
var offsetx = 0, offsety = 0;
var accx = 0, accy = 0;
var velx = 0, vely = 0;
var ipx = 0, ipy = 0;


function InitializeVines() {


	canvas = document.getElementById('VACanvas');
	ctx = setupCanvas(canvas);


	// ctx.scale(.2,.2);
	var vCount = 1;
	var va = $('#vineArt');

	for(var i = 0; i < vCount; i++)
	{
		if(va.css('--v'+i))
		{
			var css = va.css('--v'+i).replace(/\s/g, '').split(',');
			var vine = new VineLocal(i, css[0], css[1], parseFloat(css[2]), 1.3 + parseFloat(css[3]), parseFloat(css[4]));

			vine.Init()
			vineLocals.push(vine);
			vCount++;
		}
	}

	if(typeof(_vineWorker) == "undefined")
	{
		_vineWorker = new Worker("./js/Effects/Vine_Art/Lite/Main-worker.js");

		_vineWorker.addEventListener('message', function(e){
			var m = e.data;
			var s = m.state;
			if(s=="draw2"){
				DrawVines2(m.index, m.splines, m.thorns);
			}
		});
		document.addEventListener('mousemove',function(e){
			_vineWorker.postMessage({state:"applywind", x:e.movementX,y:e.movementY});
		});
	}

	ipx = parseFloat($('#home_title').css('left'));
	ipy = parseFloat($('#home_title').css('top'));



	hPage = $("body");
	var yOffset = 100;

	// console.log($('#vineArt').css('--vines').split(','));

	// CreateVineWorker([20, 150, 1.3, 300*5, new Vector3(hPage.width()*1,hPage.position().top-yOffset,0), "#vineArt"]);
	// CreateVineWorker([20, 150, 1.7, 300*5, new Vector3(hPage.width()*1.25,hPage.position().top-yOffset,0), "#vineArt"]);
	// CreateVineWorker([20, 200, 1.5, 300*5, new Vector3(hPage.width()*.25,hPage.position().top-yOffset,0), "#vineArt"]);
	// CreateVineWorker([20, 200, 1.5, 300*5, new Vector3(hPage.width()*1.5,hPage.position().top,0), "#vineArt"]);

	// CreateVines(4);

	vc = vineColor = $(':root').css("--vine-color");


	// SetWorkerSvg(0,3,vc, 2, 0, 2/12);
	// SetWorkerSvg(1, 5,vc,3,0, 5/12);
	// SetWorkerSvg(2,10,vc, 7, 2, 7/12);
	// SetWorkerSvg(3,15,vc, 12, 2, 1);

	var b = new ArrayBuffer(vineWorkerData);

	_vineWorker.postMessage({state:"init2", vines:vineWorkerData},[b]);
}


var d = 0;
var windLimit = 2;
var wForceX = 0, wVelX = 0; wAccX = 0;
var mx = 0;
function VineUpdate(dt, ctx) {
	if(typeof(_vineWorker) != "undefined") {
		_vineWorker.postMessage({state:"update", dt:dt, wforce:wForce});

		windCounter += dt;

		if(windCounter >= windLimit)
		{
			windCounter = 0;
			windLimit = randomInt(5, 20);
			wForceX = randomFlt(-100,100);
		}
		else
		{
			wForceX *= .8;
		}

		wAccX = wForceX;
		wVelX += wAccX * dt;

		_vineWorker.postMessage({state:"applywind", x:wVelX, y:0});

		mx = (wVelX - mx)/2;

		$('#home_title').css('margin-left', );
		// wAccX -= wVelX/3;
		wVelX *= .99;

	}


}

function VAUpdateCanvases() {
	var va = $('#vineArt');
	var vaw = parseFloat($('#vineArt').css('width')) * 1.3,
	vah = parseFloat($('#vineArt').css('height')) * 1.3;

	var cvLength = $('.vine-canvas').length;

	if(typeof(_vineWorker) != "undefined")
	{
		for(var i = 0; i < cvLength; i++)
		{
			var canvas = $('#VC--'+i);
			var cvw = parseFloat(canvas.css('width')), 
			cvh = parseFloat(canvas.css('height'));

			var cvml = 0, 
			cvmt = parseFloat(canvas.css('margin-top'));

			var cvx1 = 0 - 100;
			var cvx2 = cvw + 100;

			var cvy1 = 0 - 100;
			var cvy2 = cvh + 100;

			// var fsTemp = vineLocals[i].ctx.fillStyle;

			// vineLocals[i].ctx.beginPath();
			// vineLocals[i].ctx.rect(cvx1, cvy1, 20, 20);
			// vineLocals[i].ctx.fillStyle = "red";
			// vineLocals[i].ctx.fill();


			// vineLocals[i].ctx.beginPath();
			// vineLocals[i].ctx.rect(cvx2 - 20, cvy2 - 20, 20, 20);
			// vineLocals[i].ctx.fillStyle = "blue";
			// vineLocals[i].ctx.fill();

			// vineLocals[i].ctx.fillStyle = fsTemp;



			vineLocals[i].cvLim = [cvx1, cvx2, cvy1, cvy2];

			// console.log(cvmt, cvml);

			// console.log(cvx1, cvx2, cvy1, cvy2);
			var b = new ArrayBuffer(vineLocals[i].cvLim);
			_vineWorker.postMessage({state:"updateCanv", index: i, cvx1:cvx1, cvx2:cvx2, cvy1:cvy1, cvy2:cvy2},[b]);
		}
	}
}


function DrawVines2(index, splines, thorns) {

	// console.log(thorns);
	vineLocals[index].Draw(splines,thorns);

}

function SetWorkerSvg(i, sw, sc, blr, zi = 0, opacity) {
	vineWorkerData[i][6] = [sw, sc,blr,zi, opacity];
}

var wForce = 0;

var gdt = 0;

function CreateVineWorker2(stroke)
{
	vineWorkerData.push(stroke);
}


function CreateVineLocal(vw) {
	var vine = {};
	vine.svg = [vw.strokeWidth, vw.color, vw.blur, vw.zi, vw.opacity];
	vine.index = vineLocals.length + 1;

	vineLocals[vineLocals.length++] = vine;
}

function GetVine(index)
{
	return vines[index];
}


function MoveVines(x = 0, y = 0)
{
	for(var i = 0; i < vines.length; i++)
	{
		vines[i].Translate(x, y);
	}
}

function DestroyVines()
{
	for(var i = 0; i < vines.length; i++)
	{
		// vines[i].element.css('opacity', 0);
		vines[i].dstry = true;
		vines[i].element.css('opacity', 0);
	}
}

const pft = 1000 / 60;
var animReq;
var last = 0;
var dt = 0;

var animateSpeed = 1;
function start() {
	last = 0;
	//animReq = requestAnimationFrame(animate);

    // setTimeout(function(){
    // 	$('#vineArt').css("opacity", 1);
    // },4000);
}

function animate(n) {

  	// animReq = requestAnimationFrame(animate);

	dt = (((n - last) / pft)/1000);
	last = n;

	// VineUpdate(dt*animateSpeed);
}
