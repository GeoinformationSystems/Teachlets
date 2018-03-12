function TRANSFORM(bbox,screen){
	this.ul = bbox[0];
	this.lr = bbox[1];
	this.screen = screen;
	this.xScale = (this.lr.getX() - this.ul.getX()) / this.screen[0];
	this.yScale = (this.lr.getY() - this.ul.getY()) / this.screen[1];
}

TRANSFORM.prototype.getScreenHeight = function(){
	return this.screen[1];
}

TRANSFORM.prototype.getScreenWidth = function(){
	return this.screen[0];
}

TRANSFORM.prototype.transformPoint = function(p1){
	return new POINT(
		parseInt((p1.getX() - this.ul.getX()) / this.xScale),
		parseInt(this.getScreenHeight() - (p1.getY() - this.ul.getY())  / this.yScale)
	);
}

TRANSFORM.prototype.invertTransformPoint = function(p1){
	return new POINT(
		p1.getX() * this.xScale + this.ul.getX(),
		(this.getScreenHeight() - p1.getY()) * this.yScale + this.ul.getY()
	);	
}