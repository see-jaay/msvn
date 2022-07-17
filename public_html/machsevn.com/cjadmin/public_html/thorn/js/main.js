




var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

const perfectFrameTime = 1000/60;
var lastUpdate = (new Date()).getTime();
var now = 0;
var deltaTime = 0;
var vdt = 0, vlastUpdate = 0;
var ar;
var vineAnimReq, baseAnimReq;
var index = 0;


var ADMIN_ACCESS = false;


// VineArtUpdate(lastUpdate);

Update(lastUpdate);

// console.log($(window).innerWidth(), $(window).innerHeight());



var $bkrndcolor1 = $('body').css('background-color');
var $bkrndcolor2 = $('body').css('color');

var hist = undefined;
var index = 0, lastIndex = '';
// var lastHash = '';
// var hashUpdate = false;


function Update(){
	// cancelAnimationFrame(ar);
	baseAnimReq = requestAnimationFrame(Update);

	now = (new Date()).getTime();
	deltaTime = (now - lastUpdate)/1000;
	// lastUpdate = now;


	if(ADMIN_ACCESS)
		AdminUpdate(deltaTime);

	// NAVUpdate(deltaTime);
	UpdateTransitions(deltaTime);
	// VineArtUpdate(deltaTime * 50);
	VineArtUpdate(deltaTime);

	//AddCorners();
	// TRUpdate(deltaTime);

	//MTRXUpdate(deltaTime);
	lastUpdate = now;
}


function AdminAccess() {
	$.getScript("js/admin.js", function(){
		// $.getScript("js/editor.js", function(){
			ADMIN_ACCESS = true;
			// AdminUpdate();
		// });
	});
}

function VineArtUpdate(dt) {
	VineUpdate(dt);
}


function scrollSibling(element, sibling) {
    // return ($element.scrollTop) / (($element.scrollHeight) - $parent.height()) * 100;

    var el = document.getElementById(element), sib = document.getElementById(sibling);
	if($('#'+element).is(':hover')){

	  var s = el.scrollTop,
	  d = el.children[0].clientHeight,
	  c = el.clientHeight;

	  var scrollPercent = (s / (d - c));
	  
	  sib.scrollTop = (sib.children[0].clientHeight - sib.clientHeight) * scrollPercent; 
	}

    //return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
}

$(window).resize(function(){
	var fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
	var winWidth = window.innerWidth;
	var winHeight = window.innerHeight;
	var paddingX = (winWidth / fontSize) - Math.floor(winWidth / fontSize);
	var paddingY = (winHeight / fontSize) - Math.floor(winHeight / fontSize);
	// console.log((window.innerHeight / fontSize) - Math.floor(window.innerHeight / fontSize));

	// $('#body_wrapper').css({
	// 	'width': (winWidth / fontSize - paddingX) + 'rem',
	// 	'height': (winHeight / fontSize - paddingY) + 'rem',
	// 	'top' : paddingY/2 + 'rem',
	// 	'left' : paddingX/2 + 'rem'
	// });

	// $('#grid_markers').css({
	// 	'width': (winWidth / fontSize - paddingX) + 'rem',
	// 	'height': (winHeight / fontSize - paddingY) + 'rem',
	// 	'top' : paddingY/2 + 'rem',
	// 	'left' : paddingX/2 + 'rem'
	// });

	// $('body').css({
	// 	'width': (winWidth / fontSize - paddingX) + 'rem',
	// 	'height': (winHeight / fontSize - paddingY) + 'rem',
	// 	'top' : paddingY/2 + 'rem',
	// 	'left' : paddingX/2 + 'rem'
	// });

	// $('#colorbox').css({
	// 	'width': window.innerWidth,
	// 	'height': window.innerHeight
	// })

	// AddGridMarkers(fontSize, winWidth, winHeight);
	ResetGrids();
	VAUpdateCanvases();
	// VinesReInit();
});

function JumpHash(){
	// if(!(window.location.hash === lastHash) )
	// {
	// 	lastHash = window.location.hash;

	// 	var hashVal = lastHash.substr(1);
	// 	hashVal = hashVal.split('-');

	// 	var colorSwitchTime = 1000;

	// 	DefaultClear();

	// 	if(hashVal[0] === 'shop')
	// 	{

	// 		if(hashVal.length > 1)
	// 			showBody('.body-wrapper.shop', 'category_hub', hashVal);
	// 		else
	// 		{

	// 			showBody('.body-wrapper.shop','shop_hub', hashVal);
	// 			// setTimeout(function(){siteColors('255,247,230','255,133,102');},colorSwitchTime);
	// 			setTimeout(function(){siteColors('255,247,230','70,70,70');},colorSwitchTime);


	// 			// loadSection('#content_wrapper.shop', hashVal);
	// 		}

	// 	}
	// 	else if(hashVal[0] === 'product')
	// 		showBody('.body-wrapper.shop', 'product_hub', hashVal);
	// 	else if(hashVal[0] === 'creative')
	// 	{

	// 		showBody('.body-wrapper.crtvsltns','creative_hub', null, 0);
	// 		InitShow();
	// 	}
	// 	else
	// 	{
	// 		showBody('.body-wrapper.home','home_hub');
	// 		// setTimeout(function(){siteColors('200,200,200','70,70,70', 1);},colorSwitchTime);
	// 		// setTimeout(function(){siteColors('255,247,230','70,70,70', 1);},colorSwitchTime);

	// 	}
	// }
	// hashUpdate = true;

}

