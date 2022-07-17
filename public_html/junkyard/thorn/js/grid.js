var fontSize, winWidth, winHeight, paddingX, paddingY;
var pageWidthRem, pageWidthPx, pageHeightRem, pageHeightPx; 
var unit;



function parseSpanCode(c,go, x)
{
	if(c == 'f')
		return 0;
	else if(c == 'l' && x)
		return go.gridWidth - 1;
	else if(c == 'l' && !x)
		return go.gridHeight - 1;
	else
		return c * go.unitSize;
	
}

function parseSpan(span, go){
	if (span != undefined)
	{
		var x, y, w, h;

		var xSpan = span.split('/')[0];
		var ySpan = span.split('/')[1];

		var xSpanStart = parseSpanCode(xSpan.split('-')[0],go,1);
		var xSpanEnd = parseSpanCode(xSpan.split('-')[1],go,1);
		var ySpanStart = parseSpanCode(ySpan.split('-')[0],go,0);
		var ySpanEnd = parseSpanCode(ySpan.split('-')[1],go,0);

		x = parseSpanCode(xSpanStart);
		y = parseSpanCode(ySpanStart);
		w = xSpanEnd - xSpanStart + 1;
		h = ySpanEnd - ySpanStart + 1;






		//BRO JUST DO THIS SHIT MANUALLY, THERES NO NEED TO WASTE TIME ON GENERATED EFFECTS
		//WHEN YOU CAN JUST PLACE EACH OBJECT MANUALLY FUCK IT!!! NO ONE WILL NOTICE LMAO






		// return [x,y,w,h];
		return {x:x, y:y, w:w, h:h};
	}
	else
		return 'finish span parsing';
}

class Grid {
	constructor(element, u){
		this.element = element;
		this.unitSize = u;
		this.x = 0;
		this.y = 0;
		// [x-span]/[y-span]  0-0/0-4
		this.map = [];
	}


	ArrangeElements(){
		this.gridWidth = Math.floor(this.element.width() / unit);
		// this.gridWidth = ((this.element.width()/fontSize) % this.unitSize);
		
		this.gridHeight = Math.floor(this.element.height() / unit);

		if(this.element.css('left') == 'auto')
			this.x = 0;
		else
			this.x = parseInt(this.element.css('left'))/fontSize;

		if(this.element.css('top') == 'auto')
			this.y = 0;
		else 
			this.y = parseInt(this.element.css('top'))/fontSize;

		// console.log(this.element.width());
		var go = this;
		this.element.children().not('nge').each(function(){
			var $child = $(this);
			var spanStr = $child.css('--span');
			var span = parseSpan(spanStr, go);
			go.map.push(spanStr);

			console.log(go.y);

			$child.css({
				'left': go.x + span.x+'rem',
				'top': go.y + span.y +'rem',
				'width': span.w + 'rem',
				'height': span.h + 'rem'
			});


			// console.log(span);
		});
	}

	AddElements(e){
		for(var element of e)
		{
			element.parent = this;
			this.elements.push(element);
		}
	}
}


function CalcUnits() {
	fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
	winWidth = window.innerWidth;
	winHeight = window.innerHeight;
	paddingX = (winWidth / fontSize) - Math.floor(winWidth / fontSize);
	paddingY = (winHeight / fontSize) - Math.floor(winHeight / fontSize);

	pageWidthRem = (winWidth / fontSize - paddingX); //rem
	pageWidthPx = (winWidth / fontSize - paddingX) * fontSize; //px
	pageHeightRem = (winHeight / fontSize - paddingY); //rem
	pageHeightPx = (winHeight / fontSize - paddingY) * fontSize; //px

	unit = fontSize;
}


var grids = [];
var gridObjs = [];

function Grid_Update() {
	// $('.grd').not('.grd-set').each(function(){
		// CalcUnits();
		// $this = $(this);
		// var left = parseInt($this.css('--grd-x'));
		// var top = parseInt($this.css('--grd-y'));
		// var width = parseInt($this.css('--grd-w'));
		// var height = parseInt($this.css('--grd-h'));

		// console.log(left);

		// $this.css({
		// 	'position': 'absolute',
		// 	'left': (left * unit) + 'px',
		// 	'top': (top * unit) + 'px',
		// 	'width': (width * unit) + 'px',
		// 	'height': (height * unit) + 'px'
		// });

		// $this.addClass('grd-set');
	// });
	SetGrids();
}

function SetGridRec($obj)
{
	// CalcUnits();
	var elements = [];

	$obj.children().not('.nge').each(function(){
		$child = $(this);

		$child.css('position', 'absolute');

		var pos = $child.css('--gp').split('/');
		var dim = $child.css('--gd').split('/');


		var ex = pos[0];
		var ey = pos[1];
		var ew = dim[0];
		var eh = dim[1];

		var e = new Grid($child, ex, ey, ew, eh);
		e.AddElements(SetGridRec($child));
		elements.push(e);
	});

	return elements;

}
function SetGrids(){
	$('.grd').not('.grd-set').each(function(){

		CalcUnits();

		$this = $(this);

		// var x = parseFloat($this.css('--grd-x'));
		// var y = parseFloat($this.css('--grd-y'));
		// var w = parseFloat($this.css('--grd-w'));
		// var h = parseFloat($this.css('--grd-h'));

		var u = parseInt($this.css('--unit'));

		var g = new Grid($this, u);

		// $this.children().not('.nge').each(function(){
		// 	$t = $(this);
		// 	var ex = $t.css('--g-x');
		// 	var ey = $t.css('--g-y');
		// 	var ew = $t.css('--g-w');
		// 	var eh = $t.css('--g-h');

		// 	var e = new Grid($t, ex, ey, ew, eh);


		// 	e.parent = $this;
		// 	g.AddElement(e);
		// });

		gridObjs.push(g);
		// gridObjs.concat(SetGridRec($this));


		//gridObjs.push(g);
		g.ArrangeElements();

		$this.addClass('grd-set');
		console.log(gridObjs);
	});
}

function ResetGrids(){
	gridObjs = [];
	$('.grd').each(function(){
		$(this).removeClass('grd-set');
	});
}

// function FindElementsWithCSS(css){
// 	var elements = [];
// 	function Find($obj, css){
// 		$obj = $obj || $(document.documentElement);

// 	    $obj.children().each(function(){
// 	    	var $this = $(this);

// 	        if (typeof $this == "object" && $this !== null && $this.css(css) != undefined)
// 	        {
// 	        	elements.push($this);
// 	            Find($this, css);
// 	        }
// 	        else
// 	            Find($this, css);
// 	    });
// 	}

// 	Find(null, css);
// 	return elements;
// }
