var gridster;

var json_grid = ' [ {"col": 2, "row": 1, "size_x": 2, "size_y": 1}, {"col": 2, "row": 3, "size_x": 1, "size_y": 1} ] ';

function connectAll() {
    // connect all the paths you want!
    console.log("Connecting...");
    connectElements($("#svg1"), $("#path1"), $("#card01"),  $("#card02"));
}

function saveGridToLocalstorage(name, serialized_grid) {
	console.log("Saving grid...");
	localStorage.setItem(name, serialized_grid);
	console.log("Saved.");
	console.log(serialized_grid);
}

function saveGrid(name) {
	console.log("Exporting grid...");
	const serialized_grid = JSON.stringify(gridster.serialize());
	console.log(serialized_grid);
	saveGridToLocalstorage(name, serialized_grid);
}

function add_one_widget(elt) {
	gridster.add_widget('<li class="task-card" id="card03">YEAAAH</li>"', elt.size_x, elt.size_y, elt.col, elt.row);
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

	$("#svg1").attr("height", "0");
	$("#svg1").attr("width", "0");
	connectAll();

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
			col=Math.floor(e.pageX / 205)+1;
			row=Math.floor(e.pageY / 205)+1;
			console.log(e.pageX);
			console.log(col);
			console.log(e.pageY);
			console.log(row);
			gridster.add_widget('<li class="task-card" id="card03">YEAAAH</li>"', 1, 1, col, row);

		} else {
		  console.log("The CTRL key was NOT pressed!");
		}

	});


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

	const input = document.querySelector('#content');

	input.addEventListener('keyup', handleKeyUp);
	input.addEventListener('blur', handleBlur);
	
  //loadGrid(json_grid);

})
