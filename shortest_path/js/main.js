// should be moved to the calculation
function calculateDifferance(p1, p2) {
	return Math.sqrt(
		Math.pow((p2.getX() - p1.getX()),2)
		+
		Math.pow((p2.getY() - p1.getY()),2)
	);
}

function getMiddlePoint(p1,p2){
	return new POINT(
		(p1.getX() + p2.getX())/2,
		(p1.getY() + p2.getY())/2
	);
}

// -----------------------------------------------------------
// Main functionality
// (depending on the esri JS libraries)
// -----------------------------------------------------------	
require(["esri/Map","esri/views/MapView","esri/Graphic","esri/layers/GraphicsLayer"], function(Map, MapView, Graphic, GraphicsLayer) {		
	//source: https://www.laengengrad-breitengrad.de/adresse-zu-laengengrad-breitengrad-gps-koordinaten
	//array of the stations
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
	//array of the grid of stations
	var network = [
		["Dresden","Berlin"],
		["Dresden","Leipzig"],
		["Dresden","Jena"],
		["Dresden","Nürnberg"],
		["Leipzig","Berlin"],
		["Leipzig","Magdeburg"],
		["Leipzig","Erfurt"],
		["Magdeburg","Berlin"],
		["Magdeburg","Hannover"],
		["Berlin","Hannover"],
		["Berlin","Hamburg"],
		["Berlin","Schwerin"],
		["Berlin","Rostock"],
		["Nürnberg","Leipzig"],
		["Nürnberg","Jena"],
		["Nürnberg","München"],
		["Nürnberg","Würzburg"],
		["Jena","Erfurt"],
		["München","Stuttgart"],
		["Stuttgart","Freiburg"],
		["Stuttgart","Saarbrücken"],
		["Freiburg","Saarbrücken"],
		["Stuttgart","Frankfurt"],
		["Frankfurt","Saarbrücken"],
		["Würzburg","Frankfurt"],
		["Frankfurt","Erfurt"],
		["Frankfurt","Kassel"],
		["Frankfurt","Köln"],
		["Erfurt","Kassel"],
		["Kassel","Köln"],
		["Köln","Düsseldorf"],
		["Düsseldorf","Dortmund"],
		["Köln","Hannover"],
		["Dortmund","Hannover"],
		["Dortmund","Osnabrück"],
		["Osnabrück","Hannover"],
		["Kassel","Hannover"],
		["Hannover","Hamburg"],
		["Hannover","Bremen"],
		["Bremen","Osnabrück"],
		["Bremen","Hamburg"],
		["Hamburg","Kiel"],
		["Hamburg","Rostock"],
		["Hamburg","Schwerin"],
		["Schwerin","Rostock"],
	];
	
	$("button").click(function(){
		var clicked = $(this).attr("name");
		if(clicked.localeCompare("reset") == 0){
			myApp.startStopPath = []; //reset;
			myApp.reset();
		}

		$('#deutsch').click(function () {
			$('#body').tab('show');
		});

		$('#deutsch').html("Beim Shortest-Path-Problem wird der geometrisch kürzeste Weg zwischen einem Start- und "+ 
			"Zielknoten gesucht.<br><br>" +
			"Nach dem Starten des Beispiels ist in der Karte rechts das Eisenbahnnetz für die größten Städte "+
			"Deutschlands schematisch dargestellt. Die Zahlen geben die Entfernung (Luftlinie) zwischen zwei "+
			"Städten in 10 km an.<br>"+
			"<br>"+
			"Die kürzeste Entfernung zwischen zwei beliebigen Punkten wird hier mit dem Dijkstra-Algorithmus "+
			"berechnet, bei dem vom Startknoten aus iterativ die jeweiligen Nachbarknoten mit minimaler Distanz "+
			"zum Startknoten besucht werden, bis der Zielknoten bzw. alle Knoten besucht sind.<br>"+
			"<br>"+
			"Dieser Algorithmus findet z.B. bei Routenplanern und Navigationssystemen Anwendung.");
		$('#englisch').html("In the case of the shortest path problem, the geometrically shortest path between a start "+ 
			"and destination node is sought.<br><br>"+
			"The rail network for the largest cities in Germany is shown schematically on the map on the right "+
			"after starting the example. The numbers indicate the distance (as the crow flies) between two "+
			"cities in 10 km.<br><br>"+
			"The shortest distance between any two points is calculated with the Dijkstra algorithm, in which "+
			"the respective neighboring nodes are visited iteratively from the starting node with the minimum "+
			"distance to the starting node until the destination node or rather all nodes are visited.<br><br>"+
			"This algorithm is used for example in route planners and navigation systems.");
	});
								
	var esriMap = new Map({
		basemap: "streets-relief-vector",
	});

	var esriView = new MapView({
		container: "content",
		map: esriMap,
		center: [10.4541205,51.164305],
	});

	var connectingLineLayer = new GraphicsLayer({
		id:"connectingLine"
	});
	var stationLayer = new GraphicsLayer({
		id:"stationsPoint"
	});
	
	esriMap.addMany([connectingLineLayer, stationLayer]);
	
	myApp = new APP(esriMap, esriView, stations, network);
});