function APP(elemId, germanyBBox, screenSizeBox, stations){
	this.elemId=elemId;
	this.resetStations = stations;
	this.networkLocations, this.stationList;
	this.transform = new TRANSFORM(germanyBBox,screenSizeBox);
	this.reset();
	this.repaint();
	this.addOnClickListener(elemId);
}

APP.prototype.reset = function(){
	this.stationList = [];
	this.networkLocations = [];
	var thisAppInstance = this;
	$.each(this.resetStations, function(index, station){
		thisAppInstance.addStation(station[1],station[2],station[0]);
	});
	this.repaint();
}

APP.prototype.addOnClickListener = function(elem){
	var thisAppInstance = this;
	$("#"+elem).click(function(e){
		var x = e.pageX - this.offsetLeft;
		var y = e.pageY - this.offsetTop;
		thisAppInstance.onClickEvent(x,y);
	});	
}

APP.prototype.onClickEvent = function(x,y){
	var closest = false;
	if(this.networkLocations.length == 0) this.repaint();
	var point = this.transform.invertTransformPoint(new POINT(x,y));
	this.addNewLocation(point);
}

APP.prototype.addNewLocation = function(point){
	this.networkLocations.push(
		point
	);
	point = this.transform.transformPoint(point);
	ctx.fillStyle="red";
	ctx.beginPath();	
	ctx.rect(point.getX()-4, point.getY()-4, 8, 8);
	ctx.closePath();
	ctx.fill();		
}

APP.prototype.addStation = function(x,y,name){
	this.stationList.push(
		new STATION(x,y,name)
	);	
}

APP.prototype.getStationByName = function(name){
	var result = false;
	$.each(this.stationList, function(index, station){
		if(station.getName().toUpperCase() === name.toUpperCase()){
			result = station;
			return true;
		}
	});
	return result;
}

APP.prototype.drawStations = function(array,color){
	var transform = this.transform;
	ctx.fillStyle=color;
	$.each(array, function(index, station){
		ctx.beginPath();	
		var point = transform.transformPoint(station.getLocation());
		ctx.arc(point.getX(), point.getY(), 5, 0, Math.PI*2, true);
		ctx.fillText(station.getName(),point.getX()+7,point.getY()+4);
		ctx.closePath();
		ctx.fill();		
	});		
}

APP.prototype.repaint = function(){
	canvas = document.getElementById(this.elemId);
    ctx = canvas.getContext("2d");
	
	canvas.height = this.transform.getScreenHeight();
	canvas.width = this.transform.getScreenWidth();	
	
	var background = new Image();
	background.src = "img/Karte_Deutschland.jpg";
	
	var thisAppInstance = this;
	background.onload = function(){
		ctx.drawImage(background,0,0, thisAppInstance.transform.getScreenWidth(), thisAppInstance.transform.getScreenHeight());
		//syncronous
		thisAppInstance.drawStations(thisAppInstance.stationList,"#ffffff");
		var array = [];
		$.each(thisAppInstance.startStopPath, function(index, stationName){
			array.push(thisAppInstance.getStationByName(stationName));
		});
		thisAppInstance.drawStations(array,"#000");

		$.each(thisAppInstance.networkLocations, function(index, point){
			point = thisAppInstance.transform.transformPoint(point);
			ctx.fillStyle="red";
			ctx.beginPath();	
			ctx.rect(point.getX()-4, point.getY()-4, 8, 8);
			ctx.closePath();
			ctx.fill();		
		});
	};
}