// document.addEventListener("click",handler,true);

function handler(e){
    e.stopPropagation();
    e.preventDefault();

    console.log(e.path);
}

window.addEventListener('load',function(){
	var fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
	var winWidth = window.innerWidth;
	var winHeight = window.innerHeight;
	var paddingX = (winWidth / fontSize) - Math.floor(winWidth / fontSize);
	var paddingY = (winHeight / fontSize) - Math.floor(winHeight / fontSize);
	// console.log((window.innerHeight / fontSize) - Math.floor(window.innerHeight / fontSize));

	// $('#body_wrapper').css({
	// 	'width': (winWidth / fontSize - paddingX) + 'rem',
	// 	'height': (winHeight / fontSize - paddingY) + 'rem',
	// 	'top' : paddingY/2 + 'rem',
	// 	'left' : paddingX/2 + 'rem'
	// });

	// $('#grid_markers').css({
	// 	'width': (winWidth / fontSize - paddingX) + 'rem',
	// 	'height': (winHeight / fontSize - paddingY) + 'rem',
	// 	'top' : paddingY/2 + 'rem',
	// 	'left' : paddingX/2 + 'rem'
	// });

	// $('body').css({
	// 	'width': (winWidth / fontSize - paddingX) + 'rem',
	// 	'height': (winHeight / fontSize - paddingY) + 'rem',
	// 	'top' : paddingY/2 + 'rem',
	// 	'left' : paddingX/2 + 'rem'
	// });

	// $('#colorbox').css({
	// 	'width': window.innerWidth,
	// 	'height': window.innerHeight
	// })

	// AddGridMarkers(fontSize, winWidth, winHeight);
	// $("body").mousemove(function(event){
	// 	GridMarkers(event.pageX, event.pageY, fontSize-paddingX, fontSize-paddingY);
	// });

	// $('.trset').each(function(){
	// 	var $this = $(this);

	// 	$this.mouseover(function(){
	// 		TRSet(($this.data('tr')));
	// 	});
	// });

	// GridMarkerInit(fontSize-paddingX, fontSize-paddingY);
	// ResetGrids();

	VAUpdateCanvases();

	// if(window.location.hash !== lastHash)
	// 	JumpHash();
	
	// VinesReInit();

	// var isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);

	// console.log(FindElementsWithCSS('--grid'));

	
});

$( document ).ready(function() {
    $({property: 0}).animate({property: 105}, {
        duration: 4000,
        step: function() {
            var _percent = Math.round(this.property);
            $('#progress').css('width',  _percent+"%");
            if(_percent == 105) {
                $("#progress").addClass("done");
            }
        },
        complete: function() {
            console.log("LOADING COMPLETE");
        }
    });

    $(".category-wrapper").each(function(){

    	$(this).click(function() {
		    return false; // avoid to execute the actual submit of the form.
		});
	});

	$('#search_form').submit(function(e){
		searchQuery($('#search_bar').val());
		return false;
	});

	// $('#login_form').submit(function(e){
	// 	var values = {};

	// 	$.each($('#login_form').serializeArray(), function(i, field) {
	// 		values[field.name] = field.value;
	// 	});

	// 	var flyout = $('#login_flyout');
	// 	var form = $('#login_form');

	// 	$.ajax({
	// 		type:"POST",
	// 		url: "index.php",
	// 		data: {usr:values["username"], pwd:values["password"]},
	// 		success: function(data)
	// 		{
	// 			// flyout.removeClass("show");
	// 			// form[0].reset();
	// 		}
	// 	});
	// 	// return false;
	// });
});


function loadSection(element, hash){

	var queryPage = hash[0] + '.php';
	var category = hash[1];
	var prod_id = hash[1];

	(hash === '') ? hash = null : hash = hash;
    $.ajax({
       type: "POST",
       url: queryPage,
       data: {category: category, prod_id: prod_id}, // serializes the form's elements.
       success: function(data)
       {
           $(element).html(''); // show response from the php script.
           $(element).append(data); // show response from the php script.
       }
     });
}

