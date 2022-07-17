var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var $utilSearchInput;
var $utilSearch;
var $utilCart;

var $menuRight;
var $menuLeft;

$(document).ready(function(){
	//ActivatePages(null, 0);
	//ArrangePages();


	$utilSearchInput = $('#util_search_input');
	$utilCart = $('#util_cart');
	$utilSearch = $('#util_search');

	$menuRight = $('#menu_item_right');
	$menuLeft = $('#menu_item_left');




	// ResetVines();

});


// window.addEventListener('load', (event) => {
//     // console.log('page is fully loaded');
//     // ResetVines();

//     $('#menu_item_right').on('click', function(){
// 		ActivatePages($('#page_wrapper').data("pos"), $('#page_wrapper').data("pos") + 1)
// 		$('#page_wrapper').data("pos", $('#page_wrapper').data("pos")+1);
// 		MoveVines(-1, 0);

// 	});
//     $('#menu_item_left').on('click', function(){
// 		ActivatePages($('#page_wrapper').data("pos"), $('#page_wrapper').data("pos") - 1)
// 		$('#page_wrapper').data("pos", $('#page_wrapper').data("pos")-1);
// 		MoveVines(1, 0);
// 	});
// });

// $(window).load(function(){
// 	VineInit();
// });




$( document ).scroll(function(e) {
  e.preventDefault();
});

// window.onresize = CenterElm;

function CenterElm() 
{
	// $("#center_text").css({
	// 	'left': $('#center_text').parent().width()/2 - $("#center_text").width()/2,
	// 	'top': $('#center_text').parent().height()/2 - $("#center_text").height()/2
	// });
	$('.center-text').each(function(){
		var $this = $(this), $parent = $this.parent();

		// $this.css({
		// 	'left': $parent.position().left + $(document).width()/2 - $this.width()/2,
		// 	'top': $parent.position().top + $(document).height()/2 - $this.height()/2
		// });

		$this.css({
			'left': $(document).width()/2 - $this.width()/2,
			'top': $(document).height()/2 - $this.height()/2
		});

	});

	$('.center-width').each(function(){
		var $this = $(this), $parent = $this.parent();

		$this.css({
			'left': $(document).width()/2 - $this.width()/2
		});
	});

	$('.center-height').each(function(){
		var $this = $(this), $parent = $this.parent();

		$this.css({
			'top': $(document).height()/2 - $this.height()/2
		});
	});

	$('.anchor').each(function(){
		var $this = $(this), pos = $this.data('pos'), offset = $this.data('offset');

		if(pos == 'top')
			$this.css({
				'top': 0 + parseInt(offset)
			});
		else if (pos == 'bottom')
			$this.css({
				'top': $(document).height() - $this.height() - parseInt(offset)
			});
		else if (pos == 'left')
			$this.css({
				'left': 0 + parseInt(offset)
			});
		else if (pos == 'right')
			$this.css({
				'left': $(document).width() - $this.width() - parseInt(offset)
			});

		//console.log(pos);
	});


}


function Menu_Item_Float()
{

	$('.menu-item').each(function(){

		var $this = $(this), 
		right = $this.parent().position().left + ($this.parent().width() + $(document).width() - $this.parent().width()), 
		left = $this.parent().position().left, 
		ceil = 0,
		floor = $(document).height();

		if($this.hasClass('right'))
		{
			// console.log("right");
			$this.css({
	    		'transform': 'rotate(90deg)',
	    		'left': (right - ($this.width()/2 + $this.height()/2)) + 'px',
	    		// 'left': right + 'px',
	    		'top' : (ceil + floor/2) - $this.height() / 2 + 'px',
	    		// 'margin-left':'-2%'
	    		'margin-left': -$(document).width() * .02 + 'px'
			});
		}
		else if($this.hasClass('left'))
		{
			// console.log("left");
			$this.css({
	    		'transform': 'rotate(-90deg)',
	    		'left': (left - ($this.width()/2 - $this.height()/2)) + 'px',
	    		'top' : (ceil + floor/2) - $this.height()/2 + 'px',
	    		'margin-left': $(document).width() * .02 + 'px'
			});
		}
	});
}


function ArrangePages()
{
	var $homepg = $('#home_page_container'), 
		width = $homepg.width(), 
		height = $homepg.height(),
		top = $homepg.position().top,
		left = $homepg.position().left;


	$homepg.css('left', width * -$('#page_wrapper').data("pos"));
	$('#background_color_box').css('left', width * (-$('#page_wrapper').data("pos")-1));

	$('#shop_page_container').css({
		'left': left + width + 'px',
		'top' : top + 'px'
	});

	$('#abt_page_container').css({
		'left': left - width + 'px',
		'top' : top + 'px'
	});

	$('#cart_page_container').css({
		'left': left + 'px',
		'top' : top + height + 'px'
	});

	var pos = $('#page_wrapper').data("pos");
	// console.log(pos);

	if(pos == -1)
	{
		$('#menu_item_right').text("HOME");
		$('#menu_item_left').text("");

	}
	else if (pos == 0)
	{
		$('#menu_item_right').text("SHOP");
		$('#menu_item_left').text("INFO");
	}
	else if (pos = 1)
	{
		$('#menu_item_right').text("");
		$('#menu_item_left').text("HOME");
	}

}

