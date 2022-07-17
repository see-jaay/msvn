var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

// $( document ).scroll(function(e) {
//   e.preventDefault();
// });

var currentPage = 'shop_page';

function loadPage(page) {

	if(page != currentPage)
	{
		$("#page_wrapper").load('pages/' + page + '.php');

		currentPage = page;
	}
}

var lastUpdate = new Date();
var deltaTime = 0;
var index = 0;

Update(lastUpdate);

console.log($(window).innerWidth(), $(window).innerHeight());


function Update(now){
	animReq = requestAnimationFrame(Update);

	deltaTime = (((now - lastUpdate) / perfectFrameTime)/1000);
	lastUpdate = now;


	index += deltaTime * randomInt($('.cor').length*10, $('.cor').length * 100);
	
	if(Math.abs(index) > $('.cor').length)
		index = 0;

	var t = Math.round(index);

	var $cor = $('.cor').eq(t);
	// console.log(i);
	if($cor.hasClass('flkr'))
		$cor.removeClass('flkr');
	else
		$cor.addClass('flkr');







	$('.add-c').each(function(){

		var $this = $(this);

		if(!$this.hasClass('.c-added'))
		{

			// $this.append('<div class="corners">' + 
			// 	'<div class="top left"></div>' + 
			// 	'<div class="top right"></div>' + 
			// 	'<div class="bottom left"></div>' + 
			// 	'<div class="bottom right"></div>' + 
			// 	'</div>');


			// $this.append('<div class="corners">' + 
			// 	'<svg viewBox="0 0 100 100" class="ct cl">' + 
			// 	'<path d="M50,2 L50,98"/>' + 
			// 	'<path d="M2,50 L98,50"/>' + 
			// 	'</svg>' + 
			// 	'<svg viewBox="0 0 100 100" class="ct cr">' + 
			// 	'<path d="M50,2 L50,98"/>' + 
			// 	'<path d="M2,50 L98,50"/>' + 
			// 	'</svg>' + 
			// 	'<svg viewBox="0 0 100 100" class="cb cl">' + 
			// 	'<path d="M50,2 L50,98"/>' + 
			// 	'<path d="M2,50 L98,50"/>' + 
			// 	'</svg>' + 
			// 	'<svg viewBox="0 0 100 100" class="cb cr">' + 
			// 	'<path d="M50,2 L50,98"/>' + 
			// 	'<path d="M2,50 L98,50"/>' + 
			// 	'</svg>' + 
			// 	'</div>');

			$this.append( 
				'<svg viewBox="0 0 100 100" class="cor ct cl">' + 
				'<path d="M50,2 L50,98"/>' + 
				'<path d="M2,50 L98,50"/>' + 
				'</svg>' + 
				'<svg viewBox="0 0 100 100" class="cor ct cr">' + 
				'<path d="M50,2 L50,98"/>' + 
				'<path d="M2,50 L98,50"/>' + 
				'</svg>' + 
				'<svg viewBox="0 0 100 100" class="cor cb cl">' + 
				'<path d="M50,2 L50,98"/>' + 
				'<path d="M2,50 L98,50"/>' + 
				'</svg>' + 
				'<svg viewBox="0 0 100 100" class="cor cb cr">' + 
				'<path d="M50,2 L50,98"/>' + 
				'<path d="M2,50 L98,50"/>' + 
				'</svg>');

			$this.addClass('.c-added');

		}
	});

}
