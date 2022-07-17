
var lastHash = '~';
var lastSearch = '~';


function hsh(h){
  window.location.hash = h;
}

function NavUpdate(dt){

  var search = window.location.search.substr(1);
  var hash = window.location.hash.substr(1);

  if(search !== '' && search !== lastSearch)
  {
    QuerySearch(search);
    lastSearch = search;
  }

  if(hash != '' && hash !== lastHash && admn) {
    QueryHash(hash);
    lastHash = hash;
  }
}

function flyout(fly)
{
	if($('#'+fly+'_flyout').hasClass("show"))
  {
    $('#'+fly+'_flyout').removeClass("show");
  }
	else
  {
    $('#'+fly+'_flyout').addClass("show");
  }
}



function QuerySearch(search){
  var action = search.split(':')[0];

  var subWrapper = $('#sub_wrapper');

  if(action == 'sub-conf')
  {
    var subHash = search.split(':')[1];
    // console.log(subHash);

    $.ajax({
      url:'../includes/email_interface.php',
      type:'POST',
      data:{action:'sub-conf', subhash: subHash},
      success: function(data){
        // console.log(subWrapper.closest('.form'));
          subWrapper.find('.form')[0].style.left = '-200%';
          subWrapper.find('.req')[0].style.left = '-100%';
          subWrapper.find('.conf')[0].style.left = 0;
          SystemUX.depthTo = 1;

      },
    })
  }
}

function QueryHash(hash){
  // var multi = hash.split('-')

  // console.log('LoadPage Disabled: Navigation.js line 71')
  SiteManager.LoadPage(hash);

}

function LoadPage(){

}
