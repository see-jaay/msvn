lastHash = '~';
var hashUpdate = false;

var NavQueries = {
	"shop":"shop_hub.php",
	"home":"home_hub.php",
	"product":"prod_hub.php",
	"category":"category_hub.php"
	// "shop":"shop_hub",
	// "shop":"shop_hub",


};

var lastHash = '~';
function hsh(location){
	window.location.hash = location;
	navChange = true;
}


function hub(scroll)
{
	// window.location.hash = 'home';
}

function NAVUpdate(dt)
{

	// if hashUpdate is true transition effects are initiated
	// if false transitions sit in dormant states or animations if availiable

	// NAVCheck();

	// UpdateNavigation();
	UpdateTransitions(dt);
}


function UpdateNavigation(){

}

function NAVCheck()
// checks and corrects the navigation
{
	// console.log('transition');
	// if(window.location.hash !== lastHash)
	// {
	//
	//
	// 	var hashVal = window.location.hash;
	// 	var lastVal = lastHash;
	//
	// 	hashVal = hashVal.substr(1);
	// 	hashVal = hashVal.split('-');
	//
	// 	lastVal = lastVal.substr(1);
	// 	lastVal = lastVal.split('-');
	//
	// 	var colorSwitchTime = 1000;
	//
	// 	ShowPage(hashVal);
	//
	// 	HidePage(lastHash);
	//
	// 	lastHash = window.location.hash;
	//
	// 	if(!transitionEffect)
	// 	{
	// 		if(hashVal[0] === 'shop')
	// 		{
	// 			if(hashVal.length > 1)
	// 				showPage('transition-page shop', 'category_hub', hashVal);
	// 			else
	// 				showPage('transition-page shop','shop_hub', hashVal);
	// 		}
	// 		else if(hashVal[0] === 'product')
	// 			showPage('transition-page shop', 'product_hub', hashVal);
	// 		else if(hashVal[0] === 'creative')
	// 			showPage('transition-page crtvsltns','creative_hub', hashVal, 0);
	// 		else
	// 			showPage('transition-page home','home_hub');
	// 	}
	// 	else
	// 	{
	// 		if(hashVal[0] === 'shop')
	// 		{
	// 			if(hashVal.length > 1)
	// 				showPageTransition('shop', 'category_hub', hashVal);
	// 			else
	// 				showPageTransition('shop','shop_hub', hashVal);
	// 		}
	// 		else if(hashVal[0] === 'product')
	// 			showPageTransition('shop', 'product_hub', hashVal);
	// 		else if(hashVal[0] === 'creative')
	// 			showPageTransition('crtvsltns','creative_hub', hashVal, 0);
	// 		else
	// 			showPageTransition('home','home_hub');
	//
	// 		// transitionEffect = false;
	// 	}
	// }
}
