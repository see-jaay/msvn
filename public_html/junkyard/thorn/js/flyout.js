
var loginOpen = false;
function flyout(flyout)
{
	if($('#'+flyout+'_flyout').hasClass("show"))
		$('#'+flyout+'_flyout').removeClass("show");
	else
		$('#'+flyout+'_flyout').addClass("show");
}

function loginFlyout(open) {

}

function searchFlyout(open) {
	if(open)
	{
		$('#search_flyout').css({
			'opacity': 1,
			'z-index': 20
		});

		$('#search_bar').focus();
	}
	else
	{
		$('#search_flyout').css({
			'opacity': 0
		});

		setTimeout(function(){
			$('#search_flyout').css('z-index', -20);

			$('#search_form').css({
				'top': '50%',
				'transform': 'translateX(-50%) translateY(-50%)'
			});

			$('#search_results').html('');
			$('#search_bar').val('');

			$('#search_results').css({
				'top':'100%',
				'opacity': 0
			});

		}, 1000);

	}
}


function menuFlyout(open) {
	if(open)
	{
		$('#mobile_nav_wrapper').css({
			'opacity': 1,
			'z-index': 20
		});
	}
	else
	{
		$('#mobile_nav_wrapper').css({
			'opacity': 0
		});


		setTimeout(function(){
			$('#mobile_nav_wrapper').css('z-index', -20);
		}, 1000);

	}
}



function cartFlyout(open) {
	if(open)
	{
		$('#cart_flyout').css({
			'opacity': 1,
			'z-index': 20
		});
	}
	else
	{
		$('#cart_flyout').css({
			'opacity': 0
		});

		setTimeout(function(){
			$('#cart_flyout').css('z-index', -20);
		}, 1000);
	}
}

function checkoutFlyout(open){
	if(open)
	{
		$('#cart_wrapper').css({
			'opacity':0,
			'left':'-100%'
		});

		$('#checkout_wrapper').css({
			'opacity':1,
			'left':'2rem'
		});
	}
	else
	{
		$('#cart_wrapper').css({
			'opacity':1,
			'left':'2rem'
		});

		$('#checkout_wrapper').css({
			'opacity':0,
			'left':'100%'
		});
	}
}
