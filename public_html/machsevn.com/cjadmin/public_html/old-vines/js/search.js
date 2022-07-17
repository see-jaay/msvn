
var searchFocus = false;
var searchHover = false;

var $utilSearchInput;
var $utilSearch;
var $searchClose;
var $utilCart;

$(document).ready(function(){


	$utilSearchInput = $('#util_search_input');
	$utilSearch = $('#util_search');
	$searchClose = $('#search_close');
	$utilCart = $('#util_cart');

	$utilSearchInput.focus(function(){
		$utilSearchInput.css('box-shadow','0px 0px 600px 1500px rgba(0,0,0,.25)');
		searchFocus = true;
	});

	$utilSearch.hover(function(){
		searchHover = true;

	});

	$utilSearch.mouseleave(function(){
		if(!searchFocus)
			searchHover = false;
	});

	$searchClose.on('click', function(){
		searchFocus = false;
		searchHover = false;
	});


	requestAnimationFrame(FocusToggle);

});


function FocusToggle() {



	$searchClose.css({
		'left': parseFloat($utilSearchInput.position().left) + parseFloat($utilSearchInput.css('width')) + 40 + 'px',
		'top' : parseFloat($utilSearchInput.position().top) + 'px'
	});

	// console.log($searchInput.css('width'));

	if(searchHover)
	{
		$utilSearchInput.css({
			'width':'90%',
			'background-color':'rgba(0,0,0,.15)'
		});
	}
	else {
		$utilSearchInput.css({
			'width':'0px',
			'background-color':'rgba(0,0,0,0)'
		});
	}

	if(!searchFocus)
	{
		// $utilCart.css({
		// 	'z-index':'-10'
		// });
		
		$utilSearchInput.css('box-shadow','0px 0px 0px 0px rgba(0,0,0,0)');
		$utilSearchInput.val('');

		// $searchClose.css('display','none');
		$searchClose.fadeOut(100);
		animateSpeed = .5;

		$('.menu-item').fadeIn(100);
		$utilCart.fadeIn(100);
		$('#center_text').fadeIn(100);

		$('#search_flyout').fadeOut(100);

	}
	else
	{
		animateSpeed = .25;
		// $utilSearch.css({'left': '25%', 'wi'});
		// $searchClose.css('display','');
		$searchClose.fadeIn(400);
		$('#search_flyout').fadeIn(400);

		$('.menu-item').fadeOut(400);
		$utilCart.fadeOut(400);
		$('#center_text').fadeOut(400);

	}

	requestAnimationFrame(FocusToggle);
}

function OnSubmit()
{

}