APP.prototype.run = function(){
	if(this.networkLocations.length < 2){
		alert("[ERROR] Es werden mindestens 2 Punkte benötigt.");
		return false;
	}
	
	var result=[];
	
	var matrix = new Array(this.networkLocations.length);

	for (var i = 0; i < this.networkLocations.length; i++) {
		matrix[i] = new Array(this.networkLocations.length);
	}
	
	//matrix
	
	for(var r=0; r < this.networkLocations.length; r++){
		for(var c=0; c < this.networkLocations.length; c++){
			if(r == c){
				matrix[r][c] = null;
			} else {
				matrix[r][c] = parseInt(calculateDifferance(this.networkLocations[r],this.networkLocations[c])*10000);
			}
		}
	}
	
	//row mini
	
	for(var r=0; r < this.networkLocations.length; r++){
		var minimum = null;
		for(var c=0; c < this.networkLocations.length; c++){
			if(matrix[r][c] === null) continue;
			if(matrix[r][c] < minimum || minimum === null) minimum = matrix[r][c];
		}
		
		for(var c=0; c < this.networkLocations.length; c++){
			if(matrix[r][c] === null) continue;
			matrix[r][c] = matrix[r][c] - minimum;
		}		
		
	}
	
	//col mini
	
	var minimum;
	
	for(var c=0; c < this.networkLocations.length; c++){
		minimum = null;
		for(var r=0; r < this.networkLocations.length; r++){
			if(matrix[r][c] === null) continue;
			if(matrix[r][c] < minimum || minimum === null) minimum = matrix[r][c];
		}
		
		for(var r=0; r < this.networkLocations.length; r++){
			if(matrix[r][c] === null) continue;
			matrix[r][c] = matrix[r][c] - minimum;
		}		
		
	}
	
	//panelties by 0
	
	do{
		for(var r=0; r < this.networkLocations.length; r++){
			for(var c=0; c < this.networkLocations.length; c++){
				if(typeof matrix[r][c] !== 'number' || matrix[r][c] != 0) 
					continue; //null or object containing panilty
				
				var panelty = 0;
				minimum = null;
				
				for(var i=0; i < this.networkLocations.length; i++){
					if(i == r || matrix[i][c] === null) 
						continue;
					
					if(typeof matrix[i][c] === 'object'){
						minimum = 0;
						break;
					} else {
						if(minimum === null || matrix[i][c] < minimum)
							minimum = matrix[i][c];
					}
				}
				
				panelty += minimum;
				minimum = null;
				
				for(var i=0; i < this.networkLocations.length; i++){
					if(i == c || matrix[r][i] === null) 
						continue;
					
					if(typeof matrix[r][i] === 'object'){
						minimum = 0;
						break;
					} else {
						if(minimum === null || matrix[r][i] < minimum)
							minimum = matrix[r][i];
					}
				}			
				
				panelty += minimum;
				
				matrix[r][c] = {panelty};
				
			}
		}	
		
		var max = {
			value : null,
			r: null,
			c: null
		}
		
		for(var r=0; r < this.networkLocations.length; r++){
			for(var c=0; c < this.networkLocations.length; c++){
				if(matrix[r][c] === null || typeof matrix[r][c] === 'number') continue;
				if(matrix[r][c].panelty > max.value || max.value === null){
					max.value = matrix[r][c].panelty;
					max.r = r;
					max.c = c;
				}
			}
		}	
		
		for(var i=0; i < this.networkLocations.length; i++){
			matrix[i][max.c] = null;
			matrix[max.r][i] = null;
		}	
		
		matrix[max.c][max.r] = null;
		
		result.push(
			[max.r,max.c]
		);
		
		
		for(var r=0; r < this.networkLocations.length; r++){
			for(var c=0; c < this.networkLocations.length; c++){
				if(matrix[r][c] === null || typeof matrix[r][c] === 'number') continue;
				matrix[r][c] = 0;
			}
		}
	
		for(var r=0; r < this.networkLocations.length; r++){
			minimum = null;
			
			for(var c=0; c < this.networkLocations.length; c++){
				if(matrix[r][c] === null) continue;
				if(matrix[r][c] < minimum || minimum == null) minimum = matrix[r][c];
			}
			
			if(minimum != 0 && minimum !== null){
				for(var c=0; c < this.networkLocations.length; c++){
					if(matrix[r][c] === null) continue;
					matrix[r][c] = matrix[r][c] - minimum;
				}			
			}
		}

		for(var c=0; c < this.networkLocations.length; c++){
			minimum = null;
			
			for(var r=0; r < this.networkLocations.length; r++){
				if(matrix[r][c] === null) continue;
				if(matrix[r][c] < minimum || minimum == null) minimum = matrix[r][c];
			}
			
			if(minimum != 0 && minimum !== null){
				for(var r=0; r < this.networkLocations.length; r++){
					if(matrix[r][c] === null) continue;
					matrix[r][c] = matrix[r][c] - minimum;
				}			
			}
		}
		
	} while (!containsOnlyNull(matrix));	
	
	if(! this.checkIfFinal(result)){
		//result = this.reprocess(result);
	}
	
	this.drawConnections(result);
}

APP.prototype.simAnnealing = function(){
	var instance = new SA(this.networkLocations, 10000, 0.005);
	var connections = instance.run();
	this.drawConnections(connections);
}

APP.prototype.checkIfFinal = function(array){
	var start = array[0][0];
	var next = array[0][1];
	var count = 1;
	var check;
	
	do{
		check = next;
		for(var i=0; i<array.length;i++){
			if(array[i][0] == next){
				count++;
				next=array[i][1];
			}
		}
	} while (start != next && check != next);
	
	if(count != array.length){
		return false;
	}
	
	return true;
}

APP.prototype.drawConnections = function(array){
	var allPoints = this.networkLocations;
	ctx.strokeStyle = "#2EFEF7";
	var transform = this.transform;
		
	$.each(array, function(index, connection){	
		var pointa = transform.transformPoint(allPoints[connection[0]])
		var pointb = transform.transformPoint(allPoints[connection[1]]);
		ctx.beginPath();
		ctx.moveTo(pointa.getX(),pointa.getY());
		ctx.lineTo(pointb.getX(),pointb.getY());
		ctx.closePath();
		ctx.stroke();
	});	
}
