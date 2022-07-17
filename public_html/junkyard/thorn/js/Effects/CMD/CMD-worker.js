
// self.importScripts('CMD.js');
self.importScripts('../Global/Random.js');
self.importScripts('../Global/Vector3.js');
self.importScripts('../Global/Math.js');



self.map = [];
self.mapTemp = [];



self.onmessage = function(e){
	var s = e.data.state;

	if (s === "init")
		self.Init(e.data.colCount, e.data.rowCount, e.data.cw, e.data.ch, e.data.t);
	else if(s === "show")
	{
		self.FillTemp();
		self.cmdUpdate = true;
		self.show = e.data.show;
	}
	else if(s === "wave")
		self.pool.Drop(e.data.point);
	else if(s === "prompt")
		self.prompt = e.data.prompt;
	else if(s === "input")
		self.Input(e.data.input);
	else if(s === "update")
		self.Update(e.data.dt);
	else if(s === "updateMap")
	{
		for(var i = 0; i < e.data.ndxs.length; i++)
		{
			var x = e.data.ndxs[i] % self.pool.w;
			var z = e.data.ndxs[i] / self.pool.w;

			// if(self.map[e.data.ndxs[i]] != null || e.data.ovr)
				// self.pool.Drop([{x:x,z:z,height:10}]);
				// self.map[e.data.ndxs[i]] = e.data.rep;
		}
		// self.UpdateMap(e.data.index, e.data.rep, e.data.val);
	}
		// self.UpdateMap(e.data.cells, e.data.char);
	else if(s === "enter")
		self.Enter(e.data.map);
}

self.Init = function(colCount, rowCount, cw, ch, t) {
	self.rowCount = rowCount;
	self.colCount = colCount;
	self.trailers = [];


	self.cmdUpdate = false;
	self.cmdPromptUpdate = false;
	self.cmdDraw = false;

	// var lfi = randomInt(0, (colCount * rowCount)/50);

	// for(var i = 0; i < lfi; i++)
	// {
	// 	self.trailers.push(randomInt(0, (colCount * rowCount) - 1));
	// }

	// constructor(w, h, cw, ch, maxy)
	self.pool = new Pool(colCount, rowCount, cw, ch, 10);

	self.pool.Init();

	for(var i = 0; i < colCount * rowCount; i++)
	{
		// if(self.map[i] != -1)
		if(t)
		{
			self.map[i] = -100;
			self.mapTemp[i] = -100;
		}
		else
		{
			self.map[i] = -3;
			self.mapTemp[i] = -3;
		}
	}
}

self.FillTemp = function() {

	// self.map = "";
	// self.mapTemp = "";
	// self.activeCellCount = 0;

	// for(var y = 0; y < self.rowCount; y++)
	// {
	// 	for(var x = 0; x < self.colCount; x++)
	// 	{
	// 		self.map += "0";
	// 		self.mapTemp += "0";
	// 		self.activeCellCount++;
	// 	}
	// }

	// // console.log(mtrxCellMap[5]);
	// self.UpdateMap(0, "p");
	// self.UpdateMap(self.colCount - 1,"p");
	// self.UpdateMap((self.colCount * self.rowCount) - self.colCount - 1, "p");
	// self.UpdateMap((self.colCount * self.rowCount) - 1, "p");

	// var lfi = randomInt(0, self.map.length/100);

	for(var i = 0; i < lfi; i++)
	{
		self.trailers.push(randomInt(0, self.map.length - 1));
	}
}


self.Show = function(isVisible) {

}

self.Prompt = function(){

}

self.Input = function(input){

}

self.Update2 = function(map){
	// console.log(map);
}



