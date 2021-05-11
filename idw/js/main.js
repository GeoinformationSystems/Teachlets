
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

$(function() {
	// resize canvas to fill parent (keep square)
	var cellSize = 10;
	var canvas = $("#drawfield");
	var minSize = Math.min(canvas.parent().width(), canvas.parent().height());
	canvas[0].width=Math.round(minSize/cellSize)*cellSize;
	canvas[0].height=Math.round(minSize/cellSize)*cellSize;

	
	var myAppInstance = new APP(cellSize,"#drawfield"); //size defaultvalue uniqueid rows = colums
	
	$("#drawfield").click(function(e){
		var x = e.pageX - this.offsetLeft;
		var y = e.pageY - this.offsetTop;
		var value = prompt("Bitte geben Sie einen Wert für diese Station ein. / Please enter a value for this station.", "0"); 
		if(value != null && isNumber(value)) myAppInstance.addStation(x,y,value);
	});

	// default lang is German => hide all English elements
	$('[lang="en"]').hide();
	$('button[name="de"]').prop("disabled", true);

	// add click handler to all elements of type button
	$("button").click(function () {
		// get name of button
		var clicked = $(this).attr("name");

		// determine which button is clicked based on "name" attribute
		if(clicked.localeCompare("runIdw") == 0){
			myAppInstance.runIDW();
		}
		if(clicked.localeCompare("resetAll") == 0){
			myAppInstance.resetAll();
		}
		else if (clicked.localeCompare("en") == 0) {
			$('[lang="en"]').show();
			$('[lang="de"]').hide();
			$('button[name="en"]').prop("disabled", true);
			$('button[name="de"]').prop("disabled", false);
		}
		else if (clicked.localeCompare("de") == 0) {
			$('[lang="de"]').show();
			$('[lang="en"]').hide();
			$('button[name="de"]').prop("disabled", true);
			$('button[name="en"]').prop("disabled", false);
		}
	});
});