function Login(elm){
	var url = elm.parentElement.action;
	var unfield = $(elm.parentElement).children('.input-field.username');
	var pwfield = $(elm.parentElement).children('.input-field.password');
	var un = unfield.find('input');
	var pw = pwfield.find('input');

	$.ajax({
		url: url,
		type: "POST",
		data: {action:'login', un: un[0].value, pw:pw[0].value},
		success: function(data) {
			var data = JSON.parse(data);
			unfield.removeClass('err');
			pwfield.removeClass('err');

			unfield.children('.prompt').html('');
			pwfield.children('.prompt').html('');

			if(data.includes('rs'))
			{
				$(elm).closest('.form')[0].style.left = '-100%';
				$(elm).closest('.form')[0].nextElementSibling.style.left = 0;

			}
			else if(data.includes('empty_fields')) {

				if(data.includes('empty_un'))
				unfield.addClass('err');

				if(data.includes('empty_pw'))
				pwfield.addClass('err');

				pwfield.children('.prompt').html('* one or more fields are empty.');
			}
			else if(data.includes('invalid_un') || data.includes('invalid_pw'))
			{
				unfield.addClass('err');
				pwfield.addClass('err');

				pwfield.children('.prompt').html('* invalid username or password');
			}
			else if(data.includes('successful_login')){
				pwfield.children('.prompt').html('login successful');
				// hsh('')
				location.reload();
			}
		}
	});
}
function Logout(elm) {
	$.ajax({
		url:'includes/utils/loginout.php',
		type: "POST",
		data: {action:'logout'},
		success: function(data){
			location.reload();
		}
	})
}


function flyout(fly){
	if($('#'+fly+'_flyout').hasClass("show"))
  {
    $('#'+fly+'_flyout').removeClass("show");
  }
	else
  {
    $('#'+fly+'_flyout').addClass("show");
  }
}