self.Update = function(dt){
	// if(self.cmdUpdate)
	// 	if(self.show)
	// 		self.Enter();
	// 	else
	// 		self.Exit();

	// if(self.cmdPromptUpdate)
	// 	if(self.prompt != null)
	// 		self.Prompt();

	var cc = self.colCount;
	var rc = self.rowCount;
	var charMap = [];
	// var opacityMap = [];

	self.activeCellCount = 0;
	self.emptyCellCount = 0;
	var mapTemp = [];


	self.pool.Update(dt);


	// for(var i = 0; i < (rc * cc) - 1; i++) 
	// {
	// 	// loop through each interference point
	// 	var cx = i % cc, cy = i / cc;
	// 	if(self.map[i] > 0)
	// 	{
	// 		charMap.push('0/0');


	// 		for(var j = 0; j < (rc * cc) - 1; j++)
	// 		{
	// 			var cxp = j % cc, cyp = j / cc;

	// 			var dist = Math.sqrt(Math.pow(cxp - cx, 2) + (Math.pow((cyp - cy), 2) * 1.9) );

	// 			var cv = dist + self.map[i], A = 10, D = .012, M = 2.4, L = 101;
	// 			var wave = A * Math.pow(Math.E/M,-(D * cv)) * Math.sin(L * Math.sqrt(A * Math.PI * cv) * D);

	// 			// if(dist < self.map[i])
	// 			// {
	// 				// self.mapTemp[i] = 10;
	// 				charMap.push(rands[0, randomInt(0, rands.length-1)] + '/' + wave);
	// 				// self.mapTemp[index] = c;
	// 			// }
	// 			// else
	// 			// {
	// 				// self.mapTemp[i] = 0;
	// 				// charMap.push('0/0');
	// 				// self.mapTemp[index] = c;
	// 			// }
	// 		}
	// 		self.map[i] = self.map[i] - .1;
	// 	}
	// }


	/*  Last before newest edition

	for(var i = 0; i < (rc * cc); i++) 
	{
		var avg = 0;
		var cps = 0;
		var cx = Math.floor(i % cc), cy = Math.floor(i / cc);

		for(var cyp = cy - 1; cyp <= cy + 1; cyp++)
		{
			for(var cxp = cx - 1; cxp <= cx + 1; cxp++)
			{
				if(!(cxp == cx && cyp == cy) && (cxp == cx || cyp == cy)) 
				{
					cps++;
					if((cxp >= 0 && cxp < cc-1) && (cyp >= 0 && cyp < rc-1))
					{
						var cellPos = self.map[cxp + (cc * cyp)];
						avg += cellPos;
					}
				}
			}
		}

		var prpCnst = .2;
		avg /= cps;

		var vel = ((avg - self.map[i]) * prpCnst);

		var z = (self.map[i] + vel);
		var o = (.5 + (z  * .005));


		// if(vel > 0)
		// else
			// vel = -self.map[i] * prpCnst;


		if(!(o >= 0) )
			var g = 0;

		// if(self.map[i] >= 100)
		// {
			// charMap.push(rands[0, randomInt(0, rands.length-1)] + '/' + 1);
			// self.mapTemp[i] = 100;
		// }
		// else
		// {
			charMap.push(rands[0, randomInt(0, rands.length-1)] + '/' + o);
			self.mapTemp[i] = z;
		// }

	}



	/*
	if(true)
	{
		for(var y = 0; y < rc; y++)
		{
			for(var x = 0; x < cc; x++)
			{
				self.activeCellCount++;
				var rands = 'MACHSEVNマッハ・セブン';

				var index = x + (cc * y);

				var c = self.map[index];

				// if (index % 7 == randomInt(1, 10) || index % 14 == randomInt(1, 10) || index % 21 == randomInt(1, 10) && c != ' ')
				// {
				// 	self.map[index] = -2;
				// 	c = -2;
				// 	// console.log(c);
				// }
				var surrounders = [];
				// var surrounders = [
				// 	(x - randomInt(0,5)) + (cc * y), 
				// 	x + (cc * (y + 1)),
				// 	x + (cc * (y + randomInt(0,5))),
				// 	(x + 1) + (cc * y), 
				// 	(x + randomInt(0,5)) + (cc * y), 
				// 	x + (cc * (y - 1)),
				// 	x + (cc * (y - randomInt(0,5))),
				// 	(x - 1) + (cc * y) 
				// 	];
				var yo = y;
				var xo = x;
				var gx = 0;
				var gy = 0;
				var range = 1;

				var highestCell = 0;
				var source = index;

				// find the source cell (highest cell in value) of cell surroundings
				// for(var yp = yo - 1; yp <= yo + 1; yp++)
				// {
				// 	for(var xp = xo - 1; xp <= xo + 1; xp++)
				// 	{
				// 		var cell = self.map[index];
				// 		if( xp >= 0 && xp < cc && yp >= 0 && yp < rc )
				// 		{
				// 			var ndx = xp + (cc * yp);
				// 			var edgeCell = self.map[ndx];
				// 			 // && !(xp == xo && yp == yo) 
				// 			if(edgeCell > cell)
				// 			{
				// 				// val = cell;
				// 				self.mapTemp[index] = edgeCell;
				// 				source = ndx;
				// 			}
				// 		}
				// 	}
				// }



				if(c == 10)
				{
					charMap.push(rands[0, randomInt(0, rands.length-1)] + '/10');
					self.mapTemp[index] = c;

					for(var yp = yo - 1; yp <= yo + 1; yp++)
					{
						for(var xp = xo - 1; xp <= xo + 1; xp++)
						{
							// var cell = self.map[index];
							if( xp >= 0 && xp < cc && yp >= 0 && yp < rc )
							{
								var ndx = xp + (cc * yp);
								var edgeCell = self.map[ndx];
					// 			 // &&  
								if(!(xp == xo && yp == yo) && edgeCell < Math.abs(c))
								{
					// 				// val = cell;
									if(xp == xo || yp == yo)
										self.mapTemp[ndx] = Math.abs(c) - 1;
									else
										self.mapTemp[ndx] = 0;
					// 				source = ndx;
								}
							}
						}
					}
				}
				else if(c == 0)
				{
					charMap.push('0/0');
					self.mapTemp[index] = c;
				}
				else if(c > 0)
				{
					charMap.push(rands[0, randomInt(0, rands.length-1)] + '/' + c);
					self.mapTemp[index] = c;

					for(var yp = yo - 1; yp <= yo + 1; yp++)
					{
						for(var xp = xo - 1; xp <= xo + 1; xp++)
						{
							// var cell = self.map[index];
							if(xp >= 0 && xp < cc && yp >= 0 && yp < rc )
							{
								var ndx = xp + (cc * yp);
								var edgeCell = self.map[ndx];

								// var cv = c - .5, A = 10, D = .012, M = .73, L = 40;
								// var wave = A * Math.pow(Math.E/M,-(D * cv)) * Math.sin(L * Math.sqrt(A * Math.PI * cv) * D);
					// 			 // &&  
								if(!(xp == xo && yp == yo) && edgeCell < c)
								{
					// 				// val = cell;
									if(xp == xo || yp == yo)
										self.mapTemp[ndx] = c - .5;
									else
										self.mapTemp[ndx] = self.mapTemp[ndx];
					// 				source = ndx;
								}
							}
						}
					}
				}
				// else
				// {
				// 	// self.mapTemp[source] = self.mapTemp[source] + 1;
				// 	self.mapTemp[index] = self.map
				// 	var cv = self.map[index], A = 10, D = .012, M = .73, L = 40;
				// 	var wave = A * Math.pow(Math.E/M,-(D * cv)) * Math.sin(L * Math.sqrt(A * Math.PI * cv) * D);

				// 	charMap.push(rands[0, randomInt(0, rands.length-1)] + '/' + wave);
				// 	// opacityMap.push();
				// 	// charMap.push([self.map[index], 10]);
				// }

				self.mapTemp[index] = self.map[index];
			}
		}
	}
	*/

	// self.map = self.mapTemp;

	if(self.activeCellCount == 0)
	{
		// self.cmdUpdate = false;
		// self.postMessage({state:"complete"});
	}

	if(self.activeCellCount < self.map.length/100)
	{
		// self.cmdPromptUpdate = true;
		// self.postMessage({state:"cellsFilled"});
	}

	// if(self.emptyCellCount == 0)
	// 	self.postMessage({state:"cellsFilled"});

	// var b = new ArrayBuffer((charMap.length * 4))

	// self.postMessage({state:"draw", map:charMap}, [b]);

}



