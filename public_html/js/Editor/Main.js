


//temp JSON data
var componentData = {
  //if specific component data is changed, add its unique id to an array to re-render its css and html

  //component id is generated randomly or incrementally
    0 : {
      style : {
        position:'absolute',
        left : '0',
        top : '0',
        width : '20%',
        height : '35%',
        border: 'black 1.7px solid',
        'border-radius': '5px',
      },
      transform : {
        origin: [0,0],
        width: 10,
        height: 10,
      },
      content:'temp component',
    },
    1 : {

      style : {
        position:'absolute',
        left : '50%',
        top : '30%',
        width : '20%',
        height : '35%',
        border: 'black 1.7px solid',
        'border-radius': '5px',
      },
      content:'temp component child',
      // parent id refers to the parent component
      parent: 0,
    }

};








// keymaps for shortcuts
// var keymap = {};
// prepare listeners on load
// $(document).ready( () => {
//   document.addEventListener('keydown', e => {
//     keymap[e.code] = 1;
//     console.log(e.code, e.keyCode);
//     // run functions associated with shortcuts
//     KeyFunctions();
//   });
//   document.addEventListener('keyup', e => {
//     delete keymap[e.code];
//   });
// });

// function KeyFunctions(){
//   if( ('KeyC' in keymap) /* && (('ControlRight' in keymap)||('ControlLeft' in keymap)) */ ){
//     // alert('n');
//
//     // show the quick command consoles
//     // create an element on the dom
//   }
// }

// creating a new component



//editor view

class Editor {
  constructor(){

  }

  static Init(){
    //load and render JSON data
    RenderComponents(componentData);





    // prepare editor buttons and functionality
    let editComp = document.getElementById('editComp');
    let editMove = document.getElementById('edit_move');
    Editor.compToolPanel = document.getElementById('comp_tool_panel');


    // when the edit button of a component is clicked, set Editor.compToEdit to the corresponding component.
    editComp.addEventListener('mousedown', (e) => {
      let panel = Editor.compToolPanel;
      let comp = panel.parentElement;


      // Editor.compToMove = {comp: comp, ox: parseFloat(e.pageX) - parseFloat(comp.style.left), oy: parseFloat(e.pageY) - parseFloat(comp.style.top), cont: comp.parentElement};

      if(panel.classList.contains('editMode')) {
        panel.classList.add('editMode');
        Editor.compToEdit = {comp: comp, ox: parseFloat(e.pageX) - parseFloat(comp.style.left), oy: parseFloat(e.pageY) - parseFloat(comp.style.top), cont: comp.parentElement};
      }

      // console.log(e);
    });

    editMove.addEventListener('mousedown', e => {
      let comp = Editor.compToolPanel.parentElement;
      Editor.compToMove = {comp: comp, ox: parseFloat(e.pageX) - parseFloat(comp.style.left), oy: parseFloat(e.pageY) - parseFloat(comp.style.top), cont: comp.parentElement};
    });
    // component's position is no longer being modified
    editMove.addEventListener('mouseup', (e) =>{
      Editor.compToMove = null;
    });



    document.addEventListener('mousemove', (e) => {
      // handle component movement
      if(Editor.compToMove){

        let comp = Editor.compToMove;
        let c = comp.comp;

        // modify the style of the moved component (for live editing)
        c.style.left = e.pageX - comp.ox;
        c.style.top = e.pageY - comp.oy;

        // modify the json data of the moved component
        // componentData[c.dataset['uid']].style.left = e.pageX = comp.ox;
        // componentData[c.dataset['uid']].style.top = e.pageY = comp.oy;


      }
      if(Editor.compToScale){

      }
      if(Editor.compToRotate){}
    });


    document.addEventListener('mousedown', (e) => {

      if(Editor.compToEdit) {
        let comp = Editor.compToEdit.comp;
        let toolPanel = Editor.compToolPanel;
        if(!comp.contains(e.target)){
          toolPanel.classList.remove('editMode');
          Editor.compToEdit = null;

          // console.log(e.path[0]);

          if(e.target.dataset['uid'])
            e.target.append(toolPanel);
          else
            $('body').append(toolPanel);
        }
        else if(e.target.dataset['uid'] && e.target != Editor.compToEdit.comp){
          // console.log(e.target);
          Editor.compToEdit = null;
          toolPanel.classList.remove('editMode');
          e.target.append(Editor.compToolPanel);
        }

        // toolPanel.classList.remove('editMode');
        // Editor.compToEdit = null;
        //
        // if(e.target.dataset['uid'])
        //   e.target.append(toolPanel);
        // else
        //   $('body').append(toolPanel);
      }
    });
  }

  static Update(dt){

  }
}


// will render from a server-side json file in the future
function RenderComponents(componentData){

  // if(componentData)
    for(let c in componentData){

      let comp = componentData[c];
      const newComp = document.createElement("div");

      newComp.dataset['uid'] = c;
      // newComp.addClass('can-edit');

        newComp.addEventListener('mouseover', e => {
          if($(e.path[0])[0] == newComp && !Editor.compToEdit)
            $(e.path[0]).append(Editor.compToolPanel);

          // console.log(this);
        });


      newComp.addEventListener('mouseleave', e => {
        if(!Editor.compToEdit)
          $('body').append(Editor.compToolPanel);
      });


      comp.element = newComp;

      // console.log(componentData[comp.parent].element);


      const compContent = document.createTextNode(comp.content);

      newComp.appendChild(compContent);

      let componentStyle = '';
      for(let s in comp.style){
        if(s == 'left'){
          if(comp.style['width'] < 1){

          }
          else {
            componentStyle += s +':'+comp.style[s]+';';
          }
          continue;
        }
        componentStyle += s+':'+comp.style[s]+';';
      }
      newComp.style.cssText = componentStyle;


      // console.log(comp.parent);
      if('parent' in comp)
        componentData[comp.parent].element.appendChild(newComp);
      else
        document.getElementById('content_wrapper').appendChild(newComp);

      // return newComp;
    }
}

Editor.compToMove = null;
Editor.compToEdit = null;
