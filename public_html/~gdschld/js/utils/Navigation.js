class Navigator {

  constructor() {

  }

  static Init(){
    Frames.new('nav', Navigator.Update, 500);
  }

  static UpdateListeners(){
    $('.navdest').not('.dis').each(function(){
      $(this)[0].addEventListener('click', function(){
        window.location.hash = this.dataset['dest'];
      });
      $(this).removeClass('.navdest');
    });
  }




  static Update(now){
    Frames.clear('nav');

    Navigator.UpdateListeners();
    Navigator.QueryURL();

    // Frames.new('nav', Navigator.Update);
  }

  static QueryURL() {
    Navigator.urlData.search = window.location.search.substr(1);
    Navigator.urlData.hash = window.location.hash.substr(1);

    let search = this.urlData.search;
    let hash = this.urlData.hash;

    if(hash !== '' && hash !== this.urlData.lastHash){
      this.LoadPage(hash, Site.editorOverride);

      this.urlData.lastHash = hash;
    }
    else if(hash === ''){
      hsh('home');
    }



    if(search !=='' && search !== this.urlData.lastSearch){
      // let action = search.split(':')[0];

      // let subWrapper = $('')
    }
  }

  // InitQuery(key, value) {
  //   this.urlData[urlid] = window.location[urlid];
  // }

  static LoadPage(name){
    let url = 'includes/pages/'+ name + '.php';
    if(Site.editorOverride){

      return;
    }
    $.ajax({
      type: "POST",
      url: url,
      data: {},
      enctype: 'multipart/form-data',
      cache: true,
      beforeSend: function(){
        if(Navigator.navCache.contains(url)){
          var elm = $(Navigator.navCache.get(url));

          $(Site.contentWrapper[0]).html('');
          $(Site.contentWrapper[0]).append(elm);
          return false;
        }
        return true;
      },
      success: function(data){
        // console.log('*****append content disabled. Navigation.js Line 201-203.');
        var elm = $(data);
        $(Site.contentWrapper[0]).html('');
        $(Site.contentWrapper[0]).append(elm);

        Navigator.navCache.set(url, data);
      },
      error: function() {
        hsh('404');
      },
      async: false,
    });
  }
}

Navigator.urlData = {
  hash: ['~','~'],
  search: ['~','~'],
}

Navigator.navCache = {
  data:{},
  contains: function(key){
    return Navigator.navCache.hasOwnProperty(key) && Navigator.localCache.data[key] !== null;
  },
  get: function(key){
    return Navigator.navCache.data[key];
  },
  set: function(key, data){
    Navigator.navCache.data[key] = data;
  },
  remove: function(key){

  }
}

function hsh(h){
    window.location.hash = h;
}
