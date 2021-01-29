// -----------------------------------------------------------
// Constructor
// Parameters:
// - myMap: ESRI Map Object
// - myView: ESRI MapView Object
// -----------------------------------------------------------

function APP(myMap, myView){
	// initialize properties of APP instance
	this.networkLocations = [];
	this.myMap = myMap;
	this.myView = myView;
	this.myView.on("click", this.onClickEvent);
	// reset just to be save that everything is cleared
	this.reset();
};

// -----------------------------------------------------------
// Reset everything
// -----------------------------------------------------------
APP.prototype.reset = function(){
	// clear the array of networkLocations (clicked points)
	this.networkLocations = [];
	// clear both used drawing layers
	this.myMap.findLayerById("clickPoint").removeAll();
	this.myMap.findLayerById("connectingLine").removeAll();
	// set original map center and zoom level
	this.myView.center = [10.4541205, 51.164305];	
	this.myView.zoom = 6;
};

// -----------------------------------------------------------
// Click event on map: draw marker and save clicked location
// Parameters:
// - event: data regarding event (like clicked position)
// -----------------------------------------------------------
APP.prototype.onClickEvent = function (event) {
	// create a point from clicked map coordinates
	var point = new POINT(event.mapPoint.longitude,event.mapPoint.latitude);
	// get the ESRI Graphics layer to draw points
	var myLayer = myApp.myMap.findLayerById("clickPoint");

	//console.log("POINT:", point);
	//console.log("LNG:", event.mapPoint.longitude);
	//console.log("LAT:", event.mapPoint.latitude);
	
	// save the clicked point to the networkLocations array
	myApp.networkLocations.push(point);
	
	require(["esri/Graphic"],function(Graphic){
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
// Calculate the shortest route
// -----------------------------------------------------------
APP.prototype.simAnnealing = function(){
	// less than 3 points on map => throw error and cancel calculation
	if(this.networkLocations.length < 3){
		alert("[ERROR] Es werden mindestens 3 Punkte benötigt.");
		return false;
	}
	// create simulation instance
	var instance = new SA(this.networkLocations, 1000, 0.000001, 1000);
	// run the simulation and get connections for the shortest route
	var connections = instance.run();
	// draw the result on the map
	this.redrawConnections(connections);
};

// ToDo: show reasonable steps to demonstrate the process
// might need some math to figure that out
APP.prototype.simAnnealingAnimated = function(ms){
	if(this.networkLocations.length < 3){
		alert("[ERROR] Es werden mindestens 3 Punkte benötigt.");
		return false;
	}
	var instance = new SA(this.networkLocations, 10, 0.000001, 2);
	
	var id = setInterval(function(){ 
		var result = instance.runOneStep();
		
		if(result){
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
APP.prototype.redrawConnections = function(calculatedConnections){
	var allPoints = this.networkLocations;
	var myLayer = this.myMap.findLayerById("connectingLine");

	// clear all lines
	myLayer.removeAll();
	
	// draw the line for each calculated connection
	$.each(calculatedConnections, function(index, connection){
		require(["esri/Graphic"],function(Graphic) {
			// get points for the current connection 
			var pointa = allPoints[connection[0]];
			var pointb = allPoints[connection[1]];
			// create the line as ESRI Graphic
			var line = new Graphic({
				geometry: {
					type: "polyline",
					paths: [
						[pointa.getX(),pointa.getY()],
						[pointb.getX(),pointb.getY()]
					]
				},
				symbol: {							
					type: "simple-line",
					width: 2,
					color: [0, 37, 87],				//here change color of line
				}
			});
			// add line to layer 'connectingLine'
			myLayer.add(line);
		});
		// repeat for all calculated connections given
	});	
};
