
var vines = [];
var hPage;
var delVines = false;
// var pen = new Pendulum();
// var pen2 = new Pendulum();

// nodeCount, vineLength, vineMass, vineTension, vinePosition

// var v3 = new Vine(5, 250, 1, 200, new Vector3(500,0,0));
// var v4 = new Vine(4, 600, 4, 200, new Vector3(1500,0,0));
// var v5 = new Vine(9, 250, 1, 200, new Vector3(2000,0,0));




//  vineData = [ vine length, vine position ]

function VinesInit(index)
{
	console.log("vine-" + index + " Loaded");
	document.getElementById("vine-" + index).contentWindow.init(vines[index]);
	// console.log(document.getElementById("vine-"+index));
}


function InitializeVines() {
	// for(var i = 0; i < vineData.size; i++)
	// {
	// 	vines.push(new Vine(vineData[i][0], vindData[i][1]));
	// }

	hPage = $("#home_page_container");
	var yOffset = 100;	

	for(var i = 0; i < 5; i++)
	{
		// var xOffset = randomFlt(0,2);
		// var xOffset = randomFlt(.5,2);

	}

	CreateVine(new Vine(20, 150, 2, 300, new Vector3(hPage.width()*1.25,hPage.position().top-yOffset,0)));
	CreateVine(new Vine(20, 200, 1.5, 300, new Vector3(hPage.width()*.5,hPage.position().top-yOffset,0)));
	CreateVine(new Vine(20, 150, 2, 300, new Vector3(hPage.width()*1,hPage.position().top-yOffset,0)));
	CreateVine(new Vine(20, 200, 1.5, 300, new Vector3(hPage.width()*1.5,hPage.position().top,0)));
	// CreateVine(new Vine(20, 200, 1.5, 300, new Vector3(hPage.width()*0.5,hPage.position().top,0)));


	var vc = $(':root').css("--vine-color");

	GetVine(0).SetSvg(5,vc, 3,-3);
	GetVine(1).SetSvg(10,vc, 7, 2);
	GetVine(2).SetSvg(3,vc, 2, -3);
	GetVine(3).SetSvg(15,vc, 12, 2);


	// GetVine(3).SetSvg(150,vc, 60);


	// GetVine(3).SetSvg(10,vc, 12);

	// GetVine(4).SetSvg(6,vc, 5);
	// GetVine(5).SetSvg(3,vc, 4);
	// GetVine(6).SetSvg(5,vc, 7);
	// GetVine(7).SetSvg(10,vc, 15);

	// GetVine(0).SetSvg(10,vc, 0);
	// GetVine(1).SetSvg(5,vc, 0);
	// GetVine(2).SetSvg(3,vc, 0);
	// GetVine(3).SetSvg(10,vc, 0);

	// GetVine(3).SetSvg(.5, vc, 5);






	for(var i = 0; i < vines.length; i++)
	{
		vines[i].Init();
		for(var j = 0; j < vines[i].nodeCount; j++)
		{
			vines[i].nodes[j].velocity = new Vector3(0,0,0);
			vines[i].nodes[j].netForce = new Vector3(0,0,0);
			vines[i].nodes[j].accel = new Vector3(0,0,0);
		}

	}

	// console.log(vines);

}

var wForce = 0;

var gdt = 0;

function VineUpdate(dt, ctx) {
	// v3.Update(dt);
	// v4.Update(dt);
	// v5.Update(dt);

	// GetVine(2).Follow(new Vector3($('#center_text').position().left, $(document).height()/2,0));
	wForce = 9.81;


	if(dt > .01)
	{
		// delVines = true;
		// DestroyVines();
		// animateSpeed = .0000001;
		dt = .001;
	}
	// else if(dt < .05)
	// {
	// 	// delVines = false;
	// 	// ResetVines();
	// 	animateSpeed = .5;
	// }
		


	for(var i = 0; i < vines.length; i++)
	{
		if(vines[i].isInit)
		{
			vines[i].Update(dt);
			vines[i].ApplyWind(wForce - randomFlt(-.25,3), new Vector3(-.1, .1, 0));
		}
	}

	// console.log(document.hasFocus() || isActiveTab);
	// ctx.clearRect(0,0,1000,1000);
	// // pen.Draw(ctx);
	// // pen2.Draw(ctx);

	// v3.Draw(ctx,0);
	// v4.Draw(ctx, 4);
	// v5.Draw(ctx,0);







////////////////////////////////////////////////////////////////////////////////

	if(GetVine(0) != null)
		GetVine(0).ApplyWind(1, new Vector3(-.1, -1, 0));
	// // // GetVine(0).ApplyWind(wForce, new Vector3(-.5, -.1, 0));
	if(GetVine(1) != null)
		GetVine(1).ApplyWind(-.5, new Vector3(-.5, .4, 0));





 //This code is for the vine clipping effect : vine moves to reveal page below 
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

const perfectFrameTime = 1000 / 60;
var animReq;
var lastUpdate = new Date();
var deltaTime;

var animateSpeed = .5;
function start() {
	animReq = requestAnimationFrame(animate);

    // setTimeout(function(){
    // 	$('#vineArt').css("opacity", 1);
    // },4000);

    lastUpdate = new Date();
}

function animate(now) {

	deltaTime = (((now - lastUpdate) / perfectFrameTime)/1000);
	lastUpdate = now;

  	animReq = requestAnimationFrame(animate);
	VineUpdate(deltaTime*animateSpeed);

}

window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
    InitializeVines();
	start();
});