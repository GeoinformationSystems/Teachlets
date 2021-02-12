// should be moved to the calculation in sa.js
function calculateDifferance(p1, p2) {
	return Math.sqrt(
		Math.pow((p2.getX() - p1.getX()),2)
		+
		Math.pow((p2.getY() - p1.getY()),2)
	);
}

/*function getMiddlePoint(p1,p2){						//not necessary?
	return new POINT(
		(p1.getX() + p2.getX())/2,
		(p1.getY() + p2.getY())/2
	);
}*/

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
		center: [10.4541205,51.164305],
	});

	var clickPointLayer = new GraphicsLayer({
		id:"clickPoint"
	});
	var circleLayer = new GraphicsLayer({
		id:"cirlce"
	});
	
	esriMap.addMany([clickPointLayer, circleLayer]);
	
	myApp = new APP(esriMap, esriView);
});