self.UpdateMap = function(cells, val) {
	// for(var i = 0; i < cells.length; i++)
	// {
	// 	self.map[cells[i]] = val;
	// }

}

self.clearToggle = true;

self.Enter = function(map){
		// var rands = 'マッハ・セブンMACHSEVNマッハ・セブンMACHSEVNマッハ・セブンMACHSEVNマッハ・セブンMACHSEVNマッハ・セブンMACHSEVNマッハ・セブンMACHSEVNマッハ・セブンMACHSEVNマッハ・セブンMACHSEVNマッハ・セブンMACHSEVNマッハ・セブンMACHSEVNマッハ・セブンMACHSEVNマッハ・セブンMACHSEVNマッハ・セブン           ';
		// var rands = 'マッハ・セブンMACHSEVNマッハ・セブンMACHSEVN ';

		var cc = self.colCount;
		var rc = self.rowCount;
		self.mapTemp = map;

		self.activeCellCount = 0;
		self.emptyCellCount = 0;

		var counter = 2000;


		for(var y = 0; y < rc; y++)
		{
			for(var x = 0; x < cc; x++)
			{
				self.activeCellCount++;

				var index = x + (cc * y);

				var rands = 'マッハ・セブンMACHSEVNマッハ・セブンMACHSEVNマッハ・セブンMACHSEVNマッハ・セブンMACHSEVN   ';

				if(self.emptyCellCount == 0 && self.clearToggle)
				{
					self.postMessage({state:'startClear'});
				}
				// for(var i = 0; i < self.trailers.length; i++)
				// {
				// }



				var c = map[index];

				if (index % 7 == randomInt(1, 10) || index % 14 == randomInt(1, 10) || index % 21 == randomInt(1, 10) && c != ' ')
				{
					rands = 'マッハ・セブンMACHSEVN';
				}

				if(c == 'c')
				{


					// var c1 = (x - 1) + (cc * y), 
					// 	c2 = (x + 1) + (cc * y), 
					// 	c3 = x + (cc * (y - 1)),
					// 	c4 = x + (cc * (y + 1)),
					// 	c5 = (x - randomInt(2,10)) + (cc * y), 
					// 	c6 = (x + randomInt(2,10)) + (cc * y), 
					// 	c7 = x + (cc * (y - randomInt(2,10))),
					// 	c8 = x + (cc * (y + randomInt(2,10)));

					// if(map[c1] == ' ')
					// {
					// 	self.UpdateMap(c1, 'c', 1);
					// }
					// if(map[c2] == ' ')
					// {
					// 	self.UpdateMap(c2, 'c', 1);
					// }
					// if(map[c3] == ' ')
					// {
					// 	self.UpdateMap(c3, 'c', 1);
					// }
					// if(map[c4] == ' ')
					// {
					// 	self.UpdateMap(c4, 'c', 1);
					// }
					// if(map[c5] == ' ')
					// {
					// 	self.UpdateMap(c5, 'c', 1);
					// }
					// if(map[c6] == ' ')
					// {
					// 	self.UpdateMap(c6, 'c', 1);
					// }
					// if(map[c7] == ' ')
					// {
					// 	self.UpdateMap(c7, 'c', 1);
					// }
					// if(map[c8] == ' ')
					// {
					// 	self.UpdateMap(c8, 'c', 1);
					// }
				}
				else if(c == 'p')
				{
					if(x == 0 || x == cc-1)
					{
						if(y < rc/2)
							self.UpdateMap(x + (cc * (y + 2)), 'p', 1);
						else
							self.UpdateMap(x + (cc * (y - 2)), 'p', 1);
					}

					if(y == 0 || y == rc - 1)
					{
						if(x < cc/2)
							self.UpdateMap((x + 2) + (cc * y), 'p', 1);
						else
							self.UpdateMap((x - 2) + (cc * y), 'p', 1);
					}


					// if(count == (mColCount-1) * (mRowCount - 1)
					// {
					// 	mtrxTransition = false;
					// // 	// UpdateMap(x + (mColCount * y), ' ');
					// }
					var c = rands[randomInt(0, rands.length-1)];
					self.UpdateMap(index, c, 1);

				}
				else if (c == 'M')
				{


					var c1 = (x - 1) + (cc * y), 
						c2 = (x + 1) + (cc * y), 
						c3 = x + (cc * (y - 1)),
						c4 = x + (cc * (y + 1)),
						c5 = (x - randomInt(2,10)) + (cc * y), 
						c6 = (x + randomInt(2,10)) + (cc * y), 
						c7 = x + (cc * (y - randomInt(2,10))),
						c8 = x + (cc * (y + randomInt(2,10)));

					if(map[c1] == '0')
					{
						self.UpdateMap(c1, 'p', 1);
					}
					if(map[c2] == '0')
					{
						self.UpdateMap(c2, 'p', 1);
					}
					if(map[c3] == '0')
					{
						self.UpdateMap(c3, 'p', 1);
					}
					if(map[c4] == '0')
					{
						self.UpdateMap(c4, 'p', 1);
					}
					if(map[c5] == '0')
					{
						self.UpdateMap(c5, 'p', 1);
					}
					if(map[c6] == '0')
					{
						self.UpdateMap(c6, 'p', 1);
					}
					if(map[c7] == '0')
					{
						self.UpdateMap(c7, 'p', 1);
					}
					if(map[c8] == '0')
					{
						self.UpdateMap(c8, 'p', 1);
					}


					var c = rands[randomInt(0, rands.length -1)];
					self.UpdateMap(index, c, 1);
				}
				else if(c == ' ')
				{
					self.activeCellCount--;

				}
				else if(c == '0')
				{
					var c1 = (x - 1) + (cc * y), 
						c2 = (x + 1) + (cc * y), 
						c3 = x + (cc * (y - 1)),
						c4 = x + (cc * (y + 1));

					if(map[c1] == ' ' || map[c2] == ' ' || map[c3] == ' ' || map[c4] == ' ')
					{
						var c = rands[randomInt(0, rands.length -1)];
						self.UpdateMap(index, c, 1);
					}
					self.emptyCellCount++;
				}
				else
				{
					var c = rands[randomInt(0, rands.length -1)];
					self.UpdateMap(index, c, 1);
				}


				counter++;
				if(counter >= 1000 && !self.emptyCellCount > 0)
				{
					counter = 0;
					self.postMessage({state:"showPage"});
				}

			}
		}


		self.map = self.mapTemp;


		// console.log(mtrxCellMapTemp);

		if(self.activeCellCount == 0)
		{
			// self.cmdUpdate = false;
			self.postMessage({state:"complete"});
		}

		// if(self.activeCellCount < mapTemp.length/100)
		// {
		// 	// self.cmdPromptUpdate = true;
		// 	// self.postMessage({state:"cellsFilled"});
		// }

		if(self.emptyCellCount == 0)
			self.postMessage({state:"cellsFilled"});

		self.postMessage({state:"draw", map:self.map}, [str2ab(self.map)]);
}

