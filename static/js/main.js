var gridster;
var study_element;

var selected = new Set();
var linksCollection = [ "1-2" ];

class linksCollection {
  constructor(initalCollection) {
      this.links = [];
      this.firstFreeIndex = 0;
    }
  
  add(id) {
    if (this.links.findIndex(id) > -1) {
      console.log("There is already a link for this pair");
    }
    else {
      console.log("Adding a new link to reference");
      this.links[this.firstFreeIndex] = id;
      const justAssignedIndex = this.firstFreeIndex;
      do {
        this.firstFreeIndex += 1;
      } while (this.link[this.firstFreeIndex]);
    }
    return justAssignedIndex;
  }

  del(id) {
    const linkIndex = this.links.findIndex(id)
    if ( linkIndex > -1) {
      console.log("There is indeed a link for this pair, let's remove it");
      this.links[linkIndex] = null;
      this.firstFreeIndex = Math.min(this.firstFreeIndex, linkIndex);
    }
    else {
      console.log("No such link!");
    }
    return linkIndex;
  }

}



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

function link_prototype(link_data) {

  const link_template = `
  <path
    id="${link_data.id}"
    d="m0 0"
    stroke="#B0B0B0"
    fill="none"
    stroke-width="3px";/>
`
  return link_template;
}

function referenceLink(item, index) {
  console.log(item);
  if (item.link) {
    console.log("This item needs a reference link");
    const linkId = item.id+"-"+item.link;

    if (linksCollection.filter(elt => elt.id == linkId).length) {
      console.log("There is already a link reference present.");
    }
    else {
      console.log("Adding an svg reference link right now.");
      i = 0;
      do {

      } while (i = linksCollection.svgs);
      linksCollection.push({"id": linkId, "svgId": 0});
    }

    console.log(linkId);
    console.log(item.id);
    console.log(item.link);
    //$("#svg1").attr("height", "0");
    //$("#svg1").attr("width", "0");
    //connectElements($("#svg1"), $("#"+linkId), $("#"+item.id),  $("#"+item.link));
  }
  else {
    console.log("No link this time");
  }
}

function createLinkSvg(item, index) {
  console.log(item);
  if (item.link) {
    console.log("This item needs a link to be created");
    var svgField = $('#svg1');
    const linkId = item.id+item.link;
    const elementExists = document.getElementById(linkId);
    if (elementExists) {
      console.log("There is already a link present.");
    }
    else {
      console.log("Adding an svg link right now.");
      svgField.append(link_prototype({"id": linkId}));
    }
    console.log(linkId);
    console.log(item.id);
    console.log(item.link);
    //$("#svg1").attr("height", "0");
    //$("#svg1").attr("width", "0");
    //connectElements($("#svg1"), $("#"+linkId), $("#"+item.id),  $("#"+item.link));
  }
  else {
    console.log("No link this time");
  }
}

function connectIfLink(item, index) {
  console.log(item);
  if (item.link) {
    console.log("This item has a link");
    const linkId = item.id+item.link;
    console.log(linkId);
    console.log(item.id);
    console.log(item.link);
    console.log($("#svg1"));
    console.log($("#"+linkId));
    console.log($("#"+item.id));
    console.log($("#"+item.link));
    const pathId = linksCollection[linkId];
    connectElements($("#svg1"), $("#"+pathId), $("#"+item.id),  $("#"+item.link));
  }
  else {
    console.log("No link this time");
  }
}

function connectLink(item, index) {
  console.log("In connecting link");
  console.log(item);
  if (item.link) {
    console.log("This item has a link");
    const linkId = item.id+item.link;
    console.log(linkId);
    console.log(item.id);
    console.log(item.link);
    console.log($("#svg1"));
    console.log($("#"+linkId));
    console.log($("#"+item.id));
    console.log($("#"+item.link));
    const pathId = linksCollection[linkId];
    connectElements($("#svg1"), $("#"+pathId), $("#"+item.id),  $("#"+item.link));
  }
  else {
    console.log("No link this time");
  }
}


function connectAll() {
  // connect all the paths you want!
  console.log("Connecting...");
  var grid = gridster.serialize();
  console.log(grid);
  grid.forEach(connectIfLink);
  //connectElements($("#svg1"), $("#pathcard01card02"), $("#card01"),  $("#card02"));
}

function createAll() {
  // connect all the paths you want!
  console.log("Creating all links...");
  var grid = gridster.serialize();
  console.log(grid);
  grid.forEach(createLinkSvg);
  //connectElements($("#svg1"), $("#path2"), $("#card02"),  $("#card05"));
}

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

  if (elt.link) {
    console.log("Handling some link...");
    //$('#svg1').append(link_prototype({"id": "3"}));
  }
}

function loadGridFromSerialized(serialized) {
  var jsonGrid = JSON.parse(serialized);
  console.log("Importing previously saved grid...")
  console.log(jsonGrid)
  gridster.remove_all_widgets();
  jsonGrid.forEach(element => add_one_widget(element));
  jsonGrid.filter(elt =>  elt['link']).forEach(elt => displayLink);
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
  createAll();
  setTimeout(connectAll, 1000);
}



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

  console.log("Coucou");

  //$( "#outer" ).click(function(e) {
  //  console.log(e);
  //});


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
      console.log("Enter has been pressed! Connect");
      console.log(selected);
      if (selected.size == 2) {
        console.log("There are two items in selection");
        const elements_iterator = selected.values();
        const first_element = elements_iterator.next().value;
        const second_element = elements_iterator.next().value;
        console.log(first_element);
        console.log(second_element);
        $("#"+first_element).attr("link", second_element);
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
      last_element_name= gridster.$widgets[gridster.$widgets.length-1].id;
      last_element_id_str=  last_element_name.substring(last_element_name.length - 2, last_element_name.length);
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
  createAll();


  //  const input = document.querySelector('#content');
  //
  //  input.addEventListener('keyup', handleKeyUp);
  //  input.addEventListener('blur', handleBlur);
  //loadGrid(json_grid);

});


//TODO: Add yaml save support
//TODO" Add decent font resize on task-card resize
//TODO" Add decent font resize on window resize or zoom level change
