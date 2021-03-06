var gridster;
var study_element;

var selected = new Set();

class linksCollection {
  constructor() {
      this.links = [];
      this.firstFreeIndex = 0;
    }

  add(link) {
    console.log("Adding a new link to reference "+link.linkId);
    var currentIndex = this.firstFreeIndex;
    this.links[currentIndex] = {"linkId": link.linkId, "path": currentIndex, "startElt": link.id, "stopElt": link.link};
    do {
      this.firstFreeIndex += 1;
    } while (this.links[this.firstFreeIndex]);
    return currentIndex;
  }

  del(linkIndex) {
    var pathToReset = $('#path'+this.links[linkIndex].path.toString().padStart(2,"0"));
    pathToReset.attr("d", "m0 0");
    this.links[linkIndex].linkId= null;
    this.firstFreeIndex = Math.min(this.firstFreeIndex, linkIndex);
    return linkIndex;
  }

  toggle(link) {
    var linkIndex = -1;
    console.log("Inside toggle linkss");
    console.log(link);
    if (link) {
      linkIndex = this.links.findIndex(elt => elt.linkId == link.linkId);
    }

    if ( linkIndex > -1) {
      console.log("There is already a link for this pair; will delete it");
      this.del(linkIndex);
    }

    else {
      console.log("Adding a new link to reference");
      this.add(link);
    }
    const addedNewLink = (linkIndex == -1);
    return addedNewLink;
  }


  has(linkId) {
    const linkIndex = this.links.findIndex(elt => elt.linkId == linkId);
    return linkIndex;
  }

  empty() {
    this.links = [];
    this.firstFreeIndex = 0;
  }

}


var links = new linksCollection();


function card_prototype(card_data) {

  const card_template = `
<li class="task-card" id="${card_data.id}" link="${card_data.link}">
  <div class="task-cell task-title" id="task-title-${card_data.id}">
    <input type="text" value="${card_data.title}"/>
  </div>
  <div class="task-cell task-content" id="task-content-${card_data.id}">
    <textarea id="content-${card_data.id}" name="task-content" placeholder="...">${card_data.content}</textarea>
  </div>
</li>
`
  return card_template;
}


function addLink(link) {
  console.log("Adding a new link.")
  console.log(link);
  link.link.forEach( lnk => {
    const newLink = { "linkId": link.id+"-"+lnk, "id": link.id, "link": lnk };
    links.add(newLink);
  })
}

function deleteLink(item, linkId) {
  console.log("Deleting a link.")
  console.log(linkId);

  links.del(item);
}

function toggleLink(link) {
  console.log("Toggling a link.")
  console.log(link);
  link["linkId"] = link.id+"-"+link.link;
  const addedNewLink = links.toggle(link);
}

function connect(link) {
  if (link) {
    console.log("Connecting some link " + link.linkId);
    connectElements($("#svg1"), $("#path"+link.path.toString().padStart(2,"0")), $("#"+link.startElt),  $("#"+link.stopElt));
  }
}

function connectAll() {
  console.log("(re)Connecting all...");
  links.links.filter(elt =>  elt.linkId).forEach(connect);
}




//SAVING AND LOADING
function saveGridToLocalstorage(name, serialized_grid) {
  console.log("Saving grid...");
  localStorage.setItem(name, serialized_grid);
  console.log("Not Saved.");
  console.log(serialized_grid);
}

function saveGrid(name) {
  console.log("Exporting grid...");
  const serialized_grid = JSON.stringify(gridster.serialize());
  console.log(serialized_grid);
  saveGridToLocalstorage(name, serialized_grid);
}

function add_one_widget(elt) {
  gridster.add_widget(card_prototype(elt), elt.size_x, elt.size_y, elt.col, elt.row);

  const input = document.querySelector('#content-'+elt.id);

  input.addEventListener('keyup', handleKeyUp);
  input.addEventListener('blur', handleBlur);
}

function loadGridFromSerialized(serialized) {
  var jsonGrid = JSON.parse(serialized);
  console.log("Importing previously saved grid...")
  console.log(jsonGrid)
  gridster.remove_all_widgets();
  links.empty();
  jsonGrid.forEach(elt => add_one_widget(elt));
  jsonGrid.filter(elt =>  elt.link).forEach(elt => addLink(elt));
  connectAll();
}

function loadGridFromLocalStorage(name) {
  console.log("fetchng from local storage...");
  serialized = localStorage.getItem(name);
  console.log(serialized);
  loadGridFromSerialized(serialized);
  // event handler
}

function loadGrid(name) {
  console.log("Loading widgets from previously saved");
  loadGridFromLocalStorage(name);
  //createAll();
  //setTimeout(connectAll, 1000);
}




