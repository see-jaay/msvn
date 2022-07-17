
//The Matrix class interfaces between the users interaction and the web worker

class MTRX {
	constructor(){
		this.init = false;
	}
	static Init(){

		if(typeof(MTRX.worker) === "undefined")
		{
			MTRX.worker = new Worker("JS/Matrix/Matrix_Worker.js");

			MTRX.worker.addEventListener('message', function(e){
				let s = e.data.state;

				if(s === "draw")
				MTRX.Draw();

				if(s === "init") {
					MTRX.init = true;
					console.log('Matrix Initialized');
					// MTRX.Start();
				}
			});
		}

		MTRX.worker.postMessage({state:'init'});

		console.log('Matrix Local Init');


	}

	static Update(dt){
		if(MTRX.init){

		}
	}
}

MTRX.worker;































//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

















var cmdCellMap = "";
var cmdCellMapPage = "";
var cmdClearMap = "";
var longFlickers = [];
var cellWidth = 16;
var cellHeight = 22;

var cmdPanel;
var cmdOtherPanel;

var cmdCellsFilled = false;

var mColCount = 0;
var mRowCount = 0;

var cmdCanvas;
var cmdCtx;

var mtrxTransition = false;

var CMDWorker;
var cmdWorker = false;

var cmdUpdate = null, cmdShow = false,
	cmdPromptUpdate = false, cmdPrompt = '';

var cmdActiveCells = 0;
var buffer;


var cmdMaskImage = null;
var cmdNewPage = false;


// Loads the worker file
function CMD_Init()
{
	if(typeof(CMDWorker) == "undefined")
	{
		CMDWorker = new Worker("./js/Effects/CMD/CMD-worker.js");
		CMDWorker.addEventListener('message', function(e){
			var s = e.data.state;

			if(s === "draw")
				CMD_Draw(e.data.map);

			// if(s === "init")
				// TransitionClip('cmd','100% 0, 100% 100%, 0 100%');

			if(s === "complete" && cmdUpdate == true)
			{
				//cmdUpdate = false;
				// TransitionClip('cmd','100% 0, 75% 75%, 0 100%');
			}

			if(s === "cellsFilled" && cmdCellsFilled == false)
			{
				cmdCellsFilled = true;
				// siteColorsFast('0,0,0', '100,240,0', 0);
				// TransitionClip('cmd','100% 0, 100% 100%, 0 100%');
				// var image = cmdCanvasBkrnd.toDataURL('image/png', .01);
				cmdOtherPanel.removeClass('active');
				cmdPanel.addClass('active');
			}

			if(s === "showPage" && !cmdCellsFilled)
			{
				// cmdMaskImage = cmdCanvasBkrnd.toDataURL('image/png', .01);
				// cmdPanel.css('-webkit-mask-image', 'url(' + cmdMaskImage + ')');
			}
		});
	}
}

