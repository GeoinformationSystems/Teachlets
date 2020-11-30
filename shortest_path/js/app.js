function APP(myMap, myView, stations, network){
	this.resetStations = stations;
	this.resetNetwork = network;
	this.stationList = [];
	this.stationGrid = [];
	this.startStopPath = [];
	this.clickMinDifference = 0.075; //buffer arround stationpoint
	this.myMap = myMap;
	this.myView = myView;
	this.myView.on("click", this.onClickEvent);			
	this.reset();
}

APP.prototype.reset = function(){
	this.stationGrid = [];
	this.stationList = [];
	var thisAppInstance = this;
	$.each(this.resetStations, function(index, station){
		thisAppInstance.addStation(station[1],station[2],station[0]);
	});
	
	$.each(this.resetNetwork, function(index, entry){
		thisAppInstance.addConnection(entry[0],entry[1]);
	});	
	
	this.myMap.findLayerById("station").removeAll();
	
	this.myMap.findLayerById("connection").removeAll();	
	
	this.repaint();
}

APP.prototype.onClickEvent = function(event){
	myApp.myView.hitTest(event).then(function (response) {
		if (response.results.length) {
			var nearStation = response.results.filter(function (result) {
				return result.graphic.layer === myApp.myMap.findLayerById("station");
			})
			if(nearStation.length) {
				myApp.setOrResetStartOrEndPoint(myApp.stationList[nearStation[0].graphic.attributes]);
			}
		}
	});
}

APP.prototype.setOrResetStartOrEndPoint = function(station){
	
	if(this.startStopPath.length == 2){
		this.reset();
		this.startStopPath = []; //reset;
	}
	
	if(this.startStopPath.length == 0){
		//new input
		this.drawStations([station],{		//Änderung Farbe angeklickter Punkte
			color: [0, 37, 87],
			fillColor: [204, 7, 30],
			size: "8px"
			}	
		);
	}
	
	if(this.startStopPath.indexOf(station.getName()) == -1){
		this.startStopPath.push(station.getName());
		
		this.drawStations([station], {				//Änderung Farbe angeklickter Punkte
			color: [0, 37, 87],
			fillColor: [204, 7, 30],
			size: "8px"
			}	
		);
	}
	
	if(this.startStopPath.length == 2){
		this.startDijkstra();
	}
}

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

APP.prototype.addConnection = function(cityA,cityB){
	var distance = calculateDifferance(this.getStation(cityA).getLocation(), this.getStation(cityB).getLocation());
	this.stationGrid.push(
		new CONNECTION(this.getStation(cityA),this.getStation(cityB),distance)
	);		
}

APP.prototype.drawConnections = function(array,options){
	var myLayer = this.myMap.findLayerById("connection");
	$.each(array, function(index, connection){
	require(["esri/Graphic"],function(Graphic){

			var simpleLineSymbol = { 		
				type: "simple-line",
				width: 2,
				color: options.color
			};

			var polyline = {
				type: "polyline",
				paths: [
					[connection.getA().getLocation().getX(), connection.getA().getLocation().getY()],
					[connection.getB().getLocation().getX(), connection.getB().getLocation().getY()]
				]
			};

			var polylineGraphic = new Graphic({
				geometry: polyline,
				symbol: simpleLineSymbol
			});

			myLayer.add(polylineGraphic);			
	});		
 });
}

APP.prototype.drawStations = function(array,options){
	var myLayer = this.myMap.findLayerById("station");
	var sl = this.stationList;
	$.each(array, function(index, station){	
		require(["esri/Graphic"],function(Graphic){

			var point = {
				type: "point",
				longitude: station.location.getX(),
				latitude: station.location.getY()
			};

			var simpleMarkerSymbol = {			
				type: "simple-marker",
				color: options.fillColor,
				size: options.size,
				outline: {
					color: options.color,
					width: 1
				}
			};

			var pointGraphic = new Graphic({
				attributes: sl.indexOf(station),
				geometry: point,
				symbol: simpleMarkerSymbol
			});

			myLayer.add(pointGraphic);	
	});	
 });
};

APP.prototype.repaint = function () {

	this.drawConnections(this.stationGrid, {	//Änderung Farbe Linie
		color: [0, 37, 87],
		//opacity: 0.25
	}
	);
	this.drawStations(this.stationList, {		//Änderung Farbe Punkte
		color: [0, 37, 87],
		size: "8px",
		//stroke: false,
		fillColor: [0, 158, 224],
		//fillOpacity: 0.20,
		//radius: 7500
	}
	);
	this.myView.center = [10.4541205, 51.164305];	
	this.myView.zoom = 6;							
}

APP.prototype.startDijkstra = function(){
	var ret = new runDijkstra(this.stationGrid,this.getStation(this.startStopPath[0]),this.getStation(this.startStopPath[1]));
	this.stationGrid = [];
	for(i=0;i<ret.length;i++){
		this.addConnection(ret[i][0],ret[i][1]);
	}
	this.drawConnections(this.stationGrid,{		//Änderung Farbe der kürzesten Linie
			color: [211,39,39],
			//opacity: 1
		}
	);
}
