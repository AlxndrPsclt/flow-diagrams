$(document).ready(function(){

	var gridster;
	console.log("Coucou");

	gridster = $(".gridster ul").gridster({
		widget_base_dimensions: [200, 200],
		widget_margins: [5, 5],
		shift_widgets_up: false,
		shift_larger_widgets_down: false,
		collision: {
			wait_for_mouseup: true
		},
		resize: {
			enabled: true
		}
	}).data('gridster');


	$('.js-resize-random').on('click', function () {
		gridster.resize_widget(gridster.$widgets.eq(getRandomInt(0, 9)),
			getRandomInt(1, 4), getRandomInt(1, 4))
	});
})
