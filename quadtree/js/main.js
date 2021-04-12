$(function() {
	// resize canvas to fill parent (keep square)
	var canvas = $("#drawfield");
	var minSize = Math.min(canvas.parent().width(), canvas.parent().height());
	canvas[0].width=minSize;
	canvas[0].height=minSize;
	
	var myAppInstance = new APP(8,0,"#drawfield"); //size defaultvalue uniqueid rows = colums
	
	$("#drawfield").click(function(e){
		var x = e.pageX - this.offsetLeft;
		var y = e.pageY - this.offsetTop;
		myAppInstance.invertRasterDataValue(x,y);
		myAppInstance.refresh();
	});

	// default lang is German => hide all English elements
	$('[lang="en"]').hide();
	$('button[name="de"]').prop("disabled", true);

	// add click handler to all elements of type button	
	$("button").click(function () {
		// get name of button
		var clicked = $(this).attr("name");

		// determine which button is clicked based on "name" attribute
		if(clicked.localeCompare("resetRaster") == 0){
			$('#resultChart').html("");
			myAppInstance.resetRaster();
			myAppInstance.refresh();
		}
		if(clicked.localeCompare("runQuad") == 0){
			$('#resultChart').html("");
			myAppInstance.startQuad();
		}
		if(clicked.localeCompare("help") == 0){
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