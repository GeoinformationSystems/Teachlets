function MODEL(cellsize,id){
	this.stationList = [];
	this.elemId = id;
	this.raster = new RASTER($(this.elemId).width() / cellsize,$(this.elemId).height() / cellsize, cellsize, 0);
	this.runedIDW = false;
}

MODEL.prototype.addStation = function(x,y,value){
	this.stationList.push(
		new STATION(x,y,value)
	);
	this.repaint();
}

MODEL.prototype.getCleanStationList = function(center){
	var limiter = parseInt($("#limiter").val());
	if(limiter && limiter > 0){
		var result = [];
		var stationList = this.stationList;
		var distanceArray = [];
		
		$.each(stationList, function(index, station){
			distanceArray.push({
				distance: calculateDifferance(station.getLocation(),center),
				station: station
			});
		});
		
		distanceArray.sort(mycompare);
		
		$.each(distanceArray, function(index, value){
			result.push(value.station);
			if(result.length == limiter)
				return false;
		});
		return result;
		
	} else {
		return this.stationList;
	}
}

MODEL.prototype.runIDW = function(){
	if(this.stationList.length < 2){
		alert("[FEHLER] Es müssen mindestens 2 Stationen vorhanden sein für eine IDW Interpolation.");
		return;
	}
	var r,c;
	for(r=0; r < this.raster.getRows(); r++){
		for(c=0; c < this.raster.getCols(); c++){
			var cellcenter = this.raster.getCellcenter(r,c);
			var numerator = 0, denominator = 0;
			var stations = this.getCleanStationList(cellcenter);
			$.each(stations, function(index, station){
				var distance = calculateDifferance(cellcenter,station.getLocation());
				numerator += station.getValue() / distance;
				denominator += 1 / distance;
			});
			this.raster.setValue(r,c,(numerator / denominator));
		}
	}
	this.runedIDW = true;
	this.repaint();
}

MODEL.prototype.resetAll = function(){
	this.stationList = [];
	this.runedIDW = false;
	this.repaint();
}

MODEL.prototype.repaint = function(){
	var ctx = $(this.elemId).get(0).getContext("2d");
	ctx.beginPath();	
	ctx.clearRect(0, 0, $(this.elemId).width(), $(this.elemId).height());
	if(this.runedIDW){
		var r,c,minValue=false,maxValue=false;
		
		for(r=0; r < this.raster.getRows(); r++){
			for(c=0; c < this.raster.getCols(); c++){
				if(this.raster.getValue(r,c) > maxValue || maxValue == false){
					maxValue = this.raster.getValue(r,c);
				}
				if(this.raster.getValue(r,c) < minValue || minValue == false){
					minValue = this.raster.getValue(r,c);
				}
			}
		}

		var factor = 255 / Math.abs(maxValue - minValue);
		
		for(r=0; r < this.raster.getRows(); r++){
			for(c=0; c < this.raster.getCols(); c++){
				var value = parseInt((this.raster.getValue(r, c) - minValue) * factor);

				ctx.fillStyle="rgb("+value+", 0, "+(255 - value)+")";
				ctx.fillRect(c*this.raster.getCellSize(),r*this.raster.getCellSize(),this.raster.getCellSize(),this.raster.getCellSize()); 
			}
		}		
	}
	ctx.closePath();
	ctx.font = "11px Arial";
	ctx.fillStyle="black";
	$.each(this.stationList, function(index, station){
		ctx.beginPath();	
		ctx.arc(station.getLocation().getX(), station.getLocation().getY(), 5, 0, Math.PI*2, true);
		ctx.fillText("S"+(index+1)+": "+station.getValue(),station.getLocation().getX()+7,station.getLocation().getY()+4);
		ctx.closePath();
		ctx.fill();
	});
}


	