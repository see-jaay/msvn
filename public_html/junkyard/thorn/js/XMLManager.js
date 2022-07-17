

var xmlObjects;

// class XMLManager {
//   constructor () {
//     this.liveXML = {};
//     this.tempXML = {};
//   }
//
//   Init(){
//     LoadDoc('includes/xml_manager.php', function(xhr){
//       // console.log("response: " + xhr.response + "\n" + "responseXML: " + xhr.responseXML);
//       // console.log(xhr);
//
//       var data = JSON.parse(xhr.responseText);
//       xmlObjects = data;
//       console.log(data);
//
//       $('#editor_panel_secondary_wrapper > .inner').html(xhr.response);
//     });
//   }
// }

function SetXMLSession(filePath, sessionVar)
{
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "./" + filePath, true);
  xhr.send();

  // xhr.onreadystatechange = (xhr.readyState == 4 && xhr.status == 200) ? fn(xhr) : console.log("no document here");
  xhr.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200)
    {
      sessionVar = JSON.parse(this.response);
    }
  }
}


function UpdateLocalXML(fileName, xml) {
  xmlObjects[fileName] = xml;
}

function EditLocalXML (fileName, xmlRoot) {

}

// function SaveXML() {
//
// }

// class XMLDoc {
//   constructor(name, path)
//   {
//     this.name = name;
//     this.path = path;
//     this.request
//   }
//
//   open(action, path) {
//     this.
//   }
// }

function PageXML(fileName) {
  // var xhr = new XMLHttpRequest();
  // xhr.open("GET", './xml/' + fileName, true);
  // xhr.send();
  //
  // xhr.onreadystatechange = function() {
  //   if (this.readyState == 4 && this.status == 200) {
  //       UpdateLocalXML(fileName, this.responseXML);
  //    }
  // }
  // var xmlMan = new XMLManager();
  //
  // xmlMan.Init();
}


function LoadXML(name, tag, fn){

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // window.XMLData[name] = this;
            // window.XMLData[name + '_'] = this.getElementsBtTagName;

            // foreach(obj in this.getElementsByTagName(tag)){
            var xml;

            if(tag != null)
              xml = this;
            else
              xml = this.getElementsByTagName(tag);

            fn(xml);
        }
    }

    xhttp.open("GET", './xml/' + name + '.xml', true);
    xhttp.send();

    // return xhttp.responseXML;
}

function XMLtoHTML(xml) {

}

function XMLasList(xmlObjs)
{
  // var html = $('<div></div>');
  //
  // foreach(xmlObjs as tag => obj)
  // {
  //   html.appendChild(xmlObjs[]);
  // }
  //
  // return html;
}

function SaveResponse(name, xml){

}
// function myFunction(xml) {
//     var xmlDoc = xml.responseXML;
//     var x = xmlDoc.getElementsByTagName("book")[0];
//     document.getElementById("demo").innerHTML = x.parentNode.nodeName;
// }
