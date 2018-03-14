function APP(elemId, stations, mapId){
	this.elemId=elemId;
	this.resetStations = stations;
	this.networkLocations, this.stationList;
	this.mapObject = L.map(mapId);
	this.mapObject.on('click', this.onClickEvent);	
	this.reset();
}

APP.prototype.reset = function(){
	this.stationList = [];
	this.networkLocations = [];
	var thisAppInstance = this;
	$.each(this.resetStations, function(index, station){
		thisAppInstance.addStation(station[1],station[2],station[0]);
	});
	
	this.mapObject.eachLayer(function (layer) {
		myApp.mapObject.removeLayer(layer);
	});	

	this.repaint();
}


APP.prototype.onClickEvent = function(e){	
	var point = new POINT(e.latlng.lng,e.latlng.lat);
	
	var circle = L.marker([point.getY(), point.getX()], {
		
	}).addTo(myApp.mapObject);

	myApp.networkLocations.push(point);
}

APP.prototype.addStation = function(x,y,name){
	this.stationList.push(
		new STATION(x,y,name)
	);	
}

APP.prototype.repaint = function(){
	this.mapObject.setView([50,10], 6);
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		id: 'mapbox.streets'
	}).addTo(this.mapObject);
	
	/*
		//shows stations
		var map = this.mapObject;
		
		$.each(this.stationList, function(index, station){	
			var point = station.getLocation();
		
			var circle = L.circle([point.getY(), point.getX()], {
				color: 'transparent',
				fillColor: 'green',
				fillOpacity: 0.75,
				radius: 5000
			}).addTo(map);	
		});	
	*/
};

