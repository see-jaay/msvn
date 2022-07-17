self.onmessage = function(e) 
{
	//transition name

	var s = e.data.state;

	if(s === 'update')
		self.Update(e.data.dt);
	else if(s === 'cmdInit')
	 	self.cmdInit(e.data.col, e.data.row);
	else if(s === 'cmdSet')
		self.cmdSet(e.data.map);
	else if(s === 'cmdStart')
		self.cmd_Transition = true;
	// else if(s === 'vine-swipe')
	// 	// self.vineSwipe = true;
	// else if(s === 'fade-in')
	// 	try {
	// 		self.fadeIn(e.data.time);
	// 	} catch(err) {
	// 		// console.log(err.message);
	// 	}
	// else if(s === 'slide')
	// 	try {
	// 		self.slide(e.data.direction);
	// 	}
	// 	catch (err) {
	// 		// console.log(err.message);
	// 	}
}

self.data = null;

self.cmd_Transition = true;
self.vs_Transition = false;

self.Update = function(dt) {

	if(self.cmd_Transition && self.cmdMap)
		self.CMD();
	if(self.cmd_update)
		self.CMD();
	else if(self.vs_Transition)
		self.vineSwipe(dt);
	// else
		// console.log('update');
}

self.cmdInit = function(colCount, rowCount) {
	self.rowCount = rowCount;
	self.colCount = colCount;
	self.trailers = [];
}

self.cmdSet = function(map) {
	self.cmdMap = map;
}

self.CMD = function() {
	// self.data = null;
		console.log(self.data);
	// when complete
		// self.postMessage({state:'transitionComplete'});

	// self.postMessage({state:'draw', transition:'cmd', map:map}, [map]);
}

self.vineSwipe = function(vineData) {

}

self.transitionComplete = function() {

}