self.Exit = function(){

}

self.Draw = function(){
	// self.postMessage({state:"clear"});
	// for(var i = 0; i < self.map.length - 1; i++)
	// {
		// var c = self.map[i];
		// self.postMessage({state:"draw", map:self.map});
		// self.postMessage({state:"drawi", i:i, c:c});

	// }

}

self.UpdateMap = function(index, rep, temp = 0){
	if(temp)
		self.mapTemp = self.mapTemp.replaceAt(index, rep);
	else
		self.map = self.map.replaceAt(index, rep);
}

function str2ab(str) {
  var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function flt2ab(arr)
{
  var buf = new ArrayBuffer(arr.length * 4); // 4 bytes for each float
  var bufView = new Float32Array(buf);
  for(var i = 0, arrLen = arr.length; i < arrLen; i++) {
    bufView[i] = arr[i];
  }
  return buf;
}

var rands = 'MACHSEVNマッハ・セブン';

class Pool {
	constructor(w, h, cw, ch, maxy)
	{
		this.maxy = maxy;
		this.w = w;
		this.h = h;
		this.ch = ch;
		this.cw = cw;

		this.res = 1;

		this.dx = this.w / cw;
		this.dy = this.h / ch;


		this.dx2 = this.dx * this.dx;
		this.dz2 = this.dy * this.dy;

		this.C = 2;

		this.CX = ((this.cw) / (this.ch * this.cw))*this.C;
		this.CZ = (this.CX/this.cw)/this.C;


		this.sigmax = .08;
		this.sigmaz = .2;


		this.maxdt = ((this.w * this.h) / (this.ch * this.cw));

		// this.damping = .003;
		this.damping = .00001;


		this.verts = [];

		this.darkMap = [];

		this.lastDrop = [-10,-10];
	}


	ndx(x,z) 
	{
		return x + (this.w) * z;
	}

	Init()
	{
		for(var i = 0; i < this.w * this.h; i++)
		{
			this.verts.push(
				{y:0,
				 v:0, 
				 a:0});

			this.darkMap.push(0);
		}

		
		// console.log(this.CX/this.ch, this.CZ);
		console.log(this.maxdt);

	}

	Update(deltaTime)
	{
		var dt = deltaTime  * 1000;

		var darmMap = [];

		if(dt > 100)
			dt = 100;

		// while(dt > 0)
		// {
			if(dt > this.maxdt)
				dt = this.maxdt;
			else
				dt = dt;

		// 	dt -= 12;
		// }
		for(var z = 0; z < this.h; z++)
		{
			for(var x = 0; x < this.w; x++)
			{
				var i = this.ndx(x,z);

				var xpy = 0, xny = 0, zpy = 0, zny = 0;



				// if((x < 50 || x > 60) && (z < 20 || z > 40))
				// {
					if(x > 0)
						xpy = this.verts[this.ndx(x-1,z)].y;
					if(x < this.w - 1)
						xny = this.verts[this.ndx(x+1,z)].y;
					if(z > 0)
						zpy = this.verts[this.ndx(x,z-1)].y;
					if(z < this.h - 1)
						zny = this.verts[this.ndx(x,z+1)].y;
				// }




				var xp = this.ndx(x-1,z);
				var xn = this.ndx(x+1,z);
				var zp = this.ndx(x,z-1);
				var zn = this.ndx(x,z+1);

           		if(this.verts[i] == undefined)
           			var t = 'u';

           		var d2x = 0, d2z = 0;

					// d2x = (this.verts[xn].y - 2 * this.verts[i].y + this.verts[xp].y) / this.dx2;
           			// d2z = (this.verts[zn].y - 2 * this.verts[i].y + this.verts[zp].y) / this.dz2;
           			if(this.verts[i] == -10)
           			{
						d2x = 0;
	           			d2z = 0;
           			}
           			else
           			{
						d2x = ((xny - 2 * this.verts[i].y + xpy) / this.dx2) * this.CX;
	           			d2z = ((zny - 2 * this.verts[i].y + zpy) / this.dz2) * this.CZ;
           			}


           		this.verts[i].a =  ( d2x + d2z);
           		this.verts[i].a += -this.damping * this.verts[i].v;

           		this.verts[i].v +=  dt * this.verts[i].a;

           		this.verts[i].newy = this.verts[i].y + this.verts[i].v * dt;

           		if(this.damping < .001)
           			this.damping += .00025;


			}
		}

		var charMap = [];

		for(var z = 0; z < this.h; z++)
		{
			for(var x = 0; x < this.w; x++)
			{
				var i = this.ndx(x, z);
				this.verts[i].y = this.verts[i].newy;

				// charMap.push(rands[0, randomInt(0, rands.length-1)] + '/' + this.verts[i].y.toFixed(2));
				// charMap.push(0 + '/' + this.verts[i].y.toFixed(2));
				var val = this.verts[i].y;
				// charMap.push(0 + '/' +  (.5 + (val.toFixed(2) * .05)) );
				if(val > 0)
           			this.darkMap[i] = (this.darkMap[i] + val * .5);

				// charMap.push(rands[randomInt(0,Math.round((rands.length-1) * val.toFixed(2)) )] + '/' +  val.toFixed(2) + '/' + this.darkMap[i].toFixed(2));

				charMap.push(rands[randomInt(0, rands.length-1)] + '/' +  val.toFixed(1) + '/' + this.darkMap[i].toFixed(1));

				// charMap.push(0 + '/' +  val.toFixed(2) );


			}
		}


		var b = new ArrayBuffer((charMap.length * 4))

		self.postMessage({state:"draw", map:charMap}, [b]);
	}

	Drop(point)
	{
		// console.log("drop");

		if( point.x != this.lastDrop[0] || point.z != this.lastDrop[1])
		{
			for(var i = 0; i < this.verts.length; i++)
			{
				var x = (i % this.w-1) - point.x, z = (i/this.w-1) - point.z;

				var height = (point.height || 1) * this.maxy;

				if(point.sig <= 1 || point.sig == null)
					this.verts[i].y += height * Math.exp(-this.sigmax * x * x) * Math.exp(-this.sigmaz * z * z);
				else 
					this.verts[i].y += height * Math.exp((-this.sigmax * point.sig) * x * x) * Math.exp((-this.sigmaz * point.sig) * z * z);

				var v = this.verts[i];

				if(v.x == 0 || v.x == this.w || v.z == 0 || v.z == this.h)
					this.verts[j].y = 0;
			}
			this.lastDrop = [point.x, point.z];
		}

		if(point.sig <= 1)
			this.damping = .0001;
		else
			this.dampint = .001;
	}
}