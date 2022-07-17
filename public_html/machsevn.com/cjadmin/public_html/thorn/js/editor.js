var LIVE_EDIT = false;

var SAVE = false;

class XML_Manager
{
	constructor(readPath)
	{
		this.readFile = readPath
	}
}


var path = $('body');
var pathIndex = 0;
var modifier; 

var modifierCode = false;
var getElement = false;


var keys = {};

document.addEventListener('keydown', (e) => {
	keys[e.key.toLowerCase()] = true;
	ReadKeys();
});

function clr() {
	keys = {};
}

function ReadKeys() {
	
	if(keys["`"] && keys["s"])
	{
		clr();
	}
	else if(keys["control"] && keys["x"])
	{
		getsetElement(true);
		clr();
	}
	else if(keys["enter"] && getElement)
	{
		getsetElement(false);
		clr();
	}

	// keys = 

	// if(e.key == "ArrowUp" && pathIndex < path.length - 1)
	// {
	// 	// RemoveHandles($(path[pathIndex]));
	// 	pathIndex++;
	// 	// AddHandles($(path[pathIndex]));
	// }
	// else if(e.key == "ArrowDown" && pathIndex > 0)
	// {
	// 	// RemoveHandles($(path[pathIndex]));
	// 	pathIndex--;
	// 	// AddHandles($(path[pathIndex]));
	// }
}



document.addEventListener('mousedown', (e) => {
	// if(getElement)
	// {
	// 	getsetElement(false);

	// }

	var elms = "";

	console.log(e.path);

	for(var i = 0; i < e.path.length; i++)
	{
		if(e.path[i].id)
			elms += e.path[i].id + " ";
		else if(e.path[i].parentNode)
		{
			var parent = e.path[i].parentNode;
			// console.log(parent);
			var childNodes = parent.childNodes;

			for(var c = 0; c < childNodes.length; c++)
			{
				// console.log("childNode");

				if(e.path[i] === childNodes[i])
				{
					elms += e.path[i].tagName + "-" + c + " ";
				}
			}
		}
		else
		{
			elms += $(e.path[i]) + " ";
		}
		// elms += ((e.path[i].id) || (e.path[i].tagName)) + " ";
	}

	// console.log(elms);

	$("#page_container").html(elms);
});

document.addEventListener('keyup', (e) => {
	keys[e.key] = false;
});

document.addEventListener('mouseover', (e) => {
	if(getElement)
	{
		// modifer =
		pathIndex = 0;
		path = e.path;

		modifier = $(path[pathIndex]);
	}
});

function ToggleEditMode() {
	if(LIVE_EDIT)
	{
		LIVE_EDIT = false;
		console.log('LIVE_EDIT: ' + LIVE_EDIT);
	}
	else
	{
		LIVE_EDIT = true;
		console.log('LIVE_EDIT: ' + LIVE_EDIT);
	}

}


function ED1_34HDT() {
	if(getElement)
	{
		if(path == undefined || path == null)
		{
			modifier = $('body');
		}
		else {
			modifier = $(path[pathIndex]);

			// if(modifierCode)
			// {
			// 	// var htmlInput = $('<input')
			// }
			// else
			// {

			// }
		}
		DrawUI();
	}
}


var ui;
var uictx;

$(document).ready(function() {
	ui = document.getElementById("ui_canvas");
	uictx = ui.getContext("2d");

	setupCanvas(ui);

});

// var cellSize = 30;
// function DrawGrid(canvas,ctx){
	// canvas.width = Math.floor(document.body.clientWidth / cellSize) * cellSize;
	// canvas.height = Math.floor(document.body.clientHeight / cellSize) * cellSize;


	// // setupCanvas(grid);
	// // ui.style.left = ((document.body.clientWidth - ui.width) / 2) + 'px';
	// // grid.style.left = 20 + 'px';

	// // console.log( document.body.clientWidth + ',' +  grid.width);
	// // console.log( document.body.clientHeight + ',' +  grid.height);




	// var xCount = canvas.width / cellSize;
	// var yCount = canvas.height / cellSize;

	// // gctx.clearRect(0, 0, grid.clientWidth, grid.clientHeight);
	// var y = cellSize;
	// while(y <= canvas.height)
	// {
	// 	var x = 0;
	// 	// console.log(grid.height);
	// 	while(x <= canvas.width)
	// 	{
	// 		ctx.beginPath();
	// 		ctx.arc(x, y, .5, 0, 2 * Math.PI);
	// 		ctx.fill();
	// 		x += cellSize;
	// 	}

	// 	y += cellSize;
	// }
// }

function DrawUI() {

	uictx.clearRect(0, 0, ui.width, ui.height);
	// DrawGrid(ui,uictx);


	DrawSelected(ui, uictx);
}

function getsetElement(get) {

	if($('#admin_panel.showadm').length)
	{
	console.log("get");
		if(get)
		{
			$('#admin_panel').css({
				'opacity':0,
				'pointer-events':'none'
			});


			getElement = get;
		}
		else 
		{
			$('#admin_panel').css({
				'opacity': 1,
				'pointer-events': 'auto'
			});

			$('#elm_class').val(path[pathIndex].className);
			$('#elm_id').val(path[pathIndex].id);

			getElement = get;
		}
	}
	
}


function DrawSelected(canvas, ctx) {

	// console.log($(path[pathIndex]).position());

	ctx.strokeStyle = "red";
	ctx.strokeWidth = "2px";
	// offset(modifier);
	ctx.strokeRect(rect(modifier).left , rect(modifier).top, rect(modifier).width, rect(modifier).height );
}

function rect(el) {
	// return el[0].getBoundingClientRect();
    // return { top: 10 , left: 10 };

    var rect = el[0].getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft, width: rect.width, height: rect.height }
}

function XML_JS () {

}

function JS_XML () {

}



//xml --> html
function XML_HTML () {

}


//html --> xml
function HTML_XML () {

}



