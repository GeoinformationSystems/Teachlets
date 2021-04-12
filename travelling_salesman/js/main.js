// should be moved to the calculation in SA.js 
function calculateDifference(p1,p2){
	return Math.sqrt(
		Math.pow((p2.getX() - p1.getX()),2)
		+
		Math.pow((p2.getY() - p1.getY()),2)
	);
}

// -----------------------------------------------------------
// Main functionality
// (depending on the esri JS libraries)
// -----------------------------------------------------------	
require(["esri/Map", "esri/views/MapView", "esri/Graphic", "esri/layers/GraphicsLayer"], function (Map, MapView, Graphic, GraphicsLayer) {	

	// start configuration on load
	// default lang is German => hide all English elements
	$('[lang="en"]').hide();
	$('button[name="de"]').prop("disabled", true);

	// add click handler to all elements of type button
	$("button").click(function () {

		// get name of button
		var clicked = $(this).attr("name");

		// determine which button is clicked based on "name" attribute
		if (clicked.localeCompare("run") == 0) {
			myApp.simAnnealing();
		}
		// does not work as expected => do not use for now => no button
		if (clicked.localeCompare("runAnimated") == 0) {
			intervalId = myApp.simAnnealingAnimated(2000);
		}
		if (clicked.localeCompare("reset") == 0) {
			myApp.reset();
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

	var esriMap = new Map({
		basemap: "streets-relief-vector",
	});

	var esriView = new MapView({
		container: "content",
		map: esriMap,
		center: [10.4541205, 51.164305],
	});

	var clickPointLayer = new GraphicsLayer({
		id: "clickPoint"
	});

	var connectingLineLayer = new GraphicsLayer({
		id: "connectingLine"
	});

	esriMap.addMany([clickPointLayer, connectingLineLayer]);

	myApp = new APP(esriMap, esriView);
});