



//global seed for randomFromSeed();
//should be set by *data-seed* in html
var seed = 1;

///generate a value based on global seed with increment;
//the cell 
//sizes should remain the same between pages (unless refreshed? or will i fix refresh issue);
function randomFromSeed() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}


$(document).ajaxSuccess(function(){

});


class _Grid {
	constructor(e) {
		this.element = e;
		this.cells = [];
	}
}
class Cell {
	constructor(e, p, dim) {
		this.parent  = p;
		this.width = (dim != undefined) ? dim.w : parseFloat($(e).css('width'));
		this.height = (dim != undefined) ? dim.h : parseFloat($(e).css('height'));
		this.x = (dim != undefined) ? dim.x : parseFloat($(e).css('left'));
		this.y = (dim != undefined) ? dim.y : parseFloat($(e).css('right'));
	}
}


function GRDInit(g){
	var grid = new _Grid($(g));

	var elements = $(g).children();

	for(var i = 0; i < elements.length; i++) {
		grid.cells.push(new Cell(elements[i], grid));
	}

}

function OldInit(g){

	// console.log("hello");
	var grid = $(g);
	var gLayout = [];
	seed = 1;


	var rem = parseFloat(getComputedStyle(document.documentElement).fontSize) * 2;
	var winWidth_PX = parseFloat(grid.parent().css('width'));
	var winHeight_PX = parseFloat(grid.parent().css('height'));


	console.log(winWidth_PX / 40);


	var paddingX = (winWidth_PX / rem) % 2;
	var paddingY = (winHeight_PX / rem) % 2;

	var gWidth = Math.ceil( (((winWidth_PX / rem) - paddingX) / 2) /2) * 2;
	var gHeight = Math.ceil( (((winHeight_PX / rem) - paddingY) / 2) /2 ) * 2;

	// paddingX = ((winWidth_PX / rem)) - gWidth;
	// paddingY = ((winHeight_PX / rem)) - gHeight;



	// console.log(winHeight_PX);

	for(var i = 0; i < gHeight * gWidth; i++)
	{
		gLayout[i] = 1;
	}

	// // // console.log((window.innerHeight / fontSize) - Math.floor(window.innerHeight / fontSize));	
	grid.css({
		'top': paddingY/2 + 'rem',
		'left': paddingX/2 + 'rem',
		'bottom': paddingY/2 + 'rem',
		'right': paddingX/2 + 'rem',

		'grid-template-columns': 'repeat('+gWidth+', 2rem)',
		'grid-template-rows': 'repeat('+gHeight+', 2rem)',
	});


	grid.children().each(function(){

		// var openIndex = 0;


		// while(!gLayout[openIndex])
		// {
		// 	openIndex++;
		// }

		// var coords;
		// for(var y = 1; y <= gHeight; y++)
		// {
		// 	var breakY = false;
		// 	for(var x = 1; x <= gWidth; x++)
		// 	{
		// 		var breakX = false;
		// 		// var index = IndexFromXY(x,y, gWidth);
		// 		var index = randomInt(0, gHeight * gWidth);


		// 		while(!gLayout[index])
		// 		{
		// 			index = randomInt(0, gHeight * gWidth);
		// 		}
		// 		if(gLayout[index]){
		// 			coords = [x, y];
		// 			breakX = breakY = true;
		// 		}

		// 		if(breakX)
		// 			break;
		// 	}

		// 	if(breakY)
		// 		break;
		// }

		// var width = Math.floor(gWidth / 2), height = Math.floor(gHeight /4);

		// for(var y = coords[1]; y <= coords[1] + height-1; y++)
		// {
		// 	for(var x = coords[0]; x <= coords[0] + width-1; x++)
		// 	{
		// 		gLayout[IndexFromXY(x, y, gWidth)] = 0;
		// 	}
		// }


		// $(this).css({
		// 	// 'grid-area': 'span ' + width + ' / span '+ height +' / '+ coords[0] +' / '+ coords[1],
		// 	'grid-area': 'span ' + height + ' / span '+ width +' / auto / auto',

		// });
	});

}


/* Map xy coords to index */
// get x ---- index % gridWidth
// get y ---- index / gridWidth
function XYFromIndex(i, width){
	return [Math.ceil(i % width), Math.ceil(i / width)];
}

/* Map index to xy coords */
// get index ---- x + width*y
function IndexFromXY(x,y, width){
	return x + width * y;
}

function gcd (a,b){
    if (b == 0)
        return a;

    return gcd(b, a % b);
}