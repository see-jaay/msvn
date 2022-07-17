



var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;


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

//  vineData = [ vine length, vine position ]

function VinesInit(index)
{
	console.log("vine-" + index + " Loaded");
	document.getElementById("vine-" + index).contentWindow.init(vines[index]);
	// console.log(document.getElementById("vine-"+index));


}


function InitializeVines() {


	if(typeof(_vineWorker) == "undefined")
	{
		_vineWorker = new Worker("./Effects/Vine_Art/Workers/Main-worker.js");

		_vineWorker.addEventListener('message', function(e){
			var m = e.data;
			var s = m.state;
			if(s == "init")
			{
				VineInitLocal(m.vines);
			}
			else if(s =="update")
			{
				VineUpdateLocal(m.index, m.paths, m.transforms, m.verts);
			}
		});
	}

	hPage = $("body");
	var yOffset = 100;

	// console.log($('#vineArt').css('--vines').split(','));

	CreateVineWorker([20, 150, 1.3, 300*5, new Vector3(hPage.width()*1,hPage.position().top-yOffset,0), "#vineArt"]);
	CreateVineWorker([20, 150, 1, 300*5, new Vector3(hPage.width()*1.25,hPage.position().top-yOffset,0), "#vineArt"]);
	CreateVineWorker([20, 200, 1.5, 300*5, new Vector3(hPage.width()*.25,hPage.position().top-yOffset,0), "#vineArt"]);
	CreateVineWorker([20, 200, 1.5, 300*5, new Vector3(hPage.width()*1.5,hPage.position().top,0), "#vineArt"]);

	var vc = $(':root').css("--vine-color");


	SetWorkerSvg(0,3,vc, 2, 0, 2/12);
	SetWorkerSvg(1, 5,vc,3,0, 5/12);
	SetWorkerSvg(2,10,vc, 7, 2, 7/12);
	SetWorkerSvg(3,15,vc, 12, 2, 1);

	_vineWorker.postMessage({state:"init", vines:vineWorkerData});
}

function VinesReInit(){
	vReInit = true;
}


var start;
function VineUpdate(dt, ctx) {
	start = Date.now();

	if(vReInit && _vineWorker != "undefined")
	{

		positions = [];
		vineCount = parseInt($('#vineArt').css('--vCount'));

		for(var i = 0; i < vineCount; i++)
		{
			var pos = $('#vineArt').css('--v'+i).replace(/\s/g, '').split(',');
			// positions.push([hPage.width() + parseFloat(pos[0]), parseFloat(pos[1])]);
			// positions.push([pos[0] * hPage.width(), pos[1] * hPage.height()]);
			if(pos[2] == 1)
				positions.push([parseFloat(pos[0]), parseFloat(pos[1]) * hPage.height()]);
			else
				positions.push([hPage.width() + parseFloat(pos[0]), parseFloat(pos[1]) * hPage.height()]);

		}

		_vineWorker.postMessage({state:"reinit", positions:positions});

		vReInit = false;
		// alert("reinit");
	}



	_vineWorker.postMessage({state:"update", dt:dt, wforce:wForce});
}



function VineInitLocal(vineWorkers) {
	for(var i = 0; i < vineWorkers.length; i++)
	{
		// vines[i].Init(vineWorkers[i]);
		CreateVineLocal(vineWorkers[i]);
	}

}

function VineUpdateLocal(i, paths, transforms, verts) {

	vineLocals[i].Update(paths, transforms, verts);

	// console.log(Date.now() - start);
}






function SetWorkerSvg(i, sw, sc, blr, zi = 0, opacity) {
	vineWorkerData[i][6] = [sw, sc,blr,zi, opacity];
}

var wForce = 0;

var gdt = 0;


function CreateVineWorker(vineData)
{
	vineWorkerData.push(vineData);
}

//vw = vineWorker
function CreateVineLocal(vw) {
	// var vine = new Vine(vw.thornCount, vw.length, vw.mass, vw.thornCount, vw.pos);
	var vine = new Vine();
	vine.SetSvg(vw.strokeWidth, vw.color, vw.blur, vw.zi, vw.opacity);

	vine.index = vineLocals.length;

	vineLocals.push(vine);

	vine.Init(vw);
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

var animateSpeed = .15;
function start() {
	last = 0;
	animReq = requestAnimationFrame(animate);

    // setTimeout(function(){
    // 	$('#vineArt').css("opacity", 1);
    // },4000);
}

function animate(n) {

  	animReq = requestAnimationFrame(animate);

	dt = (((n - last) / pft)/1000);
	last = n;

	VineUpdate(dt*animateSpeed);
}

function VALoaded() {

	if(!vinesLoaded)
	{
	    console.log('page is fully loaded');
	    InitializeVines();
		start();
		vinesLoaded = true;
	}
	else
	{
		for(var i = 0; i < vines.length; i++)
		{
			vines[i].Init();
		}
	}
}

