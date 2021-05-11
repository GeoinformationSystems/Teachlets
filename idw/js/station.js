function STATION(x,y,value){
	this.location = new POINT(x,y);
	this.value = value;
}

STATION.prototype.getLocation = function(){
	return this.location;
}

STATION.prototype.getValue = function(){
	return this.value;
}

STATION.prototype.getDistanceTo = function(p){
	return Math.sqrt(
		Math.pow((this.location.getX() - p.getX()),2)
		+
		Math.pow((this.location.getY() - p.getY()),2)
	);
}