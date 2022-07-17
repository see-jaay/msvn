//   Queries.js is basically an interface for ajax server calls
//          -- updates the current page
//          -- updates any element on the page . an alternate to site refreshing links <a href> and <
//          -- queries databases (live, dynamic search results)



// Update continuously compares the current hash to the last hash
// if the current hash is different update the data and

// The Navigator takes any present hash, search, or unique values in the url
// and triggers a corresponding ajax request to load pages, html blocks, search data, etc.
class Navigator {
  constructor(){

  }

  static Update(dt){
    Navigator.update
  }

  static HashTo(hash){

    SiteManager.LoadPage(hash);

    Navigator.last.hash = hash;
  }

  static Search(){
    Navigator.last.search = search;
  }
}


// lastLocDat Last location data copies the last changed url hash, search and custom values.
Navigator.lastLocDat = {
  hash: '~',
  search: '~',
};

//update the location hash value
function updhsh(h){
  window.location.hash = h;
}
