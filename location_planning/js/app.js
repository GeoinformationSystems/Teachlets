// -----------------------------------------------------------
// Constructor
// Parameters:
// - myMap: ESRI Map Object
// - myView: ESRI MapView Object
// -----------------------------------------------------------
function APP(myMap, myView) {										
	// initialize properties of APP instance
	this.networkLocations = [];
	this.myMap = myMap;
	this.myView = myView;
	this.myView.on("click", this.onClickEvent);
	// reset just to be save that everything is cleared
	this.reset();
}

// -----------------------------------------------------------
// Reset everything
// -----------------------------------------------------------
APP.prototype.reset = function () {									//finish
	// clear the array of networkLocations (clicked points)
	this.networkLocations = [];
	// clear both used drawing layers
	this.myMap.findLayerById("clickPoint").removeAll();
	this.myMap.findLayerById("circle").removeAll();
	// set original map center and zoom level
	this.myView.center = [10.4541205, 51.164305];
	this.myView.zoom = 6;
}

// -----------------------------------------------------------
// Click event on map: draw marker and save clicked location
// Parameters:
// - event: data regarding event (like clicked position)
// -----------------------------------------------------------
APP.prototype.onClickEvent = function (event) {								//finish
	// create a point from clicked map coordinates
	var point = new POINT(event.mapPoint.longitude, event.mapPoint.latitude);
	// get the ESRI Graphics layer to draw points
	var myLayer = myApp.myMap.findLayerById("clickPoint");

	// save the clicked point to the networkLocations array
	myApp.networkLocations.push(point);

	require(["esri/Graphic"], function (Graphic) {
		// create the point as ESRI Graphic
		var graphic = new Graphic({
			geometry: {
				type: "point",
				latitude: point.getY(),
				longitude: point.getX(),
			},
			symbol: {
				type: "simple-marker",
				color: [0, 158, 224],				//here change color of points
				size: "8px",
				outline: {
					color: [0, 37, 87],
					width: 1
				}
			}
		});
		// add point to layer
		myLayer.add(graphic);
	});
};

// -----------------------------------------------------------
// Calculate the smallest surrounding circle 
// -----------------------------------------------------------
APP.prototype.simAnnealing = function () {											
	// 0 points on map => throw error and cancel calculation			//finish
	if (this.networkLocations.length == 0) {
		alert("[ERROR] Es wird mindestens 1 Punkt benötigt.");
		return false;
	}
	// create simulation instance
	var instance = new SA(this.networkLocations, 1000, 0.000001, 1000);				//?
	// run the simulation and get connection for smallest surrounding circle		
	var connections = instance.run();												//finish
	// draw the result on the map
	this.redrawConnections(connections);											//finish
};

// ToDo: show reasonable steps to demonstrate the process				 
// might need some math to figure that out
APP.prototype.simAnnealingAnimated = function (ms) {								
	if (this.networkLocations.length == 0) {										//finish
		alert("[ERROR] Es wird mindestens 1 Punkt benötigt.");
		return false;
	}
	var instance = new SA(this.networkLocations, 10, 0.000001, 2);				//?

	var id = setInterval(function () {											//?
		var result = instance.runOneStep();

		if (result) {
			myApp.redrawConnections(result);
		} else {
			clearInterval(id);
		}
	}, ms);

	return id;
};

// -----------------------------------------------------------
// Redraw connections between networkLocations							
// Parameters:
// - calculatedConnections: array of identifier pairs (IDs of points in networkLocations)		
// -----------------------------------------------------------
APP.prototype.redrawConnections = function (calculatedConnections) {					
	var allPoints = this.networkLocations;									//finish
	var myLayer = this.myMap.findLayerById("circle");						//finish

	// clear points and drawn circle from layer	
	myLayer.removeAll();													//finish

	// draw the circle for each calculated connection
	$.each(calculatedConnections, function (index) {						//not sure if correct		
		require(["esri/geometry/Circle", "esri/symbols/SimpleFillSymbol", "esri/graphic"], function (Circle, SimpleFillSymbol,Graphic) {			
			// create the circle as ESRI Graphic
			var circle = new Circle({
				ring: allPoints,
				//center:
				//radius:
				numberOfPoints: allPoints
			});
			var symbol = new SimpleFillSymbol().setColor(null).outline.setColor("blue");
			var graphic = new Graphic(circle, symbol);
			// add circle to layer 'circle'
			myLayer.add(graphic);
		});
		// repeat for all calculated connections given
	});
};
