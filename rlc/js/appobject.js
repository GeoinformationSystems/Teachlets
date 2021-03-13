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

APP.prototype.changeRasterSize = function(newsize){
	this.rows = newsize;
	this.cols = newsize;
	this.cellSize = $(this.elemId).width() / newsize;
	this.data = this.createRaster(this.rows, this.cols, this.defaultValue);
	this.refresh();
}

APP.prototype.loadRaster = function(raster){
	this.data = raster;
	this.rows = raster[0].length;
	this.cols = raster.length;
	this.cellSize = $(this.elemId).width() / this.rows;
	this.refresh();
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
	ctx.fillStyle="#00305e";
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

APP.prototype.clearRaster = function(){
	var ctx = $(this.elemId).get(0).getContext("2d");
	ctx.clearRect(0,0,600,600); 
}

APP.prototype.resetRaster = function(){
	this.data = this.createRaster(this.rows, this.cols, this.defaultValue);
}

APP.prototype.proceed = function(){
	$('#resultNotComp').html("Anzahl zu speichernder Bits: " + (this.rows * this.rows) + " = (" + this.rows + "px x " + this.rows + "px)<br>" +
		"bei einer Farbtiefe von 24bit<br>" +
		(this.rows * this.rows) + " x 24 = " + 24*(this.rows * this.rows) + " bit<br>" +
		"= " + (24*(this.rows * this.rows))/8 + " Byte<br>" +
		"= <u>" + (parseInt(10000 * (((24 * (this.rows * this.rows)) / 8) / 1024))) / 10000 + " KB</u>");
	//Number of bits to be saved: ... with a color depth of 24bit 

	var counter = 0;	
	var ticker = 0;
	var string = "";
	var result = 0;
	var last;
	var maxticker=0;
	for(var r=0; r < this.rows; r++){
		last=this.data[r][0];
		
		for(var c=0; c < this.cols; c++){
			if(this.data[r][c] != last){
				counter++;
				last = this.data[r][c];
				string+="("+ticker.toString(2).length+"+24) + ";
				result+=parseInt(ticker.toString(2).length)+24; 
				if(ticker > maxticker) maxticker = ticker;
				ticker=1;		
			} else {
				ticker++;
			}
		}
		
		counter++;
		string+="("+ticker.toString(2).length+"+24) + ";
		result+=parseInt(ticker.toString(2).length)+24;
		if(ticker > maxticker) maxticker = ticker;
		ticker=0;	
	}
	
	string = string.slice(0, -2);

	$('#resultRLCf').html("Bei einer Bildgröße von (" + this.rows + " x " + this.rows + ") sind insgesamt " + counter + " Zeichenfolgen vorhanden<br><br>" +	//With an image size of ... are in total ... strings exist 
		"minimale feste Anzahl bit: " + maxticker.toString(2).length + " / Anzahl der Zeichen: " + maxticker + "<br>" +	//minimum fixed number ... Number of characters: 
		"benötigter Speicherplatz bei " + maxticker.toString(2).length + " bit / Anzahl der Zeichen und 24 bit Farbtiefe:<br><br>" +	//required storage space for ... Number of characters and 24 bit color depth 
		counter + " x ("+maxticker.toString(2).length+" + 24) = " + counter*(maxticker.toString(2).length+24) + " bit<br>"+
		"= " + (counter*(maxticker.toString(2).length+24))/8 + " Byte<br>"+
		"= <u>" + (parseInt(10000*(((counter*(maxticker.toString(2).length+24))/8)/1024)))/10000 + " KB</u><br><br><hr><br>"+
		"Worst Case: 1 Byte (= 8 bit) für Codierung der Anzahl der Zeichen<br>" +	//for coding the number of characters 
		counter + " x (8 + 24) = " + counter*(8+24) + " bit<br>"+
		"= " + (counter*(8+24))/8 + " Byte<br>"+
		"= <u>" + (parseInt(10000*(((counter*(8+24))/8)/1024)))/10000 + " KB</u>");
		
	$('#resultRLCv').html("Bei einer Bildgröße von (" + this.rows + " x " + this.rows + ") sind insgesamt " + counter + " Zeichenfolgen vorhanden<br><br>" +	//With an image size of ... are in total ... strings exist 
		"benötigter Speicherplatz bei variabler Anzahl bit / Anzahl der Zeichen und 24 bit Farbtiefe:<br><br>" +	//required storage space with variable number ... Number of characters and 24 bit color depth 
		"[nach dem Schema (minimale Anzahl bit für Anzahl der Zeichen + Farbtiefe)]<br><br>" +	//according to the scheme (minimum number of bits for number of characters + color depth) 
		string+"<br><br>"+
		"= "+ result + " bit<br>"+
		"= "+ result/8 + " Byte<br>"+
		"= <u>"+ (parseInt(10000*(result/8)/1024))/10000 + " KB</u>");
		
}