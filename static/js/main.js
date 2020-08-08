$(document).ready(function(){
	var gridster;
	console.log("Coucou");

	gridster = $(".gridster ul").gridster({
		widget_base_dimensions: [100, 100],
		widget_margins: [5, 5],
		shift_widgets_up: false,
		shift_larger_widgets_down: false,
		collision: {
			wait_for_mouseup: true
		}
	}).data('gridster');
})
