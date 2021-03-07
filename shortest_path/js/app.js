// -----------------------------------------------------------
// Constructor
// Parameters:
// - myMap: ESRI Map Object
// - myView: ESRI MapView Object
// - stations: list of stations
// - network: grid of stations
// -----------------------------------------------------------

function APP(myMap, myView, stations, network) {
	// initialize properties of APP instance
	this.resetStations = stations;
	this.resetNetwork = network;
	this.stationList = [];
	this.stationGrid = [];
	this.startStopPath = [];
	this.clickMinDifference = 0.075; //buffer arround stationpoint
	this.myMap = myMap;
	this.myView = myView;
	this.myView.on("click", this.onClickEvent);
	// reset just to be save that everything is cleared
	this.reset();
}

// -----------------------------------------------------------
// Reset everything
// -----------------------------------------------------------
APP.prototype.reset = function () {
	// clear the array of stationGrid and stationList
	this.stationGrid = [];
	this.stationList = [];
	var thisAppInstance = this;
	$.each(this.resetStations, function(index, station){
		thisAppInstance.addStation(station[1],station[2],station[0]);
	});
	
	$.each(this.resetNetwork, function(index, entry){
		thisAppInstance.addConnection(entry[0],entry[1]);
	});	
	// clear both used drawing layers
	this.myMap.findLayerById("stationsPoint").removeAll();
	this.myMap.findLayerById("connectingLine").removeAll();	
	
	this.repaint();
}

// -----------------------------------------------------------
// Click event on map: save clicked location
// Parameters:
// - event: data regarding event (like clicked position)
// -----------------------------------------------------------
APP.prototype.onClickEvent = function(event){
	myApp.myView.hitTest(event).then(function (response) {
		if (response.results.length) {
			var nearStation = response.results.filter(function (result) {
				//get the ESRI Graphics layer to draw points
				return result.graphic.layer === myApp.myMap.findLayerById("stationsPoint");	
			})
			if(nearStation.length) {
				myApp.setOrResetStartOrEndPoint(myApp.stationList[nearStation[0].graphic.attributes]);
			}
		}
	});
}

APP.prototype.setOrResetStartOrEndPoint = function(station){
	//reset
	if (this.startStopPath.length == 2) {
		this.reset();
		this.startStopPath = [];		
	}
	//new input
	if (this.startStopPath.length == 0) {
		this.drawStations([station], {		
			color: [0, 37, 87],				//here change color of clicked points
			fillColor: [204, 7, 30],
			size: "8px"
		});
	}
	
	if (this.startStopPath.indexOf(station.getName()) == -1) {
		this.startStopPath.push(station.getName());
		this.drawStations([station], {				
			color: [0, 37, 87],				//here change color of clicked points
			fillColor: [204, 7, 30],
			size: "8px"	
		});
	}
	//if two points start algorthm
	if(this.startStopPath.length == 2){
		this.startDijkstra();
	}
}

// -----------------------------------------------------------
// Add station if click
// -----------------------------------------------------------
APP.prototype.addStation = function(x,y,name){
	this.stationList.push(
		new STATION(x,y,name)
	);	
}

APP.prototype.getStation = function(name){
	var result = false;
	$.each(this.stationList, function(index, station){
		if(station.getName().toUpperCase() === name.toUpperCase()){
			result = station;
			return true;
		}
	});
	return result;
}

// -----------------------------------------------------------
// Connection of the two citys
// -----------------------------------------------------------
APP.prototype.addConnection = function(cityA,cityB){
	var distance = calculateDifferance(this.getStation(cityA).getLocation(), this.getStation(cityB).getLocation());
	this.stationGrid.push(
		new CONNECTION(this.getStation(cityA),this.getStation(cityB),distance)
	);		
}

// -----------------------------------------------------------
// Create the graphic for the line between the stations
// -----------------------------------------------------------
APP.prototype.drawConnections = function(array,options){
	var myLayer = this.myMap.findLayerById("connectingLine");
	$.each(array, function(index, connection){
		require(["esri/Graphic"],function(Graphic){
			//create the symbol of connectingline as ESRI Graphic
			var simpleLineSymbol = { 		
				type: "simple-line",
				width: 2,
				color: options.color
			};
			//create the geometry of connectingline as ESRI Graphic
			var polyline = {
				type: "polyline",
				paths: [
					[connection.getA().getLocation().getX(), connection.getA().getLocation().getY()],
					[connection.getB().getLocation().getX(), connection.getB().getLocation().getY()]
				]
			};
			//create the connectingline as ESRI Graphic
			var polylineGraphic = new Graphic({
				geometry: polyline,
				symbol: simpleLineSymbol
			});
			//add connectingline to layer 'polylineGraphic'
			myLayer.add(polylineGraphic);			
		});		
	});
}

// -----------------------------------------------------------
// Create the graphic point for the stations
// -----------------------------------------------------------
APP.prototype.drawStations = function(array,options){
	var myLayer = this.myMap.findLayerById("stationsPoint");
	var sl = this.stationList;
	$.each(array, function(index, station){	
		require(["esri/Graphic"],function(Graphic){
			//create the geometry of point as ESRI Graphic
			var point = {
				type: "point",
				longitude: station.location.getX(),
				latitude: station.location.getY()
			};
			//create the symbol of point as ESRI Graphic
			var simpleMarkerSymbol = {			
				type: "simple-marker",
				color: options.fillColor,
				size: options.size,
				outline: {
					color: options.color,
					width: 1
				}
			};
			//create the point of the stations as ESRI Graphic
			var pointGraphic = new Graphic({
				attributes: sl.indexOf(station),
				geometry: point,
				symbol: simpleMarkerSymbol
			});
			//add point to layer 'pointGraphic'
			myLayer.add(pointGraphic);	
		});	
	});
};

// -----------------------------------------------------------
// Repaint stations and connectiongline 
// -----------------------------------------------------------
APP.prototype.repaint = function () {

	this.drawConnections(this.stationGrid, {	
		color: [0, 37, 87],						// here change color of line
	});

	this.drawStations(this.stationList, {		
		color: [0, 37, 87],						//here change color of points
		size: "8px",
		fillColor: [0, 158, 224],
	});
	// set original map center and zoom level
	this.myView.center = [10.4541205, 51.164305];	
	this.myView.zoom = 6;							
}

// -----------------------------------------------------------
// Calculate the shortest line between two citys
// -----------------------------------------------------------
APP.prototype.startDijkstra = function(){
	var ret = new runDijkstra(this.stationGrid,this.getStation(this.startStopPath[0]),this.getStation(this.startStopPath[1]));
	this.stationGrid = [];
	for(i=0;i<ret.length;i++){
		this.addConnection(ret[i][0],ret[i][1]);
	}
	// draw the result on the map
	this.drawConnections(this.stationGrid,{		
			color: [211,39,39],					//here change color of shortest line
		}
	);
}
