

self.importScripts('Vine-worker.js');
self.importScripts('Node-worker.js');
self.importScripts('../../Global/Random.js');
self.importScripts('../../Global/Vector3.js');
self.importScripts('../../Global/Math.js');


var vines = [];

self.onmessage = function(e){

	var s = e.data.state;

	if(s === "init") 
		self.InitializeVines(e.data.vines);
	else if(s === "update")
		self.Update(e.data.dt);
	else if(s === "reinit")	
		self.ReInit(e.data.positions)
}

self.InitializeVines = function(localVines){
	for(var i = 0; i < localVines.length; i++)
	{
		var v = localVines[i];
		CreateVine(new Vine(v[0], v[1], v[2], v[3], v[4]));

		vines[i].SetSvg(v[6][0], v[6][1], v[6][2], v[6][3], v[6][4]);

		vines[i].transforms = true;

		vines[i].Init();
	}

	self.postMessage({state:"init", vines:vines});
}

self.CreateVine = function(vine){
	vine.index = vines.length;
	vines.push(vine);
}

self.Update = function(dt){

	wForce = randomFlt(5,30);

	if(dt > .01)
	{
		dt = .001;
	}

	for(var i = 0; i < vines.length; i++)
	{
		if(vines[i].isInit)
		{
			vines[i].ApplyWind(wForce);
			vines[i].ApplyWind(wForce * randomFlt(-.1,.25));
			vines[i].Update(dt);
		}
		self.postMessage({state:"update", index: i, paths:vines[i].paths, transforms:vines[i].transforms, verts: vines[i].V.length});
	}

	// self.postMessage({state:"update",vines:vines, dt:dt});


}

self.ReInit = function(positions)
{
	for(var i = 0; i < vines.length; i++){
		vines[i].ReInit(positions[i]);
	}
}