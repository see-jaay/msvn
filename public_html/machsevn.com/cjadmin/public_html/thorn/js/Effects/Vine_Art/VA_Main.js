
var vines = [];
var hPage;
var delVines = false;

var vinesLoaded = false;
// var pen = new Pendulum();
// var pen2 = new Pendulum();

// nodeCount, vineLength, vineMass, vineTension, vinePosition

// var v3 = new Vine(5, 250, 1, 200, new Vector3(500,0,0));
// var v4 = new Vine(4, 600, 4, 200, new Vector3(1500,0,0));
// var v5 = new Vine(9, 250, 1, 200, new Vector3(2000,0,0));


var _vineUpdate;
var _vineDraw;

//  vineData = [ vine length, vine position ]

function VinesInit(index)
{
	console.log("vine-" + index + " Loaded");
	document.getElementById("vine-" + index).contentWindow.init(vines[index]);
	// console.log(document.getElementById("vine-"+index));


}


function InitializeVines() {
	hPage = $("body");
	var yOffset = 100;


	if(typeof(_vineUpdate) == "undefined")
	{
		_vineUpdate = new Worker("./Effects/Vine_Art/Workers/Main-worker.js");

		_vineUpdate.addEventListener('message', function(e){
			UpdateVines(e);
		});
	}




	// CreateVine(new Vine(4, 150*5, 2, 5, new Vector3(hPage.width()*1,hPage.position().top,0), "#vineArt", "#vineArtTwo"));


	CreateVine(new Vine(20, 150, 1, 300*5, new Vector3(hPage.width()*1.25,hPage.position().top-yOffset,0), "#vineArt"));
	CreateVine(new Vine(20, 200, 1.5, 300*5, new Vector3(hPage.width()*.25,hPage.position().top-yOffset,0), "#vineArt"));
	CreateVine(new Vine(20, 150, 1.2, 300*5, new Vector3(hPage.width()*1,hPage.position().top-yOffset,0), "#vineArt"));
	CreateVine(new Vine(20, 200, 1.5, 300*5, new Vector3(hPage.width()*1.5,hPage.position().top,0), "#vineArt"));

	var vc = $(':root').css("--vine-color");

	GetVine(0).SetSvg(5,vc, 3,0);
	GetVine(1).SetSvg(10,vc, 7, 2);
	GetVine(2).SetSvg(3,vc, 2, 0);
	GetVine(3).SetSvg(15,vc, 12, 2);

	for(var i = 0; i < vines.length; i++)
	{
		vines[i].Init();
	}
}

var wForce = 0;

var gdt = 0;

function VineUpdate(dt, ctx) {

	// var start = Date.now();

	wForce = randomFlt(10,20);

	if(dt > .01)
	{
		dt = .001;
	}

	// if(GetVine(0) != null)
	// 	GetVine(0).ApplyWind(1, new Vector3(-.1, -1, 0));
	// // // // GetVine(0).ApplyWind(wForce, new Vector3(-.5, -.1, 0));
	// if(GetVine(1) != null)
	// 	GetVine(1).ApplyWind(-.5, new Vector3(-.5, .4, 0));


	// _vineUpdate.postMessage({vines:vines, wForce:wForce,dt:dt});

	for(var i = 0; i < vines.length; i++)
	{
		if(vines[i].isInit)
		{

			// Execute these functions within the worker
			vines[i].ApplyWind(wForce);
			vines[i].ApplyWind(wForce * randomFlt(-.1,.25));
			vines[i].Update(dt);
			/////


		}
	}

	// console.log(Date.now()-start);


////////////////////////////////////////////////////////////////////////////////





 // This code is for the vine clipping effect : vine moves to reveal page below 
	// var percentageString = '';

	// var pageWidth = hPage.width() * 3;

	// console.log(GetVine(3).head.pos.x, hPage.width() * 3);

	// percentageString += ((GetVine(3).head.pos.x) / pageWidth) * 100 + '% ';
	// percentageString += GetVine(3).head.pos.y / hPage.height() * 100 + '%,';

	// for(var i = 0; i < GetVine(3).nodeCount; i++)
	// {
	// 	percentageString += ((GetVine(3).nodes[i].pos.x) / pageWidth) * 100 + '% ';
	// 	percentageString += GetVine(3).nodes[i].pos.y / hPage.height() * 100 + '%';

	// 	percentageString += ',';

	// 	// console.log(GetVine(3).nodes[i]);
	// }

	// $('#home_page_container').css('clip-path', 'polygon(0% 0%,' + percentageString + '0% 0%)');
////////////////////////////////////////////////////////////////////////////////











	// // // GetVine(1).ApplyWind(wForce, new Vector3(-1.5, -.2, 0));
	// // // GetVine(1).ApplyWind(wForce, new Vector3(-.5, -.4, 0));

	// GetVine(2).ApplyWind(wForce, new Vector3(-1.2, .2, 0));
	// // // GetVine(2).ApplyWind(wForce, new Vector3(-.8, .05, 0));

	// GetVine(3).ApplyWind(wForce, new Vector3(-.75, .1, 0));



	// GetVine(4).ApplyWind(wForce, new Vector3(-1.2, .2, 0));

	// // // GetVine(0).ApplyWind(wForce, new Vector3(-.5, -.1, 0));


	// // // GetVine(1).ApplyWind(wForce, new Vector3(-1.5, -.2, 0));
	// // // GetVine(1).ApplyWind(wForce, new Vector3(-.5, -.4, 0));

	// GetVine(5).ApplyWind(wForce, new Vector3(-.1, .1, 0));
	// // // GetVine(2).ApplyWind(wForce, new Vector3(-.8, .05, 0));
	// GetVine(6).ApplyWind(wForce, new Vector3(-.5, .4, 0));

	// GetVine(7).ApplyWind(wForce, new Vector3(-.75, .1, 0));
	// // GetVine(3).ApplyWind(wForce, new Vector3(-1, -.1, 0));
	// // GetVine(3).ApplyWind(wForce, new Vector3(0, -.1, 0));


}

function CreateVine(vine)
{

	vine.index = vines.length;
	vines.push(vine);
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


	// setTimeout(function(){
	// 	for(var i = 0; i < vines.length; i++)
	// 	{
	// 		vines[i].docElement.remove();
	// 	}	
	// 	vines = [];	
	// },parseInt(vines[i].element.css('transition-duration')) * 1000);

}

function ResetVines()
{
	// for(var i = 0; i < vines.length; i++)
	// {
	// 	vines[i].element.css('opacity', 0);
	// 	// vines[i].Destroy();
	// }

	//setTimeout(function(){VineInit();},0);

    // setTimeout(function(){
    // 	$('#vineArt').css("opacity", 1);
    // },4000);


    console.log(vines.length);
}

const pft = 1000 / 60;
var animReq;
var last = 0;
var dt = 0;

var animateSpeed = .5;
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

