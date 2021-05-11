// -----------------------------------------------------------
// Constructor
// Parameters:
// - cityA: a station
// - cityB: a station
// - distance: distance between citys
// -----------------------------------------------------------
function CONNECTION(cityA, cityB) {
	this.a = cityA; //object
	this.b = cityB;
	this.distance = this.calculateDistance();
	this.over = [];
	this.visited = false;
}

// -----------------------------------------------------------
// Get a city
// -----------------------------------------------------------
CONNECTION.prototype.getA = function() {
	return this.a; //returns station object
}

// -----------------------------------------------------------
// Get another city
// -----------------------------------------------------------
CONNECTION.prototype.getB = function() {
	return this.b;
}

// -----------------------------------------------------------
// Get distance between the two citys
// -----------------------------------------------------------
CONNECTION.prototype.getDistance = function() {
	return this.distance;
}

CONNECTION.prototype.setDistance = function(dist) {
	this.distance = dist;
}

CONNECTION.prototype.calculateDistance = function() {
	return Math.sqrt(
		Math.pow((this.b.getLocation().getX() - this.a.getLocation().getX()),2)
		+
		Math.pow((this.b.getLocation().getY() - this.a.getLocation().getY()),2)
	);
}

CONNECTION.prototype.addOver = function(array) {
	var i,j;
	for(i=0; i< array.length; i++){
		var already = false;
		for(j=0; j< this.over.length; j++){
			if(this.over[j].getName() === array[i].getName()){
				already = true;
				break;
			}
		}
		if(already === false) this.over.push(array[i]);
	}
}

CONNECTION.prototype.getOver = function () {
	return this.over;
}

CONNECTION.prototype.isInArray = function(array) {
	for(i = 0; i < array.length; i++){
		if(array[i].getA().getName() === this.a.getName() && array[i].getB().getName() === this.b.getName()) return array[i];
		if(array[i].getA().getName() === this.b.getName() && array[i].getB().getName() === this.a.getName()) return array[i];
	}
	return false;
}

CONNECTION.prototype.setVisited = function(value) {
	this.visited = value;
}

CONNECTION.prototype.getVisited = function() {
	return this.visited;
}


