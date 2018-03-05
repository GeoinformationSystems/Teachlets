function APP(elemId,germanyBBox,screenSizeBox, stations, network){
	this.elemId=elemId;
	this.resetStations = stations;
	this.resetNetwork = network;
	this.stationList = [];
	this.stationGrid = [];
	this.startStopPath = [];
	this.transform = new TRANSFORM(germanyBBox,screenSizeBox);
	this.clickMinDifference = 0.075; //buffer arround stationpoint
	this.reset();
	this.repaint();
	this.addOnClickListener(elemId);
}

APP.prototype.reset = function(){
	this.stationGrid = [];
	this.stationList = [];
	var thisAppInstance = this;
	$.each(this.resetStations, function(index, station){
		thisAppInstance.addStation(station[1],station[2],station[0]);
	});
	
	$.each(this.resetNetwork, function(index, entry){
		thisAppInstance.addConnection(entry[0],entry[1]);
	});		
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
	var point = this.transform.invertTransformPoint(new POINT(x,y));
	
	$.each(this.stationList, function(index, station){
		if(closest === false || calculateDifferance(point,closest.getLocation()) > calculateDifferance(station.getLocation(),point)){
			closest = station;
		}
	});	
	
	if(calculateDifferance(closest.getLocation(),point) > this.clickMinDifference) return false;
	this.setOrResetStartOrEndPoint(closest);	
}

APP.prototype.setOrResetStartOrEndPoint = function(station){
	if(this.startStopPath.length == 0){
		//new input
		this.repaint();
	}
	
	if(this.startStopPath.indexOf(station.getName()) == -1){
		this.startStopPath.push(station.getName());
		this.drawStations([station],"#ffff00");
	}
	
	if(this.startStopPath.length == 2){
		this.startDijkstra();
		this.startStopPath = []; //reset;
	}
}

APP.prototype.addStation = function(x,y,name){
	this.stationList.push(
		new STATION(x,y,name)
	);	
}

APP.prototype.getStation = function(name){
	var result = false;
	$.each(this.stationList, function(index, station){
		if(station.getName().toUpperCase() === name.toUpperCase()){
			result = station;
			return true;
		}
	});
	return result;
}

APP.prototype.addConnection = function(cityA,cityB){
	var distance = calculateDifferance(this.getStation(cityA).getLocation(), this.getStation(cityB).getLocation());
	this.stationGrid.push(
		new CONNECTION(this.getStation(cityA),this.getStation(cityB),distance)
	);		
}

APP.prototype.drawConnections = function(array,color){
	ctx.strokeStyle = color;
	ctx.fillStyle="#ffffff";
	var transform = this.transform;
	$.each(array, function(index, connection){	
		var pointa = transform.transformPoint(connection.getA().getLocation());
		var pointb = transform.transformPoint(connection.getB().getLocation());
		ctx.beginPath();
		ctx.moveTo(pointa.getX(),pointa.getY());
		ctx.lineTo(pointb.getX(),pointb.getY());
		ctx.closePath();
		ctx.stroke();
		var mpoint = getMiddlePoint(pointa, pointb);
		ctx.fillText(parseInt(connection.getDistance()*10)/10,mpoint.getX(),mpoint.getY());
	});		
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
		thisAppInstance.drawConnections(thisAppInstance.stationGrid,"#ff0000");
		thisAppInstance.drawStations(thisAppInstance.stationList,"#ffffff");
		var array = [];
		$.each(thisAppInstance.startStopPath, function(index, stationName){
			array.push(thisAppInstance.getStation(stationName));
		});
		thisAppInstance.drawStations(array,"#ffff00");
	};
}

APP.prototype.startDijkstra = function(){
	var ret = new runDijkstra(this.stationGrid,this.getStation(this.startStopPath[0]),this.getStation(this.startStopPath[1]));
	this.stationGrid = [];
	for(i=0;i<ret.length;i++){
		this.addConnection(ret[i][0],ret[i][1]);
	}
	this.drawConnections(this.stationGrid,"#ffff00");
	this.reset();
}
