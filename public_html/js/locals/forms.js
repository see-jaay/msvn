

function Subscribe(elm){
  // page = elm.parentElement.action
  // data =
  var url = elm.parentElement.action;
  var mailField = $(elm.parentElement).children('.input-field.email');
  var nameField = $(elm.parentElement).children('.input-field.name');
  var form = $(elm).closest('.form')[0];
  var wrapper = $(elm).closest('.inner-wrapper.form')[0];
  var email = mailField.find('input');
  var name = nameField.find('input');

  // var emailerr = $(elm.parentElement).children('.err-mail')[0];
  // var nameerr = $(elm.parentElement).children('.err-name')[0];

  // var data = ;

  // console.log(elm.parentElement.action);
  // console.log(elm.previousElementSibling.value);

  // console.log(email);

  $.ajax({
    url: url,
    type: "POST",
    data: {action:'sub-req',name: name[0].value, email:email[0].value},
    success: function(data)
    {
      // elm.parentElement.parentElement.html('<div class="sub-resp">Thanks for Subscribing!</div><div class="sub-sec-resp">You\'ll recieve a verification email shortly.</div>');
      // var r = $('<div class="sub-resp">Thanks for Subscribing!</div>');
      // var r2 = $('<div class="sub-sec-resp">You\'ll recieve a verification email shortly.</div>');
      // elm.parentElement.append(r[0]);
      // elm.parentElement.append(r2[0]);
      //
      // elm.previousElementSibling.previousElementSibling.remove();
      // elm.previousElementSibling.remove();
      // elm.remove();
      var data = JSON.parse(data);

      mailField.removeClass('err');
      nameField.removeClass('err');

      mailField.children('.prompt').html('');
      nameField.children('.prompt').html('');

      // mailField.children('.prompt').html('server maintainence. <br> please try again later.');

      if(data.includes('rs'))
      {
        wrapper.style.left = '-100%';
        wrapper.nextElementSibling.style.left = 0;
      }
      else if(data.includes('ef')) {

        if(data.includes('enf'))
          nameField.addClass('err');

        if(data.includes('emf'))
          mailField.addClass('err');

        mailField.children('.prompt').html('* one or more fields are empty');
      }
      else if(data.includes('ie'))
      {
        mailField.addClass('err');
        mailField.children('.prompt').html('* invalid email address');
      }
      else if(data.includes('et'))
      {
        mailField.addClass('err');
        mailField.children('.prompt').html('* email already in use')
      }
      else {
        mailField.children('.prompt').html('* server maintainence. <br> please try again later.')
      }
    }
  });
}


function Login(elm){
  var url = elm.parentElement.action;
  var unfield = $(elm.parentElement).children('.input-field.username');
  var pwfield = $(elm.parentElement).children('.input-field.password');
  var un = unfield.find('input');
  var pw = pwfield.find('input');

  $.ajax({
    url: url,
    type: "POST",
    data: {action:'login-submit', un: un[0].value, pw:pw[0].value},
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
    url:'includes/logout.php',
    type: "POST",
    success: function(data){
      location.reload();
    }
  })
}
