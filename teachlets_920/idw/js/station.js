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