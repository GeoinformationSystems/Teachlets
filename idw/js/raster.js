function RASTER(cols,rows,cellSize,value){
	this.cols = cols;
	this.rows = rows;
	this.cellSize = cellSize;
	
	this.raster = new Array(rows);
	for (var i = 0; i < rows; i++) {
	  this.raster[i] = new Array(cols);
	}
	
	for(var r=0; r < rows; r++){
		for(var c=0; c < cols; c++){
			this.raster[r][c] = value;
		}
	}
}

RASTER.prototype.getRows = function(){
	return this.rows;
}

RASTER.prototype.getCols = function(){
	return this.cols;
}

RASTER.prototype.getCellSize = function(){
	return this.cellSize;
}

RASTER.prototype.getCellcenter = function(rows,cols){
	return new POINT(cols * this.cellSize + this.cellSize / 2, rows * this.cellSize + this.cellSize / 2);
}

RASTER.prototype.isInCell = function(row,col,station){
	if(
		col*this.cellSize <= station.getLocation().getX() && (col+1)*this.cellSize > station.getLocation().getX() &&
		row*this.cellSize <= station.getLocation().getY() && (row+1)*this.cellSize > station.getLocation().getY()
	){
		return true;
	} else {
		return false;
	}
}

RASTER.prototype.setValue = function(r,c,value){
	this.raster[r][c] = value;
}

RASTER.prototype.getValue = function(r,c){
	return this.raster[r][c];
}	