// var arrangePagesInt = null;


var req;

function FunctionStart() {
    // requestAnimationFrame(update);
    req = requestAnimationFrame(FunctionUpdate);
}
FunctionStart();

var searchFlyout = false;
var shiftable = true;

function FunctionUpdate()
{
	//req = requestAnimationFrame(FunctionUpdate);
	
	CenterElm();
	//ArrangePages();
	//Menu_Item_Float();


	// if($('#page_wrapper').data("pos") == 1)
	// {
	// 	shiftEffect.ShiftY('center_text', -350, .75);
	// 	// shiftable = false;
	// }
	// else if($('#page_wrapper').data("pos") == -1)
	// {
	// 	shiftEffect.ShiftY('center_text', -350, .75);
	// 	// shiftable = false;
	// }
	// else if($('#page_wrapper').data("pos") == 0 )
	// {
	// 	shiftEffect.ShiftY('center_text', 0, 2);
	// 	// shiftable = false;
	// }

	// $('.hvr').each(function(){
	// 	$this = $(this), hvr_data = $this.data('hover').split(';');

	// 	for(var i = 0; i < hvr_data.length; i++)
	// 	{
	// 		data = hvr_data[i].split(',');
	// 		if(data[0] == 'up')
	// 		{
	// 			$this.css($this.data('pos'), data[1]);
	// 		}
	// 	}
	// });

	// setInterval
}

function ColorShift(from, to)
{
	if(to == 0)
	{
		// $(':root').css({"--accent-color": "rgba(255,100,0)", "--placeholder-color": "rgba(255,100,0)"});
		// $(':root').css({"--bkrnd-top": "red", "--bkrnd-bot": "rgba(0,200,165)"});
		// $(':root').css({"--bkrnd-top": "lightgray", "--bkrnd-bot": "rgb(50,50,50)"});

	}
}

function ShiftPages(x, y)
{
	$('#home_page_container').css({
		'left': (100 * x) + 'vw',
		'top': (100 * y) + 'vh',
	});
	// MoveVines(x, y);
}





function ActivatePages(from, to)
{



	ColorShift(from, to);

	// console.log(from, to);

	$('.aside-page-container').each(function(){
		var $this = $(this), this_id = $this.data('pgid'), page = $this.data('page'),
			$from, $to, 
			fadeTimeout = null, 
			fadeTime = 1250;

		if(this_id == to){

			$to = $(this);

			if(to == 0)
			{
				// $("html").css({ 'scrollTop': '0px' });
				// $("html, body").animate({ scrollTop: 0 }, "slow");
				// window.scrollTo(0,0);

				$('#home_page_container').css({ 'top': '0' });

				// $menuRight.data("ft", to +',6');
				// $menuLeft.data("ft", to +',4');





				fadeTimeout = setTimeout(function(){ $('#page_wrapper').css('overflow', 'hidden');}, 0);
			}
			else if(to == 1)
			{
				fadeTimeout = setTimeout(function(){ $('#page_wrapper').css('overflow-y', 'visible');}, fadeTime);
			}

		}
		else if(this_id == from)
		{
			$from = $(this);
			fadeTimeout = setTimeout(function(){
				$from.children().remove();
				clearTimeout(fadeTimeout);
			}, fadeTime);
		}

		if($to)
		$to.load(page + '_page.php', function(){

		// $('.menu-item').on('click', function(){
		// 	clearTimeout(fadeTimeout);
		// 	var $this = $(this),
		// 	this_id = $this.data('pgid'),
		// 	// nav_coords = $this.data('nav').split(','),
		// 	// ft = $this.data('ft').split(',');


		// 	ShiftPages(nav_coords[0], nav_coords[1]);

		// 	if($this.hasClass("right"))
		// 		MoveVines(-1, 0);
		// 	else if($this.hasClass("left"))
		// 		MoveVines(1,0);

		// 	ActivatePages(ft[0], ft[1]);

		// 	// console.log($this.attr("class"));


		// });

		// if($to)
			// $to.children().fadeIn(1500);

		// if($from)
			// $from.children().fadeOut(500);	

		});

	});



}


// function PageVisibility()
// {
// 	var hidden, visibilityChange; 
// 	if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
// 	  hidden = "hidden";
// 	  visibilityChange = "visibilitychange";
// 	} else if (typeof document.msHidden !== "undefined") {
// 	  hidden = "msHidden";
// 	  visibilityChange = "msvisibilitychange";
// 	} else if (typeof document.webkitHidden !== "undefined") {
// 	  hidden = "webkitHidden";
// 	  visibilityChange = "webkitvisibilitychange";
// 	}

// 	// Warn if the browser doesn't support addEventListener or the Page Visibility API
// 	if (typeof document.addEventListener === "undefined" || hidden === undefined) {
// 	  console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
// 	} else {
// 	  // Handle page visibility change   
// 	  document.addEventListener(visibilityChange, handleVisibilityChange, false);
	    
// 	}

// 	function handleVisibilityChange() {
// 	  if (document[hidden]) {
// 	    pageActive = false;
// 	  } else {
// 	    pageActive = true;
// 	  }
// 	}

// }

// Set the name of the hidden property and the change event for visibility
 
// var videoElement = document.getElementById("videoElement");

// If the page is hidden, pause the video;
// if the page is shown, play the video