function showBody(body, query, hash, loadEffect) {
	var queryPage = query + '.php';
	var category, prod_id;

	if(hash && hash.length > 1)
	{
		category = hash[1];
		prod_id = hash[1];
	}

	(hash === '') ? hash = null : hash = hash;
    $.ajax({
       type: "POST",
       url: queryPage,
       data: {category: category, prod_id: prod_id}, // serializes the form's elements.
       beforeSend: function()
       {
       	if(loadEffect == 1)
       		$('#load_flyout').fadeIn(500);
       },
       success: function(data)
       {
           // $('.body-wrapper.front').html(''); // show response from the php script.
	      $('.body-wrapper.active').removeClass('active');
           $(body).html(''); // show response from the php script.
           $(body).append(data); // show response from the php script.
           $(body).addClass('active');

   		   	$('.grd').each(function(){
		   		GRDInit($(this));
			});

   		 if(loadEffect == 1)
   		 {
	       	setTimeout(function(){
	           $('#load_flyout').fadeOut(500);
	       	}, 500);
   		 }
       }
     });
}


function searchQuery(search){
	$.ajax({
		type:"POST",
		url: "search.php",
		data: {query: search},
		success: function(data)
		{
			$('#search_results').html('');
			$('#search_results').append(data);

			$('#search_results').css({
				'top': '15rem',
				'opacity': 1
			});
			$('#search_bar').blur();
		}
	});

	$('#search_form').css({
		'top': '2rem',
		'transform': 'translateX(-50%)'
	});

	// alert(search);
}

function updateCart(id, add){

	$.ajax({
		type:"POST",
		url: "cart.php",
		data: {id: id, add: add},
		success: function(data)
		{
			$('#cart_items').html('');
			$('#cart_items').append(data);
			$('#cart_count > *').html($('#cart_items > .cart-item').length);

			if($('#cart_items > .cart-item').length)
			{
				$('#cart_count').css('opacity', 1);
			}
			else
			{
				$('#cart_count').css('opacity', 0);
			}
		}
	});
}


function siteColors(background, text, flip)
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


var infoIndex = 0;

function infoRoll(){
	$(".info .item").each().eq(infoIndex);

	if(infoIndex > $(".info .item").each().length)
		infoIndex = 0;
	infoIndex++;
}




// var img = null;
// var canvas = document.createElement('canvas');
// canvas.width = img.width;
// canvas.height = img.height;
// canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

// var pixelData = canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1,1).data;


//grid markers

var gms = [];
var gridSize = 16;

function GridMarkerInit(fsx, fsy){
	gms = [
		{x:0, y:0, o:0},		 {x:-gridSize/2, y:0, o:0}, 			{x:-gridSize, y:0,o:0},
		{x:0, y:-gridSize/2, o:0},{x:-gridSize/2, y:-gridSize/2, o:0}, {x:-gridSize, y:-gridSize/2, o:0},
		{x:0, y:-gridSize, o:0},  {x:-gridSize/2, y:-gridSize, o:0},	{x:-gridSize, y:-gridSize, o:0}
	];
}

function GridMarkers(xPos, yPos, fontSizeX, fontSizeY)
{
	var ofsx = (((gridSize/3)-2) * fontSizeX);
	var ofsy = (((gridSize/3)-2) * fontSizeY);

	for(var i = 0; i < gms.length; i++)
	{
		var jump = gridSize + (gridSize/2);
		while(((gms[i].x * fontSizeX) + fontSizeX/2) - (xPos + ofsx) < (-gridSize/2 * fontSizeX)){
			gms[i].x += jump;
		}
		while(((gms[i].x * fontSizeX) + fontSizeX/2) - (xPos + ofsx) > (gridSize/2 * fontSizeX)){
			gms[i].x -= jump;
		}
		while(((gms[i].y * fontSizeY) + fontSizeY*2) - (yPos + ofsy) < (-gridSize/2 * fontSizeY)){
			gms[i].y += jump;
		}
		while(((gms[i].y * fontSizeY) + fontSizeY*2) - (yPos + ofsy) > (gridSize/2 * fontSizeY)){
			gms[i].y -= jump;
		}

		var posx = ((gms[i].x * fontSizeX) + fontSizeX/2);
		var posy = ((gms[i].y * fontSizeY) + fontSizeY*2);
		var dist = Math.sqrt(Math.pow(xPos - posx,2) + Math.pow(yPos - posy,2));
		var maxDist = (fontSizeX * gridSize/2) + (fontSizeX * gridSize/4);

		gms[i].o = (maxDist - dist) / maxDist;
	}

	$('#gm1').css({
		'left': gms[0].x+ 'rem',
		'top': gms[0].y+ 'rem',
		'opacity':gms[0].o,
	});

	$('#gm2').css({
		'left': gms[1].x+ 'rem',
		'top': gms[1].y+ 'rem',
		'opacity': gms[1].o,
	});
	$('#gm3').css({
		'left': gms[2].x + 'rem',
		'top': gms[2].y + 'rem',
		'opacity': gms[2].o,
	});
	$('#gm4').css({
		'left': gms[3].x + 'rem',
		'top': gms[3].y+ 'rem',
		'opacity': gms[3].o,
	});
	$('#gm5').css({
		'left': gms[4].x+ 'rem',
		'top': gms[4].y+ 'rem',
		'opacity':gms[4].o,
	});

	$('#gm6').css({
		'left': gms[5].x+ 'rem',
		'top': gms[5].y+ 'rem',
		'opacity': gms[5].o,
	});
	$('#gm7').css({
		'left': gms[6].x + 'rem',
		'top': gms[6].y + 'rem',
		'opacity': gms[6].o,
	});
	$('#gm8').css({
		'left': gms[7].x + 'rem',
		'top': gms[7].y+ 'rem',
		'opacity': gms[7].o,
	});
	$('#gm9').css({
		'left': gms[8].x + 'rem',
		'top': gms[8].y+ 'rem',
		'opacity': gms[8].o,
	});

 }

