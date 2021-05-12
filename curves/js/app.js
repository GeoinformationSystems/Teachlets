function APP(numberOfPoints, offset, id){
	this.pointList = [];
	this.elemId = id;
	this.offset = offset;
	this.dragSubject = -1;
	this.show = [true, false, false];
	this.colors = ["#a3d2ca","#5eaaa8","#eb5e0b"];
	
	this.loadRandomPoints(numberOfPoints);
	this.update();
};

APP.prototype.addPoint = function(x,y) {
	this.pointList.push(
		new POINT(x,y)
	);
};

APP.prototype.loadRandomPoints = function(number) {
	
	var width=$(this.elemId).width() - (this.offset*2);
	var height=$(this.elemId).height() - (this.offset*2);

	var spread = width/number
	var tmpX = this.offset + spread/2;
	
	for(var i=0; i<number;i++) {
		this.addPoint(tmpX , Math.floor((Math.random() * 0.5 + 0.25) *  height) + this.offset);
		tmpX += spread;
	}
	this.repaint();
	
};

APP.prototype.drawCurve = function(n) {
	if(this.show[n]) {
		var ctx = $(this.elemId).get(0).getContext("2d");
		var curve;
		switch(n) {
			
			case 0: curve = d3.curveLinear(ctx); break;
			case 1: curve = d3.curveNatural(ctx); break;
			case 2: curve = d3.curveBasis(ctx); break;
		}
		
		ctx.beginPath();
		curve.lineStart();
		$.each(this.pointList, function(index, p){
			curve.point(p.getX(), p.getY());
		});
		
		curve.lineEnd();
		ctx.strokeStyle = this.colors[n];
		ctx.stroke();
	}
};

APP.prototype.findNearestPoint = function(dx, dy, buffer) {
	var nearest = -1;
	$.each(this.pointList, function(index, p){
		if((p.getX() - buffer) < dx && dx < (p.getX() + buffer) && (p.getY() - buffer) < dy && dy < (p.getY() + buffer)) {
			nearest = index;
		}
	});
	this.dragSubject = nearest;
};

APP.prototype.update = function() {
	var ctx = $(this.elemId).get(0).getContext("2d");
	ctx.clearRect(0, 0, $(this.elemId).width(), $(this.elemId).height());

	this.drawCurve(0);
	this.drawCurve(1);
	this.drawCurve(2);
	this.repaint();
};

APP.prototype.repaint = function() {
	var ctx = $(this.elemId).get(0).getContext("2d");
	
	$.each(this.pointList, function(index, p){
		ctx.beginPath();	
		ctx.arc(p.getX(), p.getY(), 10, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fillStyle="#009EE0";
		ctx.fill();
		ctx.lineWidth = 2;
		ctx.strokeStyle = "#002657";
		ctx.stroke();
	});
	
};


	
