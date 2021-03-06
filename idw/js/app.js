function APP(cellsize,id){
	this.stationList = [];
	this.elemId = id;
	this.raster = new RASTER($(this.elemId).width() / cellsize,$(this.elemId).height() / cellsize, cellsize, 0);
	this.runnedIDW = false;
};

APP.prototype.addStation = function(x,y,value){
	this.stationList.push(
		new STATION(x,y,value)
	);
	this.repaint();
};

APP.prototype.getCleanStationList = function(center){
	var activeLang="de";
	if($('button[name="en"]').is(':disabled')) activeLang="en";
	
	var limiter = parseInt($("#limiter[lang='"+ activeLang +"']").val());
	if(limiter && limiter > 0){
		var result = [];
		var stationList = this.stationList;
		var distanceArray = [];
		
		$.each(stationList, function(index, station){
			distanceArray.push({
				distance: station.getDistanceTo(center),
				station: station
			});
		});
		
		distanceArray.sort( function(a,b) {
				if (a.distance < b.distance)
					return -1;
				if (a.distance > b.distance)
					return 1;
				return 0;
			}
		);
		
		$.each(distanceArray, function(index, value){
			result.push(value.station);
			if(result.length == limiter)
				return false;
		});
		return result;
		
	} else {
		return this.stationList;
	}
};

APP.prototype.runIDW = function(){
	if(this.stationList.length < 2){
		alert("[ERROR] Es müssen mindestens 2 Stationen vorhanden sein für eine IDW Interpolation. / There must be at least 2 stations for an IDW interpolation."); 
		return;
	}
	var r,c;
	for(r=0; r < this.raster.getRows(); r++){
		for(c=0; c < this.raster.getCols(); c++){
			var cellcenter = this.raster.getCellcenter(r,c);
			var numerator = 0, denominator = 0;
			var stations = this.getCleanStationList(cellcenter);
			$.each(stations, function(index, station){
				var distance = station.getDistanceTo(cellcenter);
				numerator += station.getValue() / distance;
				denominator += 1 / distance;
			});
			this.raster.setValue(r,c,(numerator / denominator));
		}
	}
	this.runnedIDW = true;
	this.repaint();
};

APP.prototype.resetAll = function(){
	this.stationList = [];
	this.runnedIDW = false;
	this.repaint();
};

APP.prototype.repaint = function(){
	var ctx = $(this.elemId).get(0).getContext("2d");
	ctx.beginPath();	
	ctx.clearRect(0, 0, $(this.elemId).width(), $(this.elemId).height());
	if(this.runnedIDW){
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
};


	