function AddCorners(){

	$('.add-c').not(".c-added").each(function(){

		var $this = $(this);

		// if($this.hasClass('add-c'))
		// {

		// 	var loc = '';

		// 	switch(randomInt(1,2))
		// 	{
		// 		case 1:
		// 			loc = 'ct cl';
		// 		break;
		// 		case 2:
		// 			loc = 'cb cr';
		// 		break;
		// 		case 3:
		// 			loc = 'cb cl';
		// 		break;
		// 		case 4:
		// 			loc = 'ct cr';
		// 		break;
		// 	}


		// 	$this.append( 
		// 		// '<svg viewBox="0 0 100 100" class="cor cir ' + loc + ' ' + pg +'">' +
		// 		//  '<circle cx="50" cy="50" r="15"/>' +
		// 		//  // '<rect x="25" y="25" width="25" height="25"/>' +

		// 		// '</svg>'+
		// 		'<svg viewBox="0 0 100 100" class="cor ct cl ' + pg + '">' + 
		// 		'<path d="M50,2 L50,25"/>' + 
		// 		'<path d="M2,50 L25,50"/>' + 
		// 		'<path d="M50,50 L50,98"/>' + 
		// 		'<path d="M50,50 L98,50"/>' + 

		// 		'</svg>' + 
		// 		'<svg viewBox="0 0 100 100" class="cor ct cr ' + pg + '">' + 
		// 		'<path d="M50,2 L50,98"/>' + 
		// 		'<path d="M2,50 L98,50"/>' + 
		// 		'</svg>' + 
		// 		'<svg viewBox="0 0 100 100" class="cor cb cl ' + pg + '">' + 
		// 		'<path d="M50,2 L50,98"/>' + 
		// 		'<path d="M2,50 L98,50"/>' + 
		// 		'</svg>' + 
		// 		'<svg viewBox="0 0 100 100" class="cor cb cr ' + pg + '">' + 
		// 		'<path d="M50,2 L50,98"/>' + 
		// 		'<path d="M2,50 L98,50"/>' + 
		// 		'</svg>');

		// 	$this.addClass('c-added');
		// }

		if($this.hasClass("cp"))
		{

			var loc = '';

			switch(randomInt(1,2))
			{
				case 1:
					loc = 'ct cl';
				break;
				case 2:
					loc = 'cb cr';
				break;
				case 3:
					loc = 'cb cl';
				break;
				case 4:
					loc = 'ct cr';
				break;
			}


			$this.append( 
				// '<svg viewBox="0 0 100 100" class="cor cir ' + loc + ' ' + pg +'">' +
				//  '<circle cx="50" cy="50" r="15"/>' +
				//  // '<rect x="25" y="25" width="25" height="25"/>' +

				// '</svg>'+
				'<svg viewBox="0 0 100 100" class="cor ct cl">' + 
				'<path d="M50,2 L50,25"/>' + 
				'<path d="M2,50 L25,50"/>' + 
				'</svg>' + 
				'<svg viewBox="0 0 100 100" class="cor ct cr">' + 
				'<path d="M50,2 L50,25"/>' + 
				'<path d="M75,50 L98,50"/>' + 
				'</svg>' + 
				'<svg viewBox="0 0 100 100" class="cor cb cl">' + 
				'<path d="M50,75 L50,98"/>' + 
				'<path d="M2,50 L25,50"/>' + 
				'</svg>' + 
				'<svg viewBox="0 0 100 100" class="cor cb cr">' + 
				'<path d="M50,75 L50,98"/>' + 
				'<path d="M75,50 L98,50"/>' + 
				'</svg>');

			$this.addClass('c-added');
		}
	});

}




