


var transitionAnimReq;


var lastHash = '~';
var hashUpdate = false;
var transitionEffect = false;

var transitionWorker;

var cellWidth = 16;
var cellHeight = 22;

var cmdUpdate = false;
var cmdDT = 0;

var navChange = true;

// var cmdTransition = false;
function UpdateTransitions(dt) {

	if(window.location.hash !== lastHash)
	{
		navChange = true;

		if(window.location.hash === "" || window.location.hash == "~")
		{
			hsh("home");
		}
	}

	if((navChange && $('body').length))
	{
		// Transition(false);
		if(window.location.hash.substr(1) === "~" || window.location.hash.substr(1) === "")
			ShowPage("home");
		else
			Transition();

		navChange = false;
	}

	cmdDT += dt;

	// if(cmdUpdate && cmdDT > .0005)
	if(cmdUpdate)
	{
		CMD_Update(dt);
		// cmdDT = 0;
	}

}

function TE(value){
	transitionEffect = value;
}

function TransitionInit() {

	CMD_Init();

	// if(typeof(transitionWorker) == "undefined")
	// {
	// 	transitionWorker = new Worker("./js/transition-worker.js");

	// 	transitionWorker.addEventListener('message', function(e){
	// 		// var s = e.data.state;

	// 		// if(s === "draw")
	// 		// {
	// 		// 	CMDDraw(e.data.map);
	// 		// }
	// 		// else if(s === "drawi")
	// 		// {
	// 		// 	DrawI(e.data.i, e.data.c);
	// 		// }
	// 		// else if(s == "clear")
	// 		// {
	// 		// 	mtrxCtx.clearRect(0,0,mtrxCanvas.width, mtrxCanvas.height);
	// 		// }
	// 	});
	// }

	// var canvas = document.getElementById("transition_canvas");
	// var ctx = setupCanvas(canvas);

	// var transitionCTX =


	// var cmdColCount = Math.ceil(canvas.width / cellWidth);
	// var cmdRowCount = Math.ceil(canvas.height / cellHeight);

	// transitionWorker.postMessage({state:'initCMD', colCount:cmdColCount, rowCount:cmdRowCount});

}

function Transition() {

	// console.log('transition');
	if(window.location.hash !== lastHash)
	{


		var location = window.location.hash;
		var lastLocation = lastHash;

		location = location.substr(1);
		// location = location.split('-');

		lastLocation = lastLocation.substr(1);
		// lastLocation = lastLocation.split('-');

		var colorSwitchTime = 1000;




		if(location[0] != lastLocation[0])
			HidePage(lastLocation);

		ShowPage(location);

		lastHash = window.location.hash;

		// if(!transitionEffect)
		// {
		// 	if(location[0] === 'shop')
		// 	{
		// 		if(location.length > 1)
		// 			showPage('pg shop', 'category_hub', location);
		// 		else
		// 			showPage('pg shop','shop_hub', location);
		// 	}
		// 	else if(location[0] === 'product')
		// 		showPage('pg shop', 'product_hub', location);
		// 	else if(location[0] === 'creative')
		// 		showPage('pg crtvsltns','creative_hub', location, 0);
		// 	else
		// 		showPage('pg home','home_hub');
		// }
		// else
		// {
		// 	if(location[0] === 'shop')
		// 	{
		// 		if(location.length > 1)
		// 			showPageTransition('shop', 'category_hub', location);
		// 		else
		// 			showPageTransition('shop','shop_hub', location);
		// 	}
		// 	else if(location[0] === 'product')
		// 		showPageTransition('shop', 'product_hub', location);
		// 	else if(location[0] === 'creative')
		// 		showPageTransition('crtvsltns','creative_hub', location, 0);
		// 	else
		// 		showPageTransition('home','home_hub');

		// 	// transitionEffect = false;
		// }
	}
}


var lastHash = "";

