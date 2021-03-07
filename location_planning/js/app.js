// -----------------------------------------------------------
// Constructor
// Parameters:
// - myMap: ESRI Map Object
// - myView: ESRI MapView Object
// -----------------------------------------------------------
function APP(myMap, myView) {										//edit is finished
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
APP.prototype.reset = function () {									//edit is finished
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
APP.prototype.onClickEvent = function (event) {								//edit is finished
	// create a point from clicked map coordinates
	var point = new POINT(event.mapPoint.longitude, event.mapPoint.latitude);
	// get the ESRI Graphics layer to draw points
	var myLayer = myApp.myMap.findLayerById("clickPoint");

	//console.log("POINT:", point);
	//console.log("LNG:", event.mapPoint.longitude);
	//console.log("LAT:", event.mapPoint.latitude);

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
		// add point to layer 'clickPoint'
		myLayer.add(graphic);
	});
};

// -----------------------------------------------------------
// Calculate the smallest surrounding circle 
// -----------------------------------------------------------
APP.prototype.simAnnealing = function () {											
	// create simulation instance
	var instance = new BOUNDINGCIRCLE(c,r);													//?
	// run the simulation and get connection for smallest surrounding circle		
	var connections = instance.run();
	// draw the result on the map
	this.redrawConnections(connections);
};

// ToDo: show reasonable steps to demonstrate the process				 
// might need some math to figure that out
APP.prototype.simAnnealingAnimated = function (ms) {								//not sure if we need this
	var instance = new BOUNDINGCIRCLE(this.networkLocations, 10, 0.000001, 2);

	var id = setInterval(function () {
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
// Redraw connections between netwirkLocations							
// Parameters:
// - calculatedConnections: array of identifier pairs (IDs of points in networkLocations)		
// -----------------------------------------------------------
APP.prototype.redrawConnections = function (calculatedConnections) {					
	var allPoints = this.networkLocations;
	var myLayer = this.myMap.findLayerById("circle");					

	// clear all circles
	myLayer.removeAll();

	// draw the circle for each calculated connection
	$.each(calculatedConnections, function (index, connection) {					
		require(["esri/geometry/Circle", "esri/symbols/SimpleFillSymbol","esri/graphic"], function (Circle,SimpleFillSymbol,Graphic) {			
			// get points for the current connection 
			var currentPoint = allPoints[connection[i]];											//?
			// create the circle as ESRI Graphic
			var circle = new Circle({																//?	
				numberOfPoints: currentPoint,														//?
				ring: [[currentPoint.getX(), currentPoint.getY()],									//?
					[currentPoint.getX(), currentPoint.getY()]],
				center:
				radius:
			});

			var symbol = new SimpleFillSymbol().setColor(null).outline.setColor("blue");

			var graphic = new Graphic(circle, symbol);
			// add circle to layer 'circle'
			myLayer.add(graphic);								
		});
		// repeat for all calculated connections given
	});
};
