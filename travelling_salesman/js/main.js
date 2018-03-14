function calculateDifferance(p1,p2){
	return Math.sqrt(
		Math.pow((p2.getX() - p1.getX()),2)
		+
		Math.pow((p2.getY() - p1.getY()),2)
	);
}

function containsOnlyNull(array2d){
	
	for(var r=0; r < array2d.length; r++){
		for(var c=0; c < array2d[r].length; c++){
			if(array2d[r][c] !== null) return false;
		}
	}
	
	return true;

}

$(function() {	
	
	//source: https://www.laengengrad-breitengrad.de/adresse-zu-laengengrad-breitengrad-gps-koordinaten
	var stations = [
		["Dresden",13.7372621,51.0504088],
		["Berlin",13.404954,52.520007],
		["Leipzig",12.373075,51.339695],
		["Rostock",12.099147,54.092441],
		["Magdeburg",11.627624,52.120533],
		["Jena",11.589237,50.927054],
		["München",11.581981,48.135125],
		["Nürnberg",11.073275, 49.450728],
		["Erfurt",11.029608, 50.982259],
		["Schwerin",11.398916, 53.632969],
		["Würzburg",9.952605, 49.789490],
		["Kiel",10.119395, 54.320813],
		["Hamburg",9.992065, 53.548541],
		["Hannover",9.730132, 52.375020],
		["Kassel",9.479227, 51.310426],
		["Stuttgart",9.184721, 48.773115],
		["Frankfurt",8.682890, 50.109925],
		["Freiburg",7.841363, 47.996165],
		["Saarbrücken",6.995437, 49.237394],
		["Köln",6.961277, 50.935022],
		["Düsseldorf",6.773179, 51.225065],
		["Dortmund",7.466433, 51.511130],
		["Osnabrück",8.045769, 52.277490],
		["Bremen",8.800843, 53.076725]
	];
	
	myApp = new APP('map', stations, 'mapid');
	
	$("button").click(function(){
		var clicked = $(this).attr("name");
		
		if(clicked.localeCompare("run") == 0){	
			myApp.simAnnealing();
		}
		
		if(clicked.localeCompare("runAnimated") == 0){	
			intervalId = myApp.simAnnealingAnimated(10);
		}		
		
		if(clicked.localeCompare("reset") == 0){
			myApp.reset();
		}
	});
});