function FillTemp(t){
	tempCoords = [];
	cmdCellMap = "";
	cmdCellMapPage = "";

	for(var y = 0; y < mRowCount; y++)
	{
		for(var x = 0; x < mColCount; x++)
		{
			cmdCellMap += "0";
			cmdClearMap += "0";
			cmdCellMapPage += " ";
			filledBackground += "0";
		}
	}

	buffer = new ArrayBuffer(cmdCellMap.length);

	// console.log(cmdCellMap[5]);
	// UpdateMap(0, "p");
	// UpdateMap(mColCount - 1,"p");
	// UpdateMap((mColCount * mRowCount) - mColCount - 1, "p");
	// UpdateMap((mColCount * mRowCount) - 1, "p");

	if(t)
	{
		// CMDWorker.postMessage({
		// 	state:"wave",
		// 	point:{
		// 		x:mColCount * .99,
		// 		z:mRowCount * .5
		// 	}
		// });

		// CMDWorker.postMessage({
		// 	state:"wave",
		// 	point:{
		// 		x:mColCount * .01,
		// 		z:mRowCount * .5
		// 	}
		// });

		// CMDWorker.postMessage({
		// 	state:"wave",
		// 	point:{
		// 		x:mColCount * .5,
		// 		z:mRowCount * .01
		// 	}
		// });

		// CMDWorker.postMessage({
		// 	state:"wave",
		// 	point:{
		// 		x:mColCount * .5,
		// 		z:mRowCount * .99
		// 	}
		// });

		CMDWorker.postMessage({
			state:"wave",
			point:{
				x:mColCount * .5,
				z:mRowCount * .1,
				sig: 4
			}
		});


		// for(var i = 0; i < 3; i++)
		// {
		// 	CMDWorker.postMessage({
		// 		state:"wave",
		// 		point:{
		// 			x:randomInt(0, mColCount),
		// 			z:randomInt(0, mRowCount),
		// 		}
		// 	});
		// }

	}

	var mousedown = false;

	document.addEventListener("mousedown", function(e){

		mousedown = true;

	});

	document.addEventListener("mouseup", function(e){
	 //  	CMDWorker.postMessage({
		// 	state:"wave",
		// 	point:{
		// 		x:Math.floor(e.pageX / cellWidth),
		// 		z:Math.floor(e.pageY / cellHeight),
		// 		height: randomFlt(0,.01)
		// 	}
		// });

		mousedown = false;

	});

	document.addEventListener('mousemove',function(e){

		// if(mousedown)
			CMDWorker.postMessage({
			state:"wave",
			point:{
				x: Math.floor(e.pageX / cellWidth),
				z: Math.floor(e.pageY / cellHeight),
				height:.03,
				sig: 10
				}
			});

	});

	document.addEventListener('keypress', function(e){

		console.log(String.fromCharCode(e.charCode));

	});
		// UpdateMap([(mColCount * mRowCount)/2], 10, 1);
		// UpdateMap([0], 100, 1);
		// UpdateMap([(mColCount * mRowCount) - 1], 10, 1);
		// UpdateMap([0 ,mColCount - 1, (mColCount * mRowCount) - mColCount, (mColCount * mRowCount) - 1], 10, 1);


	var lfi = randomInt(0, cmdCellMap.length/100);

	for(var i = 0; i < lfi; i++)
	{
		longFlickers.push(randomInt(0, cmdCellMap.length - 1));
	}

}

function UpdateMap(ndxs, rep, ovr = 0)
{
	// if(temp)
	// 	cmdCellMapPage = cmdCellMapPage.replaceAt(index, rep);
	// else
	// 	cmdCellMap = cmdCellMap.replaceAt(index, rep);

	CMDWorker.postMessage({state:"updateMap", ndxs:ndxs, rep:rep, ovr:ovr});
}


var time = 0;

var show = true;

var showReq;
var hideReq;

var cmdCanvasBkrnd;
var cmdBkrndCtx;
var cmdClip;
var filledBackground;

function CMD_Start(){
	// cmdShow = true;

}

function CMD_Set(panel, otherPanel, transition = 1){

	cmdPanel = panel;
	cmdOtherPanel = otherPanel;

	if(!$('#cmd_canvas').length)
	{
		$('body').append('<canvas id="cmd_canvas" class="transition-canvas">');
		$('body').append('<canvas id="cmd_canvas_bkrnd" class="transition-canvas">');
		$('body').append('<svg width="0" height="0"><defs><clipPath id="cmd_clip"></clipPath></defs></svg>');

	}

	cmdCanvas = document.getElementById("cmd_canvas");
	cmdCanvasBkrnd = document.getElementById("cmd_canvas_bkrnd");
	cmdClip = $('#cmd_clip');

	var zi = 20;

	$(cmdCanvas).css('z-index', zi);
	cmdPanel.css('z-index', zi - 2);
	$(cmdCanvasBkrnd).css('z-index', zi - 1);
	// $(cmdCanvasBkrnd).css('opacity', 0);


	cmdCtx = setupCanvas(cmdCanvas);
	cmdBkrndCtx = setupCanvas(cmdCanvasBkrnd);


	// cmdMaskImage = cmdCanvasBkrnd.toDataURL();
	// cmdPanel.css('-webkit-mask-image', 'url(' + cmdMaskImage + ')');


	cmdCtx.fontSize = 12;
	cmdCtx.fontFamily = "Courier_Prime_Code";
	cmdCtx.strokeStyle = 'rgb(50,150,0)';
    cmdCtx.lineWidth = .04;

	mColCount = Math.ceil(cmdCanvas.width / cellWidth);
	mRowCount = Math.ceil(cmdCanvas.height / cellHeight);

	CMDWorker.postMessage({state:"init", colCount:mColCount, rowCount:mRowCount, cw:cellWidth, ch:cellHeight, t:transition});
	FillTemp(transition);

	cmdUpdate = true;
	cmdCellsFilled = false;
	cmdNewPage = true;

}

