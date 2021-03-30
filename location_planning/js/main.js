// -----------------------------------------------------------
// Main functionality
// (depending on the esri JS libraries)
// -----------------------------------------------------------	
require(["esri/Map", "esri/views/MapView", "esri/Graphic", "esri/layers/GraphicsLayer"], function (Map, MapView, Graphic, GraphicsLayer) {

	$("button").click(function () {
		var clicked = $(this).attr("name");

		if (clicked.localeCompare("run") == 0) {					//not finish
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
		id:"circle"
	});
	
	esriMap.addMany([clickPointLayer, circleLayer]);
	
	myApp = new APP(esriMap, esriView);
});