/*
APP.prototype.run = function(){
	if(this.networkLocations.length < 2){
		alert("[ERROR] Es werden mindestens 2 Punkte benötigt.");
		return false;
	}
	
	var result=[];
	
	var matrix = new Array(this.networkLocations.length);

	for (var i = 0; i < this.networkLocations.length; i++) {
		matrix[i] = new Array(this.networkLocations.length);
	}
	
	//matrix
	
	for(var r=0; r < this.networkLocations.length; r++){
		for(var c=0; c < this.networkLocations.length; c++){
			if(r == c){
				matrix[r][c] = null;
			} else {
				matrix[r][c] = parseInt(calculateDifferance(this.networkLocations[r],this.networkLocations[c])*10000);
			}
		}
	}
	
	//row mini
	
	for(var r=0; r < this.networkLocations.length; r++){
		var minimum = null;
		for(var c=0; c < this.networkLocations.length; c++){
			if(matrix[r][c] === null) continue;
			if(matrix[r][c] < minimum || minimum === null) minimum = matrix[r][c];
		}
		
		for(var c=0; c < this.networkLocations.length; c++){
			if(matrix[r][c] === null) continue;
			matrix[r][c] = matrix[r][c] - minimum;
		}		
		
	}
	
	//col mini
	
	var minimum;
	
	for(var c=0; c < this.networkLocations.length; c++){
		minimum = null;
		for(var r=0; r < this.networkLocations.length; r++){
			if(matrix[r][c] === null) continue;
			if(matrix[r][c] < minimum || minimum === null) minimum = matrix[r][c];
		}
		
		for(var r=0; r < this.networkLocations.length; r++){
			if(matrix[r][c] === null) continue;
			matrix[r][c] = matrix[r][c] - minimum;
		}		
		
	}
	
	//panelties by 0
	
	do{
		for(var r=0; r < this.networkLocations.length; r++){
			for(var c=0; c < this.networkLocations.length; c++){
				if(typeof matrix[r][c] !== 'number' || matrix[r][c] != 0) 
					continue; //null or object containing panilty
				
				var panelty = 0;
				minimum = null;
				
				for(var i=0; i < this.networkLocations.length; i++){
					if(i == r || matrix[i][c] === null) 
						continue;
					
					if(typeof matrix[i][c] === 'object'){
						minimum = 0;
						break;
					} else {
						if(minimum === null || matrix[i][c] < minimum)
							minimum = matrix[i][c];
					}
				}
				
				panelty += minimum;
				minimum = null;
				
				for(var i=0; i < this.networkLocations.length; i++){
					if(i == c || matrix[r][i] === null) 
						continue;
					
					if(typeof matrix[r][i] === 'object'){
						minimum = 0;
						break;
					} else {
						if(minimum === null || matrix[r][i] < minimum)
							minimum = matrix[r][i];
					}
				}			
				
				panelty += minimum;
				
				matrix[r][c] = {panelty};
				
			}
		}	
		
		var max = {
			value : null,
			r: null,
			c: null
		}
		
		for(var r=0; r < this.networkLocations.length; r++){
			for(var c=0; c < this.networkLocations.length; c++){
				if(matrix[r][c] === null || typeof matrix[r][c] === 'number') continue;
				if(matrix[r][c].panelty > max.value || max.value === null){
					max.value = matrix[r][c].panelty;
					max.r = r;
					max.c = c;
				}
			}
		}	
		
		for(var i=0; i < this.networkLocations.length; i++){
			matrix[i][max.c] = null;
			matrix[max.r][i] = null;
		}	
		
		matrix[max.c][max.r] = null;
		
		result.push(
			[max.r,max.c]
		);
		
		
		for(var r=0; r < this.networkLocations.length; r++){
			for(var c=0; c < this.networkLocations.length; c++){
				if(matrix[r][c] === null || typeof matrix[r][c] === 'number') continue;
				matrix[r][c] = 0;
			}
		}
	
		for(var r=0; r < this.networkLocations.length; r++){
			minimum = null;
			
			for(var c=0; c < this.networkLocations.length; c++){
				if(matrix[r][c] === null) continue;
				if(matrix[r][c] < minimum || minimum == null) minimum = matrix[r][c];
			}
			
			if(minimum != 0 && minimum !== null){
				for(var c=0; c < this.networkLocations.length; c++){
					if(matrix[r][c] === null) continue;
					matrix[r][c] = matrix[r][c] - minimum;
				}			
			}
		}

		for(var c=0; c < this.networkLocations.length; c++){
			minimum = null;
			
			for(var r=0; r < this.networkLocations.length; r++){
				if(matrix[r][c] === null) continue;
				if(matrix[r][c] < minimum || minimum == null) minimum = matrix[r][c];
			}
			
			if(minimum != 0 && minimum !== null){
				for(var r=0; r < this.networkLocations.length; r++){
					if(matrix[r][c] === null) continue;
					matrix[r][c] = matrix[r][c] - minimum;
				}			
			}
		}
		
	} while (!containsOnlyNull(matrix));	
	
	if(! this.checkIfFinal(result)){
		result = this.reprocess(result);
	}
	
	this.drawConnections(result);
}


APP.prototype.checkIfFinal = function(array){
	var start = array[0][0];
	var next = array[0][1];
	var count = 1;
	var check;
	
	do{
		check = next;
		for(var i=0; i<array.length;i++){
			if(array[i][0] == next){
				count++;
				next=array[i][1];
			}
		}
	} while (start != next && check != next);
	
	if(count != array.length){
		return false;
	}
	
	return true;
}

*/

APP.prototype.simAnnealing = function(){
	var instance = new SA(this.networkLocations, 1000, 0.000001, 1000);
	var connections = instance.run();
	this.redrawConnections(connections);
}

APP.prototype.simAnnealingAnimated = function(ms){
	var instance = new SA(this.networkLocations, 1000, 0.000001, 1000);
	
	var id = setInterval(function(){ 
		var result = instance.runOneStep();
		
		if(result){
			myApp.redrawConnections(result);
		} else {
			clearInterval(id);
		}
	}, ms);

	return id;
}


APP.prototype.redrawConnections = function(array){
	var allPoints = this.networkLocations;
	
	//removing all polylines if exist
	var map = this.mapObject;
    for(i in map._layers){
        if(map._layers[i]._path != undefined) {
            map.removeLayer(map._layers[i]);
        }
    }	
		
	$.each(array, function(index, connection){	
		var pointa = allPoints[connection[0]]
		var pointb = allPoints[connection[1]];

		var latlngs = [
			[pointa.getY(),pointa.getX()],
			[pointb.getY(),pointb.getX()]
		];
		var polyline = L.polyline(latlngs,{
			color: 'blue'
		}).addTo(myApp.mapObject);		
	});	
}
