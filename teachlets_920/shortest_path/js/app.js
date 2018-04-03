function APP(mapId, stations, network){
	this.resetStations = stations;
	this.resetNetwork = network;
	this.stationList = [];
	this.stationGrid = [];
	this.startStopPath = [];
	this.clickMinDifference = 0.075; //buffer arround stationpoint
	this.mapObject = L.map(mapId);
	this.mapObject.on('click', this.onClickEvent);			
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
	
	this.mapObject.eachLayer(function (layer) {
		myApp.mapObject.removeLayer(layer);
	});		
	
	this.repaint();
}

APP.prototype.onClickEvent = function(e){
	var point = new POINT(e.latlng.lng,e.latlng.lat);
	var closest = false;
	
	$.each(myApp.stationList, function(index, station){
		if(closest === false || calculateDifferance(point,closest.getLocation()) > calculateDifferance(station.getLocation(),point)){
			closest = station;
		}
	});	
	if(calculateDifferance(closest.getLocation(),point) > myApp.clickMinDifference) return false;
	myApp.setOrResetStartOrEndPoint(closest);	
}

APP.prototype.setOrResetStartOrEndPoint = function(station){
	
	if(this.startStopPath.length == 2){
		this.reset();
		this.startStopPath = []; //reset;
	}
	
	if(this.startStopPath.length == 0){
		//new input
		this.drawStations([station],{
			color: 'black',
			fillColor: 'red',
			fillOpacity: 1,
			radius: 7500
			}	
		);
	}
	
	if(this.startStopPath.indexOf(station.getName()) == -1){
		this.startStopPath.push(station.getName());
		
		this.drawStations([station],{
			color: 'black',
			fillColor: 'red',
			fillOpacity: 1,
			radius: 7500
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
	var map = this.mapObject;
	$.each(array, function(index, connection){	
		var pointa = connection.getA().getLocation();
		var pointb = connection.getB().getLocation();
		
		var latlngs = [
			[pointa.getY(),pointa.getX()],
			[pointb.getY(),pointb.getX()]
		];
		var polyline = L.polyline(latlngs,options).addTo(map);			
	});		
}

APP.prototype.drawStations = function(array,options){
	var map = this.mapObject;
	$.each(array, function(index, station){	
		var point = station.getLocation();
	
		var circle = L.circle([point.getY(), point.getX()], options).addTo(map);	
	});	
}

APP.prototype.repaint = function(){
	this.mapObject.setView([50,10], 6);
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		id: 'mapbox.streets'
	}).addTo(this.mapObject);
	
	this.drawConnections(this.stationGrid,{
			color: 'black',
			opacity: 0.25
		}
	);
	this.drawStations(this.stationList,{
			color: 'black',
			stroke: false,
			fillColor: 'orange',
			fillOpacity: 0.75,
			radius: 7500
		}
	);
}

APP.prototype.startDijkstra = function(){
	var ret = new runDijkstra(this.stationGrid,this.getStation(this.startStopPath[0]),this.getStation(this.startStopPath[1]));
	this.stationGrid = [];
	for(i=0;i<ret.length;i++){
		this.addConnection(ret[i][0],ret[i][1]);
	}
	this.drawConnections(this.stationGrid,{
			color: 'red',
			opacity: 1
		}
	);
}
