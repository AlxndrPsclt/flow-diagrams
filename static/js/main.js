var gridster;
var study_element;

const json_grid = ' [ {"col": 2, "row": 1, "size_x": 2, "size_y": 1}, {"col": 2, "row": 3, "size_x": 1, "size_y": 1} ] ';


function card_prototype(card_data) {

  const card_template = `
<li class="task-card" id="${card_data.id}">
  <div class="task-cell task-title" id="task-title-${card_data.id}">
    <input type="text"/>
  </div>
  <div class="task-cell task-content" id="task-content-${card_data.id}">
    <textarea id="content-${card_data.id}" name="task-content" placeholder="..." ></textarea>
  </div>
</li>
`
  return card_template;
}


function connectAll() {
  // connect all the paths you want!
  console.log("Connecting...");
  connectElements($("#svg1"), $("#path1"), $("#card01"),  $("#card02"));
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
}

function loadGridFromSerialized(serialized) {
  var jsonGrid = JSON.parse(serialized);
  console.log("Importing previously saved grid...")
  console.log(jsonGrid)
  gridster.remove_all_widgets();
  jsonGrid.forEach(element => add_one_widget(element));
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
          // This is a click inside. Do nothing, just return.
          console.log("Clicked inside!");
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
  connectAll();


  //  const input = document.querySelector('#content');
  //
  //  input.addEventListener('keyup', handleKeyUp);
  //  input.addEventListener('blur', handleBlur);
  //loadGrid(json_grid);

});


//TODO: Add yaml save support
//TODO" Add decent font resize on task-card resize
//TODO" Add decent font resize on window resize or zoom level change
