
$(function() {	
	var canvas = $("#drawfield");
	canvas[0].width=canvas.parent().width();
	canvas[0].height=canvas.parent().height()
	
	canvas = d3.select("canvas");

	var numberOfPoints = 7;
	var myAppInstance = new APP(numberOfPoints, 50, "#drawfield"); //size defaultvalue uniqueid rows = colums

	canvas
		.call(d3.drag()
			.on("start", e => myAppInstance.findNearestPoint(e.subject.x, e.subject.y, 10))
			.on("drag", e => {
				if(myAppInstance.dragSubject >= 0) {
					myAppInstance.pointList[myAppInstance.dragSubject].setX(e.x);
					myAppInstance.pointList[myAppInstance.dragSubject].setY(e.y);
					myAppInstance.update();
				}
			})
		);
	
	$(':checkbox').each(function(i){
		$(this).parent().find("span").css('background-color', myAppInstance.colors[i]);
	});	
	
	$(':checkbox').change(function() {
		myAppInstance.show[this.value] = $(this).is(":checked");
		myAppInstance.update();
    }); 

	// default lang is German => hide all English elements
	$('[lang="en"]').hide();
	$('button[name="de"]').prop("disabled", true);

	// add click handler to all elements of type button
	$("button").click(function () {
		// get name of button
		var clicked = $(this).attr("name");

		if (clicked.localeCompare("en") == 0) {
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