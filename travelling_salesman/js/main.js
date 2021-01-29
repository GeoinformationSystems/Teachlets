// should be moved to the calculation in SA.js and maybe renamed "Differance"? :-)
function calculateDifferance(p1,p2){
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

	$("button").click(function () {
		var clicked = $(this).attr("name");
		
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