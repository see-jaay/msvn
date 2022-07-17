
$(document).ready(function(){

	console.log("ready");

	// setTimeout(function(){
        var content = document.getElementById("site_frame").contentWindow;

        	
        console.log(content.document.find("#testText"));

	// }, 50);


	// setInterval(function(){
	// 	document.getElementById('site_frame').contentWindow.location.reload(true);
	// },10000);


	IframeScaling();

});






// TODO:
//	 Make the Iframe Scalable when draging sides or bottom right corner
//   Give the Iframe defined aspect ratios for convienience (Desktop, Tablet, Mobile, etc.)
//   ...

$(document).mousemove(function(e){

	// $('#frame').css({
	// 	'height': e.pageY - parseFloat($('#frame').css('top')) + 'px',
	// 	'width': e.pageX - parseFloat($('#frame').css('left')) + 'px'

	// });

});


function IframeScaling ()
{
	$('#frame_scale_w').css({
		'height': $('#frame').css('height'),
		'top': $('#frame').css('top') ,
		'left':  parseFloat($('#frame').css('width')) + parseFloat($('#frame_scale_w').css('width')) + 'px'
	});


	$('#frame_scale_h').css({
		'width': $('#frame').css('width'),
		'top': parseFloat($('#frame').css('height')) + parseFloat($('#frame_scale_h').css('height')) + 'px',
		'left': $('#frame').css('left')
	});

	$('#frame_scale_wh').css({
		'top': parseFloat($('#frame').css('height')) + parseFloat($('#frame_scale_h').css('height')) + 'px',
		'left':  parseFloat($('#frame').css('width')) + parseFloat($('#frame_scale_w').css('width')) + 'px'
	});

	console.log(parseFloat($('#frame').css('height')) + parseFloat($('#frame_scale_h').css('height'))/2);
	$('#frame_scale_wh').css({

	});
}


