function STATION(x,y,name){
	this.location = new POINT(x,y);
	this.name = name;
}

STATION.prototype.getLocation = function(){
	return this.location;
}

STATION.prototype.getName = function(){
	return this.name;
}

STATION.prototype.isInArray = function(array){
	for(i = 0; i < array.length; i++){
		if(array[i].getName() === this.name) return i;
	}
	return -1;
}