//EVENTS HANDLING
function handleKeyUp(event) {
  const BASE_FONT_SIZE = 8
  const MIN_FONT_SIZE = 3

  const input = event.target

  const inputLength = input.value.length
  const inputFontSize = input.style.fontSize

  let newFontSize = BASE_FONT_SIZE

  if (inputLength > BASE_FONT_SIZE) {
    newFontSize = BASE_FONT_SIZE - Math.round(inputLength / BASE_FONT_SIZE)
  }

  input.style.fontSize =
    newFontSize < MIN_FONT_SIZE ? `${MIN_FONT_SIZE}vh` : `${newFontSize}vh`
}

function handleBlur(event) {
  const input = event.target

  if (!input.innerText.trim().length) {
    input.innerHTML = ""
  }
}












$(document).ready(function(){

  gridster = $(".gridster ul").gridster({
    widget_base_dimensions: [200, 200],
    widget_margins: [5, 5],
    min_cols: 50,
    min_rows: 50,
    shift_widgets_up: false,
    shift_larger_widgets_down: false,
    collision: {
      wait_for_mouseup: true,
    },
    resize: {
      enabled: true,
      stop: function (e, ui, $widget) {
        connectAll();
      },

    },
    draggable: {
      stop: function (e, ui, $widget) {
        connectAll();
      },
    },
  }).data('gridster');





  $(document).keypress(function(e){

    if ((event.keyCode == 10 || event.keyCode == 13) && event.ctrlKey) {
      console.log("Enter has been pressed!");
      console.log(selected);
      if (selected.size == 2) {
        console.log("There are two items in selection");
        const elements_iterator = selected.values();
        const first_element = elements_iterator.next().value;
        const second_element = elements_iterator.next().value;

        toggleLink({ "id": first_element, "link": second_element});

        connectAll();
        //$("#"+first_element).attr("link", second_element);
      }
    }

  });

  //gridster.add_widget('<li class="task-card" id="card03">YEAAAH</li>"', 1, 1, 3, 4)'"')

  document.addEventListener("click", (e) => {
    if (event.ctrlKey) {
      console.log("The CTRL key was pressed!");

      //TODO: simplify this function by using empty_cell instead of dom tests?? Maybe a good idea

      const flyoutElements = document.getElementsByClassName("task-card");
      const flyoutArray = Array.from(flyoutElements);
      let targetElement = e.target; // clicked element


      do {
        if (flyoutArray.includes(targetElement)) {
          // This is a click inside. Select element.
          console.log(targetElement.id);
          element = $("#"+targetElement.id);

          if (element.hasClass("selected")) {
            selected.delete(targetElement.id);
            element.removeClass("selected");
          }
          else {
            selected.add(targetElement.id);
            element.addClass("selected");
          }
          console.log("Ctrl-clicked inside!");
          console.log(selected);
          return;
        }
        // Go up the DOM
        targetElement = targetElement.parentNode;
      } while (targetElement);

      // This is a click outside.
      console.log("Clicked outside!");
      console.log(e);
      col=Math.floor(e.pageX / 205)+1;    //TODO: take the margin of the container intoo account
      row=Math.floor(e.pageY / 205)+1;
      console.log(e.pageX);
      console.log(col);
      console.log(e.pageY);
      console.log(row);
      last_element_name = gridster.$widgets[gridster.$widgets.length-1].id;
      last_element_id_str = last_element_name.substring(last_element_name.length - 2, last_element_name.length);
      new_element_id_int = parseInt(last_element_id_str) + 1;
      new_element_id_str=new_element_id_int.toString().padStart(2,"0");


      gridster.add_widget(card_prototype({"id": "card"+new_element_id_str}), 1, 1, col, row);

      const input = document.querySelector('#content-card'+new_element_id_str);

      input.addEventListener('keyup', handleKeyUp);
      input.addEventListener('blur', handleBlur);

    } else {
      console.log("The CTRL key was NOT pressed!");

    }


  });

  $("#svg1").attr("height", "0");
  $("#svg1").attr("width", "0");
  //createAll();


  //  const input = document.querySelector('#content');
  //
  //  input.addEventListener('keyup', handleKeyUp);
  //  input.addEventListener('blur', handleBlur);
  //loadGrid(json_grid);

});


//TODO: Add yaml save support
//TODO: Add decent font resize on task-card resize
//TODO: Add decent font resize on window resize or zoom level change
//TODO: Clean code
//
//
//
//SAVED
//

//function link_prototype(link_data) {
//
//  const link_template = `
//  <path
//    id="${link_data.id}"
//    d="m0 0"
//    stroke="#B0B0B0"
//    fill="none"
//    stroke-width="3px";/>
//`
//  return link_template;
//}
