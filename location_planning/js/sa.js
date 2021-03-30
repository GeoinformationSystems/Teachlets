// -----------------------------------------------------------
// Constructor
// Parameters:
// - points: list of clicked points
// - ...
// -----------------------------------------------------------
function SA(points, sigma, rv, to) {
	this.pointlist = points;
	this.circle = this.createCircle();
	this.distancesMatrix = this.createDistancesMatrix();
	this.sigma = sigma;
	this.sigmaReductionValue = rv;
	this.stableTimeOut = to;
	this.toCounter = this.stableTimeOut;
}

SA.prototype.createDistancesMatrix = function(){
	var matrix = new Array(this.pointlist.length);
	for (var i = 0; i < this.pointlist.length; i++) {
		matrix[i] = new Array(this.pointlist.length);
	}
	
	for(var r=0; r < this.pointlist.length; r++){
		for(var c=0; c < this.pointlist.length; c++){
			if(r == c){
				matrix[r][c] = null;
			} else {
				matrix[r][c] = parseInt(minCircle(minC));
			}
		}
	}
	return matrix;
}

SA.prototype.createCircle = function(){
	var connections = [];
	
	var list = new Array(this.pointlist.length);
	for(var i=0;i<list.length;i++){
		list[i] = i;
	}	

	var current = 0;
	
	while (list.length > 0){
		var newelem = [current,0];
		
		do{
			current = Math.floor(Math.random() * list.length);
		} while(list[current] == newelem[0] || (list[current] == 0 && list.length > 1));
		
		newelem[1] = list[current];
		list.splice(current, 1);
		current = newelem[1];
		
		connections.push(newelem);
	}
	
	connections[connections.length-1][1] = connections[0][0];	
	
	return connections;
}

SA.prototype.calculateTotalDistance = function(array){
	var result = 0;
	for(var i=0; i< array.length; i++){
		result+=this.distancesMatrix[array[i][0]][array[i][1]];
	}
	return result;
}

SA.prototype.run = function(){
	while(this.sigma > 1 && this.toCounter > 0){
		if(this.optimizeCircle()){
			this.toCounter = this.stableTimeOut;
		} else {
			this.toCounter--;
		}
	}
	return this.circle;
}

SA.prototype.runOneStep = function(){
	if(this.sigma > 1 && this.toCounter > 0){
		if(this.optimizeCircle()){
			this.toCounter = this.stableTimeOut;
		} else {
			this.toCounter--;
		}
		return this.circle;
	} else {
		return false;
	}
}

// -----------------------------------------------------------
// create smallest surrounding circle 
// -----------------------------------------------------------
SA.prototype.optimizeCircle = function(){
	var cityA = null, cityB = null;
	
	cityA = this.getNewRandomCityChecked([0]);
	cityB = this.getNewRandomCityChecked([0,cityA]);
		
	var newCircle = [];
	
	for(var i=0; i<this.circle.length; i++){
		newCircle[i] = [this.circle[i][0],this.circle[i][1]];
	}
	
	for(var i=0; i<newCircle.length; i++){
		if(newCircle[i][0] == cityA){
			newCircle[i][0] = cityB;
		} else if(newCircle[i][0] == cityB){
			newCircle[i][0] = cityA;
		}
		
		if(newCircle[i][1] == cityA){
			newCircle[i][1] = cityB;
		} else if(newCircle[i][1] == cityB){
			newCircle[i][1] = cityA;
		}	
	}

	
	var checker = this.checkIfValidSwitch(newCircle);
	
	if(checker){
		this.circle = [];
		for(var i=0; i<newCircle.length; i++){
			this.circle[i] = [newCircle[i][0],newCircle[i][1]];
		}
	}
	
	this.sigma *= 1-this.sigmaReductionValue;
	
	return checker;
}

SA.prototype.checkIfValidSwitch = function(newCircle){
	var currentDistance = this.calculateTotalDistance(this.circle);
	var newDistance = this.calculateTotalDistance(newCircle);
	
	if(newDistance < currentDistance) {
			return true;
	}
	
	var delta = -1 * (newDistance - currentDistance);
		
	var checker = Math.exp(delta / this.sigma);
	
	if(checker > Math.random()){
		return true;
	} else {
		return false;
	}
}

SA.prototype.getNewRandomCityChecked = function(not){
	var result;	
	do{
		result = Math.floor(Math.random() * this.circle.length);
	} while(not.includes(result));
	
	return result;
}