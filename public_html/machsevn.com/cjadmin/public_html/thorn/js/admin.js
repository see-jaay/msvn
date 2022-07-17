
function AdminUpdate(dt) {
	// ED1_34HDT();
}


function admin_controls(elm, c) {

	$('.page-tab.selected').removeClass('selected');

	switch(c){
		case "pe":
			$(elm).addClass('selected');
			loadControls('site_xml/index.xml');
		break;
		case "et":
			$(elm).addClass('selected');
			loadControls('element_tree.php');
		break;
	}

}


function loadControls(controls) {

	var page = $('#page_container');

	$.ajax({
       url: "./admin/" + controls,
       success: function(data)
       {
           	// page.html(fr.readAsText("./admin/" + controls) ); // show response from the php script.
           	// console.log(data);
           	page.text(data);
       }
    });

}


function Admin_AddPopup(prod) {
	// alert("add-pop");

	var popups = $('.popup-holder');

	$.ajax({
		url: "./includes/popups.php",
		type:"POST",
		data: {
			action:"add",
			product: prod,
		},
		success: function(data){
			popups.html(data);
			console.log(popups);
		}
	});
}

function Admin_SavePopup(){

	var popups = $('.popup-container');
}

function Popup_Unbind(popup) {

}

var popups = {};

document.addEventListener('mousedown', (e)=>{

	if(e.path[0].classList.contains('popup-move')){
		e.path[1].classList.add('moveable');
	}else if(e.path[0].classList.contains('popup-width')){
		e.path[1].classList.add('scale-width');
	} else if(e.path[0].classList.contains('popup-height')){
		e.path[1].classList.add('scale-height');
	}
	// else if(e.pa)

});

var xoff = -20;
var yoff = -60;

document.addEventListener('mousemove', (e)=>{

	$('.moveable').each(function(){

		var x = e.pageX + xoff;
		var y = e.pageY + yoff;

		$(this).css({
			'left':x + 'px',
			'top':y + 'px'
		});

		if($(this).hasClass('popup-wrapper')){

			$(this).attr('left', x);
			$(this).attr('top', y);


		}
	});

	$('.scale-widthheight').each(function(){

		var w = e.pageX - parseFloat($(this).css('left')) + xoff;
		var h = e.pageY - parseFloat($(this).css('top')) + yoff;

		$(this).css({
			'width':w + 'px',
			'height':h + 'px'
		});

		if($(this).hasClass('popup-wrapper')){
			$(this).attr('width', w);
			$(this).attr('height', h);
		}
	});

	$('.scale-width').each(function(){

		var w = e.pageX - parseFloat($(this).css('left')) + xoff;

		$(this).css({
			'width':w + 'px'
		});

		if($(this).hasClass('popup-wrapper')){
			$(this).attr('width', w);
		}
	});
	$('.scale-height').each(function(){

		var h = e.pageY - parseFloat($(this).css('top')) + yoff;

		$(this).css({
			'height':h + 'px'
		});

		if($(this).hasClass('popup-wrapper')){
			$(this).attr('height', h);
		}
	});

});

document.addEventListener('mouseup', (e)=>{
	$('.moveable').each(function(){
		$(this).removeClass('moveable');
	});

	$('.scale-height').each(function(){
		$(this).removeClass('scale-height');
	});

	$('.scale-width').each(function(){
		$(this).removeClass('scale-width');
	});

	console.log(popups);
});

function Popup_Move(elm, popup){

}

