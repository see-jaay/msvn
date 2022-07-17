

var main;
var mainLeft, mainRight;
var xOffset, yOffset;
var scalexInit, scaleyInit, widthInit;
var wis = [];

function Dsk_Init(){
	main = $('#cat_slts_wrapper');
	mainLeft = parseInt(main.position().left);
	mainTop = parseInt(main.position().top);
	$('#cat_slts_content').mousemove(function(e){
		MoveWindow(e.pageX, e.pageY);
		ScaleWindow(e.pageX, e.pageY, e.movementX, e.movementY);
	});

	$('.window-inner .nav').each(function(index){

		$(this).mousedown(function(e){
			xOffset = (parseInt(e.pageX) - mainLeft) - $(this).parent().parent().position().left;
			yOffset = (parseInt(e.pageY) - mainTop * 2) - $(this).parent().parent().position().top;

			$(this).parent().parent().addClass('moveable');
		});
		$(this).mouseup(function(){
			$(this).parent().parent().removeClass('moveable');
		});
	});

	$('.window-wrapper').each(function(index){
		wis.push(index);

		$(this).mousedown(function(e){
			IndexWindows(index);
		});
	});

	$('.window-scaleright').each(function(){
		$(this).mousedown(function(e){
			xOffset = (parseInt(e.pageX) - mainLeft) - $(this).parent().parent().position().left;
			yOffset = (parseInt(e.pageY) - mainTop * 2) - $(this).parent().parent().position().top;
			$(this).parent().parent().parent().addClass('scale-r');
		});

		$(this).mouseup(function(){
			$(this).parent().parent().parent().removeClass('scale-r');
		});
	});

	$('.window-scaletop').each(function(){
		$(this).mousedown(function(e){
			yOffset = 30;
			$(this).parent().parent().parent().addClass('scale-t');
		});

		$(this).mouseup(function(){
			$(this).parent().parent().parent().removeClass('scale-t');
		});
	});

	$('.window-scaleleft').each(function(){
		$(this).mousedown(function(e){
			xOffset = 5;
			scalexInit = parseInt(e.pageX) - xOffset;
			widthInit = parseInt($(this).parent().parent().parent().css('width'));

			$(this).parent().parent().parent().addClass('scale-l');
		});

		$(this).mouseup(function(){
			$(this).parent().parent().parent().removeClass('scale-l');
		});
	});

	$('.window-scalebottom').each(function(){
		$(this).mousedown(function(e){
			xOffset = (parseInt(e.pageX) - mainLeft);
			yOffset = (parseInt(e.pageY) - mainTop * 2);
			$(this).parent().parent().parent().addClass('scale-b');
		});

		$(this).mouseup(function(){
			$(this).parent().parent().parent().removeClass('scale-b');
		});
	});

}


function MoveWindow(x, y) {
	$('.mvable').css({
		'left': ((parseInt(x) - mainLeft) - xOffset) + 'px',
		'top': ((parseInt(y) - mainTop * 2) - yOffset) + 'px',
	});
}

function ScaleWindow(x, y, w, h)
{
	var scalel = $('.scale-l');

	$('.scale-l').css({
		'left':((parseInt(x) - mainLeft) - xOffset/2) + 'px',
		'width': (widthInit) + (scalexInit - x) + 'px',
	});

	$('.scale-t').css({
		'top':((parseInt(y) - mainLeft) - yOffset) + 'px',
	});

}

function IndexWindows(clicked){
	var temp = [];
	var top;
	for(var i = 0; i < wis.length; i++)
	{
		if(wis[i] != clicked)
			temp.push(wis[i]);
		else
			top = wis[i];
	}

	temp.push(top);
	wis = temp;

	for(var i = 0; i < wis.length; i++)
	{
		$('.window-wrapper').eq(wis[i]).css('z-index', i);
	}
}

// function Dsk_Update(dt){

// }
