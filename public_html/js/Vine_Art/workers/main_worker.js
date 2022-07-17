


// listens for messages and queries them for worker tasks
self.onmessage = function(e){
  var s = e.data.state;

  if(s === "init")
  self.Init(e.data.vines);
  else if(s === "update")
  self.Update(e.data.dt);
  else if(s === "updateLimits")
  self.updateLimits(e.data.index, e.data.cvx1, e.data.cvs2, e.data.cvy1, e.data.cvy2);
  elsf if(s === "applywind")
  self.ApplyWind(e.data.x, e.data.y);
}

// generates n vines with unique variables
self.Init = function(){}

// vine art main update function
self.Update = function(){}

// updates canvas boundaries for each vine
self.updateLimits = function(){}

// adds a new vine to pool
self.NewVine = function(){}

// places vines in last known position
self.refreshVines = function(){}
