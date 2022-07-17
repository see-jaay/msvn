var textAnimReq;
var deltaTime, lastUpdate;

var rollEffect = new Roll_Effect(), shiftEffect =  new Shift_Effect();

// var cell = new Cell();


$(document).ready(function(){

});

window.addEventListener('load', (event) => {

	var to = new TextObject('#center_text', "center-text");


	to.Init();

	rollEffect.AddObj(to);
	shiftEffect.AddObj(to);

	// console.log(to);

	textAnimReq = requestAnimationFrame(TextAnim);


	// cell.Shuffle('a');

});


function TextAnim(now)
{
	deltaTime = (((now - lastUpdate) / perfectFrameTime)/1000);
	lastUpdate = now;

	// cell.Update(deltaTime);

	textAnimReq = requestAnimationFrame(TextAnim);

	rollEffect.Update(deltaTime * animateSpeed);
	shiftEffect.Update(deltaTime * animateSpeed);
}

