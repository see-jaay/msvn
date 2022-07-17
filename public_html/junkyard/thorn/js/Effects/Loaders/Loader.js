



class LoaderCell{
	constructor(x, y)
	{
		this.above = null;
		this.right = null;
		this.left = null;
		this.below = null;
		this.pos = {x: x, y: y};
		this.parent;

	}

	Init(){

		var PV = document.createElementNS("http://www.w3.org/2000/svg", "path");
		var PH = document.createElementNS("http://www.w3.org/2000/svg", "path");

		var group = document.createElementNS("http://www.w3.org/2000/svg", "g");

		PV.setAttributeNS(null, "d", 'M'+ this.pos.x +','+ (this.pos.y - 5) +' L'+ this.pos.x +','+ (this.pos.y + 5));
		PV.setAttributeNS(null, "stroke", $(':root').css('--text-color'));
		PV.setAttributeNS(null, "stroke-width", ".75px");

		PH.setAttributeNS(null, "d", 'M'+ (this.pos.x - 5) +','+ this.pos.y +' L'+ (this.pos.x + 5) +','+ this.pos.y);
		PH.setAttributeNS(null, "stroke", $(':root').css('--text-color'));
		PH.setAttributeNS(null, "stroke-width", ".75px");


		group.appendChild(PV);
		group.appendChild(PH);

		this.element = group;


		this.parent.element.append(group);

		// $('#load_inner').append(
		// 	'<g class="g">'+
		// 		'<path class="x" d="M'+ this.pos.x +','+ (this.pos.y - 5) +' L'+ this.pos.x +','+ (this.pos.y + 5) +'"></path>'+
		// 		'<path class="x" d="M'+ (this.pos.x - 5) +','+ this.pos.y +' L'+ (this.pos.x + 5) +','+ this.pos.y +'"></path>'+
		// 	'</g>'
		// );

		// this.element = document.getElementById('grid-'+this.pos.x+'-'+this.pos.y);
	}

	AddAdjacents() {

	}

	ShowAdjacents() {

	}
}


class LoaderGrid{
	constructor(width, height){
		this.cells = [];
		this.element;
		this.width = width;
		this.height = height;
		this.cellsize = {w:50, h:50};
	}


	AddCell()
	{
		var cell = new LoaderCell((this.cells.length % this.width) * this.cellsize.w, Math.floor(this.cells.length / this.width) * this.cellsize.h);
		cell.parent = this;
		this.cells.push(cell);
	}

	Init()
	{
		this.element = $('#load_inner');
		for(var i = 0; i < this.height * this.width; i++){
			this.AddCell();
		}

		for(var i = 0; i < this.cells.length; i++)
		{
			this.cells[i].Init();
		}
		this.isInit = true;
	}

	GetCell(x, y)
	{
		return this.cells[( y * this.width ) + x];
	}

	GetCellElement(x, y)
	{
		return $('#load_inner > g:nth-child('+ (( y * this.width ) + x) +')');
	}

	Update(dt){
		for(var i = 0; i > this.cells.length; i++){
			var pos = this.cells[i].pos;

			this.GetCellElement(pos.x, pos.y).css('opacity', this.GetCellElement(pos.x-1, pos.y).css('opacity')/2);
		}
	}
}


var grid;
var gridInit;
function InitLoader(){
	grid = new LoaderGrid(32,10);

	grid.Init();

	gridInit = true;
}

function ShowLoader(){

	// grid.GetCellElement(10,5).css('opacity', 1);

	// $('#load_flyout').css({
	// 	'opacity': 1,
	// 	'z-index': 10
	// });
}

function HideLoader(){
	// $('#load_flyout').css({
	// 	'opacity': 0,
	// 	'z-index': -10
	// });

}

function UpdateLoader(dt) {
	if(gridInit)
		grid.Update(dt);
}