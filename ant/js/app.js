function APP(size,defaultValue,id){
	this.rows = size;
	this.cols = size;
	this.elemId = id;
	this.ants = [];
	this.cellSize = $(id).width() / size;
	this.defaultValue = defaultValue;
	this.data = this.createRaster(this.rows, this.cols, this.defaultValue);
	this.imgAnts = new Image();
	this.imgAnts.src = "img/ants.png";
}

APP.prototype.createRaster = function(rows, cols, defaultval){
	var result = new Array(rows);
	for (var i = 0; i < rows; i++) {
	  result[i] = new Array(cols);
	}
	
	for(var r=0; r < rows; r++){
		for(var c=0; c < cols; c++){
			result[r][c] = defaultval;
		}
	}
	
	return result;
}

APP.prototype.getRasterlocationObject = function(x,y){
	var result = {
		row : Math.floor(y / this.cellSize),
		col : Math.floor(x / this.cellSize)
	}
	
	return result;
}

APP.prototype.getRasterDataValue = function(locationObject){
	return this.data[locationObject.row][locationObject.col];
}

APP.prototype.setRasterDataValue= function(locationObject,val){
	this.data[locationObject.row][locationObject.col] = val;
}

APP.prototype.getValue = function(x,y){ // x and y in pixl from #id
	var loc = this.getRasterlocationObject(x,y);
	return this.getRasterDataValue(loc);
}

APP.prototype.setValue = function(x,y,val){ // x and y in pixl from #id
	var loc = this.getRasterlocationObject(x,y);
	this.setRasterDataValue(loc,val);
}

APP.prototype.refresh = function(){
	var ctx = $(this.elemId).get(0).getContext("2d");
	for(var r=0; r < this.rows; r++){
		for(var c=0; c < this.cols; c++){
			if(this.data[r][c] == 0){
				ctx.clearRect(c*this.cellSize,r*this.cellSize,this.cellSize,this.cellSize); 
			} else {
				ctx.fillStyle="#00305e";
				ctx.fillRect(c*this.cellSize,r*this.cellSize,this.cellSize,this.cellSize); 
			}
		}
	}
	this.drawAnts();
}
APP.prototype.drawAnts = function() {
	var ctx = $(this.elemId).get(0).getContext("2d");
	for(var i = 0; i < this.ants.length; i++){
		var c = this.ants[i].loc.col;
		var r = this.ants[i].loc.row;
		ctx.drawImage(this.imgAnts,this.ants[i].direction*32, 0, 32, 32, c*this.cellSize, r*this.cellSize, this.cellSize, this.cellSize);
	}
	
}

APP.prototype.resetRaster = function(){
	this.data = this.createRaster(this.rows, this.cols, this.defaultValue);
}

APP.prototype.proceedGrid = function(){
	for(var i = 0; i < this.ants.length; i++){
		this.ants[i].goAnt(this);
	}	
	this.refresh();
}


APP.prototype.checkIfAnt = function(x,y){
	var loc = this.getRasterlocationObject(x,y);
	for(var i = 0; i < this.ants.length; i++){
		var ant = this.ants[i];
		if(ant.isAnt(loc)){	
			return true;
		}
	}
	return false;
}

APP.prototype.killAnt = function(x,y){
	var loc = this.getRasterlocationObject(x,y);
	
	for(var i = 0; i < this.ants.length; i++){
		var ant = this.ants[i];
		if(ant.isAnt(loc)){
			this.ants.splice(i,1);
		}
	}
}

APP.prototype.createAnt = function(x,y){
	var loc = this.getRasterlocationObject(x,y);
	this.ants.push(new ANT(loc));
}
