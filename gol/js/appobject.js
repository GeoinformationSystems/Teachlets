function APP(size,defaultValue,id){
	this.rows = size;
	this.cols = size;
	this.elemId = id;
	this.cellSize = $(id).width() / size;
	this.defaultValue = defaultValue;
	this.data = this.createRaster(this.rows, this.cols, this.defaultValue);
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

APP.prototype.invertRasterDataValue = function(x,y){
	var loc = this.getRasterlocationObject(x,y);
	var val = this.getRasterDataValue(loc);
	if(val == 0){
		this.setRasterDataValue(loc,1);
	} else {
		this.setRasterDataValue(loc,0);
	}
}

APP.prototype.getValue = function(x,y){
	var loc = this.getRasterlocationObject(x,y);
	return this.getRasterDataValue(loc);
}

APP.prototype.setValue = function(x,y,val){
	var loc = this.getRasterlocationObject(x,y);
	this.setRasterDataValue(loc,val);
}

APP.prototype.refresh = function(){
	var ctx = $(this.elemId).get(0).getContext("2d");
	ctx.fillStyle="#000";
	for(var r=0; r < this.rows; r++){
		for(var c=0; c < this.cols; c++){
			if(this.data[r][c] == 0){
				ctx.clearRect(c*this.cellSize,r*this.cellSize,this.cellSize,this.cellSize); 
			} else {
				ctx.fillRect(c*this.cellSize,r*this.cellSize,this.cellSize,this.cellSize); 
			}
		}
	}
}

APP.prototype.resetRaster = function(){
	this.data = this.createRaster(this.rows, this.cols, this.defaultValue);
}

APP.prototype.getNewCellState = function(r,c){
	var count = 0;
	for(var x=-1; x<=1; x++){
		for(var y=-1; y<=1; y++){
			if(x == 0 && y == 0) continue;
			if(r+y > -1 && c+x > -1 && r+y < this.data.length && c+x < this.data[0].length) count += this.data[r+y][c+x];
		}
	}
	
	if(count == 3) {
		return 1;
	}
	
	if(count == 2 && this.data[r][c] == 1) return 1; //2
	
	return 0;
}

APP.prototype.proceedGrid = function(){
	var newraster = this.createRaster(this.rows, this.cols, this.defaultValue);
	
	for(var r=0; r < this.rows; r++){
		for(var c=0; c < this.cols; c++){
			newraster[r][c] = this.getNewCellState(r,c);
		}
	}
	
	this.data = newraster;
	
	this.refresh();
}