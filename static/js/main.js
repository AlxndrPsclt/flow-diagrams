var gridster;

function connectAll() {
    // connect all the paths you want!
    console.log("Connecting...");
    connectElements($("#svg1"), $("#path1"), $("#card01"),  $("#card02"));
}

$(document).ready(function(){

	console.log("Coucou");

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


	$("#svg1").attr("height", "0");
	$("#svg1").attr("width", "0");
	connectAll();

})
