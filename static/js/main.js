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
		widget_margins: [5, 5],
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
	});
})
