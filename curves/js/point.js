function POINT(x,y){
	this.x = x;
	this.y = y;
}

POINT.prototype.setX = function(x){
	this.x = x;
}

POINT.prototype.setY = function(y){
	this.y = y;
}

POINT.prototype.getX = function(){
	return this.x;
}

POINT.prototype.getY = function(){
	return this.y;
}
