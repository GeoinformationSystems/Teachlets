function calculateDifferance(p1,p2){
	return Math.sqrt(
		Math.pow((p2.getX() - p1.getX()),2)
		+
		Math.pow((p2.getY() - p1.getY()),2)
	);
}

function mycompare(a,b) {
	if (a.distance < b.distance)
		return -1;
	if (a.distance > b.distance)
		return 1;
	return 0;
}

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

	
	myModel = new MODEL(cellSize,"#drawfield"); //size defaultvalue uniqueid rows = colums
	
	$("#drawfield").click(function(e){
		var x = e.pageX - this.offsetLeft;
		var y = e.pageY - this.offsetTop;
		var value = prompt("Bitte geben Sie einen Wert für diese Station ein. / Please enter a value for this station.", "0"); 
		if(value != null && isNumber(value)) myModel.addStation(x,y,value);
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
			myModel.runIDW();
		}
		if(clicked.localeCompare("resetAll") == 0){
			myModel.resetAll();
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