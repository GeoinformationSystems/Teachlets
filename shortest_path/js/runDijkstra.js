// -----------------------------------------------------------
// Constructor
// Parameters:
// - network: grid of stations
// - start:
// - stop:
// -----------------------------------------------------------
function runDijkstra(network, start, stop) {
	this.network = network;
	this.start = start;
	this.stop = stop;
	this.result = false;
	return this.calculate();
}

// -----------------------------------------------------------
// Calculation of the algorithm: line between two citys
// -----------------------------------------------------------
runDijkstra.prototype.calculate = function(){
	var origin = this.start,
		i=0,
		tmp, 
		result = false, 
		j,
		prev,
		next;
		
	while(true){
		tmp = this.decide(this.getAllPossible([origin],false));
		
		if((tmp.getA().getName() === origin.getName() && tmp.getB().getName() === this.stop.getName()) || (tmp.getB().getName() === origin.getName() && tmp.getA().getName() === this.stop.getName())){
			break;
		}	
		
		if(origin.getName() === tmp.getA().getName()) 
			this.updateAllConnections(this.getAllPossible([tmp.getB()],true),tmp.getB(), tmp);
		else
			this.updateAllConnections(this.getAllPossible([tmp.getA()],true),tmp.getA(), tmp);			
	}
	
	tmp = tmp.getOver()
	tmp.unshift(this.start);
	tmp.push(this.stop);	
	
	result = [];
	
	for(j=1; j<tmp.length; j++){
		prev = tmp[j-1];
		next = tmp[j];
		result.push([prev.getName(),next.getName()]);
	}
	this.result = result;
	return this.result;	
}

runDijkstra.prototype.getResult = function(){
	return this.result;
}

// -----------------------------------------------------------
// Delete the line
// -----------------------------------------------------------
runDijkstra.prototype.deleteConnection = function(index){
	this.network.splice(index,1);
}

//not needed anymore
runDijkstra.prototype.deleteConnectionByObject = function(conB){
	for(i = 0; i < this.network.length; i++){
		var conA = this.network[i];
		if	(((conA.getA().getName() === conB.getA().getName() && conA.getB().getName() === conB.getB().getName()) || 
			(conA.getA().getName() === conB.getB().getName() && conA.getB().getName() === conB.getA().getName())) && conA.getDistance() === conB.getDistance() ){
			this.deleteConnection(i);
			break;
		}	
	}
}

runDijkstra.prototype.updateAllConnections = function(newPossibleConnections, currentPoint, connection){
	var origin = connection.getA(), i, j, tmp, index;
	if(origin.getName() === currentPoint.getName()) origin = connection.getB();
	
	for(i = 0; i < newPossibleConnections.length; i++){
		var newPoint = newPossibleConnections[i].getA();
		if(newPoint.getName() === currentPoint.getName()) newPoint = newPossibleConnections[i].getB();
		if(newPoint.getName() === origin.getName()) {
			continue;
		}
		tmp = new CONNECTION(newPoint, origin, (newPossibleConnections[i].getDistance() + connection.getDistance()));
		tmp.addOver(connection.getOver());
		tmp.addOver([currentPoint]);
		
		if(newPoint.isInArray(tmp.getOver()) != -1) continue;
		
		var check = tmp.isInArray(this.network);
		if(check !== false){
			if(tmp.getDistance() < check.getDistance()){
				this.deleteConnectionByObject(check);
			}
		}
		this.network.push(tmp);
	}
	
	connection.setVisited(true);
}

runDijkstra.prototype.getAllPossible = function(stations){
	var result = [];
	var network = this.network;
	$.each(stations, function(stationIndex, station){
		$.each(network, function(index, connection){	
			if(!network[index].already){
				if(connection.getA().getName() === station.getName() || connection.getB().getName() === station.getName()) {
					network[index].already = 1;
					result.push(connection);
				}
			}
		});
	});
	$.each(network, function(index, station){
		network[index].already = 0;
	});
	return result;
}

runDijkstra.prototype.decide = function(array,ignore){
	var lowest = false;
	$.each(array, function(index, connection){
		if(ignore === true){
			if((lowest === false || connection.getDistance() < array[lowest].getDistance())){
				lowest = index;
			}			
		} else {
			if((lowest === false || connection.getDistance() < array[lowest].getDistance()) && connection.getVisited() === false){
				lowest = index;
			}
		}
	});
	return array[lowest];
}
