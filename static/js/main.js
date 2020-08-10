var gridster;

function connectAll() {
    // connect all the paths you want!
    console.log("Connecting...");
    connectElements($("#svg1"), $("#path1"), $("#card01"),  $("#card02"));
}

$(document).ready(function(){

	console.log("Coucou");

//$( "#outer" ).click(function(e) {
//  console.log(e);
//});


	gridster = $(".gridster ul").gridster({
		widget_base_dimensions: [200, 200],
		widget_margins: [0, 0],
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
			col=Math.floor(e.pageX / 200)+1;
			row=Math.floor(e.pageY / 200)+1;
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

	const input = document.querySelector('#content')

	input.addEventListener('keyup', handleKeyUp)
	input.addEventListener('blur', handleBlur)

})