function ShowPage(location)
{
	// console.log(NavQueries[location]);

	var page = location;
	// console.log(page);
	var loader = false;

	if($('.pg.' + page).length)
	{
		// find page element
		var pgElement = $(".pg." + page);

		// query data
		var qry = NavQueries[page];
		var pgData = {page:location};

		AppendData($('#hub_wrapper'), pgData, qry);

		pgElement.addClass("active");
	}
	else
	{
		// create page element
		var pgElement = $('<div class="pg '+page+' active"></div>');
		// $('#hub_wrapper').append(pgElement);

		// query data
		var qry = NavQueries[page];
		var pgData = {page:location};

		AppendData($('#hub_wrapper'), pgData, qry);

	}
}

function HidePage(lastLocation)
{
	if(lastLocation == "" || lastLocation == "~")
	{
		$(".pg.home").removeClass("active");
	}
	else
	{
		$(".pg." + lastLocation).removeClass("active");
	}
}

function AppendData($pgElement, pgData, qry)
{
	$.ajax({
		type:"POST",
		url: './hubs/' + qry,
		data: pgData,

		success: function(data)
		{
			$pgElement.html('');
      $pgElement.append(data);
		}
	});
}

function PageQuery(queryPage, pgData, $pgElement, loader)
{
	// call and insert page from data
	$.ajax({

       type: "POST",
       url: queryPage,
       data: pgData,

       beforeSend: function()
       {
       	// if(loader)
       	// 	$('#load_flyout').fadeIn(500);
       },

       success: function(data)
       {

	   		var transitionIntro = ParseCSS($pgElement.css('--transition-intro'));
       		var backgroundColor = ParseCSS($pgElement.css('--background-color'));
       		var textColor = ParseCSS($pgElement.css('--text-color'));
       		// var flipColor = ParseCSS(pgElement.css('--flip-color'));

       		// siteColors2(backgroundColor, textColor, flipColor);

       	if(transitionIntro == 'cmd')
	   		{
				CMD_Set($pgElement, $('.pg.active'), 0);
	   		}
	   		else
	   		{
	   			//?
	   		}

       	$pgElement.html('');
       	$pgElement.append(data);
   			$pgElement.addClass('active');

			// if(loader)
	  //      		setTimeout(function(){
	  //          		$('#load_flyout').fadeOut(500);
	  //      		}, 500);
       }
 	});
}

function TransitionClip(transition, clipPoints)
{

	// console.log(page);
	// var destPage = $('.pg.active:not(.' + destPage + ')');
	// var destPage = $('.pg.' + destPage);


	// showPage.addClass('active');

	// clipPoints = '100% 0, 50% 50%, 0 100%';/

	if(transition == 'cmd')
	{
		// cmdPage.css('clip-path', 'polygon(0 0,' + clipPoints + ', 0 0)');
		// cmdOtherPage.css('clip-path', 'polygon(100% 100%,' + clipPoints + ', 100% 100%)');

		// cmdOtherPage.removeClass('active');
		// cmdPage.addClass('active');


	}

	// window.setTimeout(function(){
	// 	TransitionComplete(destPage);
	// }, 2000);
}

function siteColors2(background, text, flip = false)
{
	if(!flip)
	{
		$(':root').css({
			'--background-color-rgb':background,
			'--text-color-rgb':text
		});
	}else{
		$(':root').css({
			'--background-color-rgb':text,
			'--text-color-rgb':background
		});
	}

	updateCanvases = true;
	vc = vineColor = $(':root').css("--vine-color");


	for(var i = 0; i < vineLocals.length; i++)
	{
		vineLocals[i].UpdateCSS();
	}

}

function siteColorsFast(background, text, speed, flip = false)
{

	$('body').css('transition-duration', speed + 's');

	if(!flip)
	{
		$(':root').css({
			'--background-color-rgb':background,
			'--text-color-rgb':text
		});
	}else{
		$(':root').css({
			'--background-color-rgb':text,
			'--text-color-rgb':background
		});
	}

	updateCanvases = true;
	vc = vineColor = $(':root').css("--vine-color");


	for(var i = 0; i < vineLocals.length; i++)
	{
		vineLocals[i].UpdateCSS();
	}

}
