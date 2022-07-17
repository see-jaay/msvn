

self.importScripts('Vine.js');
self.importScripts('Node.js');
self.importScripts('../../Global/Random.js');
self.importScripts('../../Global/Vector3.js');
self.importScripts('../../Global/Math.js');
self.importScripts('../../Global/utilities.js');

var vines = [];

self.onmessage = function(e){

	var s = e.data.state;

	if(s === "init")
		self.InitializeVines(e.data.vines);
	else if(s === "init2")
		self.InitializeVines2(e.data.vines);
	else if(s === "update")
		self.Update(e.data.dt);
	else if(s === "updateCanv")
		self.UpdateCanvas(e.data.index, e.data.cvx1, e.data.cvx2, e.data.cvy1, e.data.cvy2);
	else if(s === "applywind")
		self.ApplyWind(e.data.x, e.data.y);
	// else if(s === "reinit")
		//self.ReInit(e.data.positions)
}

self.UpdateCanvas = function(i, cvx1, cvx2, cvy1, cvy2){
	// vines[i].cvLim = [cvx1, cvx2, cvy1,  cvy2];
}

self.InitializeVines2 = function(localVines){
	for(var i = 0; i < localVines.length; i++)
	{
		var v = localVines[i];
		var stroke = localVines[i][0];
		var weight = localVines[i][1];
		var pos = localVines[i][2];
		var angle = localVines[i][3];
		var deviation = localVines[i][4];


		// console.log(angle);

		// console.log(pos);

		CreateVine(new Vine(10, 300, weight, 400, stroke, pos, angle, deviation));

		// vines[i].SetSvg(v[6][0], v[6][1], v[6][2], v[6][3], v[6][4]);

		// vines[i].transforms = true;

		vines[i].Init();
	}

	// self.postMessage({state:"init", vines:vines});
}

self.CreateVine = function(vine){
	vine.index = vines.length;
	vines.push(vine);
}

self.Update = function(dt){

	wForce = randomFlt(1,10);

	if(dt > .01)
	{
		dt = .001;
	}

	// dt *= .25;

	var splines = [], opacities = [], sw = [], blur = [], ts = [];

	for(var i = 0; i < vines.length; i++)
	{
		if(vines[i].isInit)
		{
			// vines[i].ApplyWind(wForce, dt);
			// vines[i].ApplyWind(wForce * randomFlt(-.5,.1), dt);
			vines[i].Update(dt);
			// splines[i] = vines[i].splines;
			// ts[i] = vines[i].ts;
			// console.log(vines[i].ts);
			// opacities[i] = vines[i].opacity;
			// sw[i] = vines[i].strokeWidth;
			// blur[i] = vines[i].blur;
			var b = new ArrayBuffer((vines[i].splines.length + vines[i].ts.length));

			self.postMessage({state:"draw2", index: i, splines:vines[i].splines, thorns:vines[i].ts}, [b]);

		}
		//self.postMessage({state:"update", index: i, paths:vines[i].paths, transforms:vines[i].transforms, verts: vines[i].V.length});
		// console.log(vines[i].transforms);
	}
	// console.log(ts);
	// self.postMessage({state:"draw", splines:splines, thorns:ts, opacity:opacities, strokeWidth: sw, blur:blur });
	// self.postMessage({state:"update",vines:vines, dt:dt});


}

self.ApplyWind = function(x, y){
	for(var i = 0; i < vines.length; i++)
	{
		if(vines[i].isInit)
		{
			if(randomInt(0, 100) > 25)
				vines[i].ApplyWind(x/randomFlt(25,1000));
			// vines[i].ApplyWind(wForce * randomFlt(-.5,.1), dt);
			// vines[i].Update(dt);
			// splines[i] = vines[i].splines;
			// ts[i] = vines[i].ts;
			// console.log(vines[i].ts);
			// opacities[i] = vines[i].opacity;
			// sw[i] = vines[i].strokeWidth;
			// blur[i] = vines[i].blur;
			// var b = new ArrayBuffer((vines[i].splines.length + vines[i].ts.length));

			// self.postMessage({state:"draw2", index: i, splines:vines[i].splines, thorns:vines[i].ts}, [b]);

		}
		//self.postMessage({state:"update", index: i, paths:vines[i].paths, transforms:vines[i].transforms, verts: vines[i].V.length});
		// console.log(vines[i].transforms);
	}
}

self.ReInit = function(positions){
	for(var i = 0; i < vines.length; i++){
		vines[i].ReInit(positions[i]);
	}
}
