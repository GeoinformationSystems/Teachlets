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
	// use Web Mercator units since calculation doesn't work with distortion in WGS84 
	var point = new POINT(event.mapPoint.x, event.mapPoint.y);

	// get the ESRI Graphics layer to draw points
	var myLayer = myApp.myMap.findLayerById("clickPoint");

	// save the clicked point to the networkLocations array
	myApp.networkLocations.push(point);

	require(["esri/Graphic"], function (Graphic) {
		// create the point as ESRI Graphic
		var graphic = new Graphic({
			geometry: {
				type: "point",
				x: point.getX(),
				y: point.getY(),
				spatialReference: {"wkid":102100},		// geometry is given as Web Mercator units
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
APP.prototype.run = function () {											
	// 0 points on map => throw error and cancel calculation			//finish
	if (this.networkLocations.length == 0) {
		alert("[ERROR] Es wird mindestens 1 Punkt benötigt.");		//[ERROR] At least one point is required.
		return false;
	}
	// create simulation instance
	var instance = new BOUNDINGCIRCLE();				//?
	
	// run the simulation and get connection for smallest surrounding circle
	var circle = instance.minCircle(this.networkLocations.length, this.networkLocations, 0, [3]);											//?

	// draw the result on the map
	this.redrawCircle(circle);											//finish
};

// -----------------------------------------------------------
// Redraw connections between networkLocations							
// Parameters:
// - calculatedConnections: array of identifier pairs (IDs of points in networkLocations)		
// -----------------------------------------------------------
APP.prototype.redrawCircle = function (circle) {					
	
	var myLayer = this.myMap.findLayerById("circle");						//finish

	// clear points and drawn circle from layer	
	myLayer.removeAll();													//finish
	
	require(["esri/geometry/Circle", "esri/Graphic"], function (Circle, Graphic) {			
		// create the circle as ESRI Graphic
		var circleGraph = new Circle({
			center: {
				x: circle.getMiddlePoint().getX(),
				y: circle.getMiddlePoint().getY(),
				spatialReference: {"wkid":102100},
			},
			radius: circle.getRadius(),							
		});
		var symbol = { 		
			type: "simple-line",
			width: 2,
			color: "blue"
		};
		var graphic = new Graphic(circleGraph, symbol);
		
		// add circleGraph to layer 'circle'
		myLayer.add(graphic);
	});
	
};
