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
		var value = prompt("Bitte geben Sie einen Wert für diese Station ein.", "0");
		if(value != null && isNumber(value)) myModel.addStation(x,y,value);
	});
	
	$("button").click(function(){
		var clicked = $(this).attr("name");
		
		if(clicked.localeCompare("runIdw") == 0){
			myModel.runIDW();
		}
		
		if(clicked.localeCompare("resetAll") == 0){
			myModel.resetAll();
		}
	});
});