function CMD_Update(dt) {
	// cmdCellsFilled = false;

	// if(!cmdCellsFilled)
	// CMDWorker.postMessage({state:"enter", dt:dt, map:cmdCellMap}, [str2ab(cmdCellMap + dt + "enter")]);
	CMDWorker.postMessage({state:"update", dt:dt});
	CMD_Pagify();

	// if(cmdCellsFilled)
	// console.log(cmdCellsFilled);

	// if(cmdNewPage)

	// else
		// CMD_ArrangePage();

}
var level = 0;

function CMD_Pagify(element) {

	if(!element)
	{
		$('.cmdb').not('.set').each(function(){
			CMD_PlaceElement($(this));
		});
	}
	else
	{
		// if()
	}
}

function offset(el) {

    var rect = el.position(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return { top: rect.top + scrollTop, left: rect.left + scrollLeft, right: rect.left + scrollLeft + el.innerWidth(), bottom: rect.top + scrollTop + el.innerHeight()};
}

function roundByc(num, by){
	return Math.ceil(num/by) * by;
}

function roundBycmd(num, by){
	return Math.round(num/by) * by;
}

function roundByf(num, by){
	return Math.floor(num/by) * by;
}



function CMD_PlaceElement(element){

	var pos = offset(element);

	// console.log( offset(element));

	level--;

	// var leftpx = parseFloat(element.position().left) + parseFloat(element.css('margin-left')), toppx = parseFloat(element.position().top) + parseFloat(element.css('margin-top')),
	// 	bottompx = parseFloat(element.position().top) + element.innerHeight(),
	// 	rightpx = roundBycmd(parseFloat(element.position().left) + element.innerWidth() + + parseFloat(element.css('margin-left')), cellWidth);

	var leftpx = parseFloat(pos.left),
		toppx = parseFloat(pos.top),
		bottompx = parseFloat(pos.bottom),
		rightpx = parseFloat(pos.right);


	var lc = (roundBycmd(leftpx, cellWidth) / cellWidth),
		rc = (roundByc(rightpx, cellWidth) / cellWidth) - 1,
		bc = (roundByf(bottompx, cellHeight) / cellHeight) - 1,
		tc = (roundByf(toppx, cellHeight) / cellHeight);

	// console.log(lc);
	// element.css({
	// 	// 'position':'absolute',
	// 	// 'margin-left': cellWidth - 1+ 'px',
	// 	// 'margin-top': cellHeight + 'px',
	// 	'width': roundBy(parseFloat(element.css('width')),cellWidth),
	// 	'height': roundBy(parseFloat(element.css('height')), cellHeight)
	// });
	// console.log(lc);


	// console.log(rc + (mColCount * bc));
	// console.log(element.css('width'));


	for(var i = 0; i < cmdCellMapPage.length; i++)
	{
		if(((i % mColCount) == lc || (i % mColCount) == rc) && ((i / mColCount) >= tc && (i / mColCount) <= bc) )
			cmdCellMapPage = cmdCellMapPage.replaceAt(i, '0');

		if( ((i % mColCount) >= lc && (i % mColCount) <= rc) && (Math.floor(i / mColCount) == tc || Math.floor(i / mColCount) == bc) )
			cmdCellMapPage = cmdCellMapPage.replaceAt(i, '0');
	}

	var mapUpdate = [];
	var stopUpdate = [];

	for(var i = 0; i < cmdCellMap.length; i++)
	{
		if(((i / mColCount) >= tc && (i / mColCount) <= bc) )
		{
			if((i % mColCount) == lc)
				mapUpdate.push(i);
			else if((i % mColCount) == rc)
				mapUpdate.push(i);
		}

		if(((i % mColCount) >= lc && (i % mColCount) <= rc))
		{
			if(Math.floor(i / mColCount) == tc)
				mapUpdate.push(i);
			else if(Math.floor(i / mColCount) == bc)
				mapUpdate.push(i);
		}

		if(((i / mColCount) >= tc + 1 && (i / mColCount) <= bc - 1))
		{
			if((i % mColCount) == lc + 1)
				stopUpdate.push(i);
			else if((i % mColCount) == rc - 1)
				stopUpdate.push(i);
		}

		if(((i % mColCount) >= lc + 1 && (i % mColCount) <= rc - 1))
		{
			if(Math.floor(i / mColCount) == tc + 1)
				stopUpdate.push(i);
			else if(Math.floor(i / mColCount) == bc - 1)
				stopUpdate.push(i);
		}
	}

	// CMDWorker.postMessage({state:"updateMap", ndxs:mapUpdate, rep:0});
	// CMDWorker.postMessage({state:"updateMap", ndxs:stopUpdate, rep:-1});


	// cmdCellMapPage = cmdCellMapPage.replaceAt(rc + (mColCount * bc), '>');

	// var line = 1;
	// var tab = 1;

	// for(var i = 0; i < element.text().length; i++)
	// {
	// 	element.text().split('/');

	// 	cmdCellMapPage = cmdCellMapPage.replaceAt((lc + tab) + (mColCount * (tc + line) ) + i, element.text()[i]);
	// }
	// console.log(cmdCellMapPage);


	// console.log(element.text());


	element.css({
		// 'padding': cellHeight + 'px ' + cellWidth  + 'px ',
		// 'position': 'absolute',
		// 'left': lc * cellWidth + 'px',
		// 'top': tc * cellHeight + 'px',
		// 'bottom': ((bc * cellHeight) + cellHeight) + 'px',
		// 'right': ((rc * cellWidth) + cellWidth) + 'px',

	// 	'margin-left':leftpx + 'px',
	// 	'margin-top': toppx + 'px',
	});

	element.css({
		// 'width': roundByf((rc - lc - 1) * cellWidth, cellWidth) + 'px',
		// 'height': roundByf((bc - tc - 1) * cellHeight, cellHeight) + 'px',

	// 	'height': roundByf((bc - tc) * cellHeight - (parseFloat(element.css('padding-top')) * 2) ) + 'px'
	// // 	'height': roundByf(parseFloat(element.css('height')) - parseFloat(element.css('padding-top')) * 2, cellHeight) + 'px',
	});


	element.addClass('set');


}

function CMD_Draw(map){

	// cmdCellMap = map;


	// var map = cmdCellMap;
	var ctx = cmdCtx;
	var ctx2 = cmdBkrndCtx;

	// if(!cmdCellsFilled);
		ctx.clearRect(0, 0, cmdCanvas.width, cmdCanvas.height);

	// if(cmdCellsFilled)
	// 	ctx2.clearRect(0, 0, cmdCanvasBkrnd.width, cmdCanvasBkrnd.height);


	var offsetx = cellWidth/2 - ctx.fontSize/4, offsety = cellHeight/2 + 3;

	// for(var i = 0; i < cmdCellMapPage; i ++)

	for(var i = 0; i < map.length; i++)
	{
		var x = Math.floor(i % mColCount);
		var y = Math.floor(i / mColCount);
		var m = map[i].split('/');
		// var index = x + (mColCount * y);
		var c = m[0];
		var opacity = parseFloat(m[1]);
		var darkness = parseFloat(m[2]);
		// var opacity = oMap[i] * .1;
		var c2 = cmdCellMapPage[i];


		// if(c != '0' && opacity != 0);
		// {
			if(darkness <= 10)
			{
				ctx2.fillStyle = 'rgba(0,0,0,' + darkness + ')';
				ctx2.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
			}

			if(opacity > 0)
			{
				ctx.lineWidth = .4;
				// ctx.strokeStyle = 'rgba(240,0,0,' + opacity + ')';
				// ctx.fillStyle = 'rgba(240, 0, 0,' + opacity + ')';
				// ctx.fillStyle = 'rgba('+randomInt(200,240) +','+randomInt(200,240)+','+randomInt(200,240)+','+ ((opacity/1.1)%1) + ')';
				ctx.fillStyle = 'rgba('+240 +',0,0,'+ 1 + ')';

				ctx.fillText(c, x * cellWidth + offsetx - randomInt(-1,1), y * cellHeight + offsety - randomInt(-3,3));

				ctx.lineWidth = .4;
				ctx.strokeStyle = 'rgba(100,0,0,' + opacity + ')';
				// ctx.fillStyle = 'rgba(100, 240, 0,' + opacity + ')';
				ctx.fillStyle = 'rgba(100, 240, 0,' + 1 + ')';

				ctx.fillText(c, x * cellWidth + offsetx, y * cellHeight + offsety);
			}





		// if(c == '-')
		// {
		// 	ctx.lineWidth = .04;

		// 	ctx.strokeStyle = 'rgb(255,255,255)';
		// 	ctx.fillStyle = 'rgb(255,255,255)';
		// 	ctx.fillText('-',x * cellWidth + offsetx, y * cellHeight + offsety);
		// }
		// else if(c == ' ')
		// {

		// 	if(c2 == '0')
		// 	{
		// 		ctx.lineWidth = .04;
		// 		ctx.strokeStyle = 'rgba(100,240,0, 1)';
		// 		ctx.fillStyle = 'rgba(100, 240,0, .5)';
		// 		var rands = 'マッハ・セブンMACHSEVN';
		// 		ctx.fillText(rands[randomInt(0, rands.length - 1)], x * cellWidth, y * cellHeight + offsety);
		// 	}
		// 	else
		// 	{
		// 		ctx.lineWidth = .04;
		// 		ctx.strokeStyle = 'rgba(100,240,0, 1)';
		// 		ctx.fillStyle = 'rgba(100, 240,0, .5)';
		// 		ctx.fillText(c2, x * cellWidth, y * cellHeight + offsety);
		// 	}
		// }
		// else if(c == 'M')
		// {
		// 	ctx.lineWidth = .04;
		// 	ctx.strokeStyle = 'rgba(100,240,0, .5)';
		// 	ctx.fillText('M',x * cellWidth, y * cellHeight + offsety);
		// }
		// else if(c =='A')
		// {
		// 	ctx.lineWidth = .04;
		// 	ctx.strokeStyle = 'rgb(100, 240, 0)';
		// 	ctx.fillStyle = 'rgb(100, 240,0)';
		// 	ctx.fillText('A',x * cellWidth + offsetx, y * cellHeight + offsety);
		// 	// ctx.fillText('\u2592',x * cellWidth, y * cellHeight + cellHeight/2 + 3);
		// }
		// else if(c =='C')
		// {
		// 	ctx.lineWidth = .04;
		// 	ctx.strokeStyle = 'rgba(100,240,0, .75)';
		// 	ctx.fillStyle = 'rgba(100,240,0, .75)';
		// 	ctx.fillText('C',x * cellWidth, y * cellHeight + cellHeight/2 + 3);
		// 	// ctx.fillText('\u2591',x * cellWidth + offsetx, y * cellHeight + offsety);
		// }
		// else if(c == 'H')
		// {
		// 	ctx.lineWidth = .02;
		// 	ctx.strokeStyle = 'rgba(100,240,0, 1)';
		// 	ctx.fillStyle = 'rgba(100,240,0, 1)';
		// 	ctx.fillText('H',x * cellWidth + offsetx, y * cellHeight + offsety);
		// }
		// else if(c != '0' && c != 'undefined')
		// {
		// 	ctx.lineWidth = .04;
		// 	ctx.strokeStyle = 'rgba(100,240,0,.5)';
		// 	ctx.fillStyle = 'rgba(100,240,0, .5)';
		// 	ctx.fillText(c,x * cellWidth + offsetx, y * cellHeight + offsety);
		// }
	}

}

function CMD_OnComplete() {

}

function CMD_OnCellsFilled() {
	cmdCellsFilled = true;
	// console.log("cellsFilled");
	siteColors2('0,0,0', '255,255,255');
}
