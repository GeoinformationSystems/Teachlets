require([
		"esri/Map", 
		"esri/views/MapView", 
		"esri/Graphic", 
		"esri/layers/GraphicsLayer",
		"esri/geometry/geometryEngine",
		"esri/geometry/Polyline",
		"esri/layers/GeoJSONLayer",

	], function (
		Map, 
		MapView, 
		Graphic, 
		GraphicsLayer, 
		geometryEngine,
		Polyline,
		GeoJSONLayer,
	) {

	// switch between spatial system examples
	$("button").click(function(){
		var clicked = $(this).attr("name");
		$("#info > div > button").removeClass("active");
		
		if(clicked == "em"){
			em();
		}		
		if(clicked == "cbm"){
			cbm();			
		}
		if(clicked == "ekm"){
			ekm();			
		}		
	});
	
	// load ESRI map and mapview
	this.esriMap = new Map({
		basemap: "streets-relief-vector",
	});
	this.esriView = new MapView({
		container: "content",
		map: this.esriMap,
		center: [-86.1152991330356,39.81453897084121],
		zoom: 15,
	});
	
	// define color scheme
	var fillColor = [0, 158, 224];		// points inner color
	var outlineColor = [0, 37, 87];		// points outer color	
	var textColor = [0, 37, 87];		// all text
	var haloColor = [255, 255, 255];	// all text
	var pathColor = [0, 37, 87];		// polylines
	
	// define styling classes for points and lines
	var point = {						
		type: "simple-marker",
		color: fillColor,
		size: "10px",
		outline: {
			color: outlineColor,
			width: 1
		}
	};
	var path = {						
		type: "simple-line",
		color: pathColor,
		width: 3
	};
	
	// define label classes for points and lines
	var pointLabelClass = {
		labelPlacement: "above-right",
		labelExpressionInfo: {
			expression: "$feature.name"
		},
		symbol: {
			type: "text",
			color: textColor,
			haloColor: haloColor,
			haloSize: "2px",
			font: {
				size: 14,
				family: "Arial Unicode MS",
				weight: "bold"
			}
		}
	}; 
	var lineLabelClass = {
		labelPlacement: "center-along",
		labelExpressionInfo: {
			expression: "$feature.length + 'm'"
		},
		deconflictionStrategy: "none",
		symbol: {
			type: "text",
			color: textColor,
			haloColor: haloColor,
			haloSize: "2px",
			font: {
				size: 14,
				family: "Arial Unicode MS",
			}
		}		
	};
	
	// create layers from geojson:
	// - baseLayer: with start/end point
	// - emLayer: example Euklidische Metrik
	// - cbmLayer: example City-Block-Metrik
	// - ekmLayer: example Ecken-Kanten-Metrik
	this.baseLayer = new GeoJSONLayer({
        url: "data/base.geojson?nocache=" + (new Date()).getTime(),
		geometryType: "point",
		renderer: {
            type: "simple",
            symbol: point
        },
		fields: [{
			name: "name",
			alias: "Name",
			type: "string"
		  }
		],
		labelingInfo: [pointLabelClass]
      });
	
	this.emLineLayer = new GeoJSONLayer({
        url: "data/em.geojson?nocache=" + (new Date()).getTime(),
		geometryType: "polyline",
		renderer: {
            type: "simple",
            symbol: path
        },
		fields: [{
			name: "length",
			alias: "Length",
			type: "string"
		  }
		],
		labelingInfo: [lineLabelClass]
    });
	
	this.cbmLineLayer = new GeoJSONLayer({
        url: "data/cbm.geojson?nocache=" + (new Date()).getTime(),
		geometryType: "polyline",
		renderer: {
            type: "simple",
            symbol: path
        },
		fields: [{
			name: "length",
			alias: "Length",
			type: "string"
		  }
		],
		labelingInfo: [lineLabelClass]
    });
	
	this.ekmLineLayer = new GeoJSONLayer({
        url: "data/ekm.geojson?nocache=" + (new Date()).getTime(),
		geometryType: "polyline",
		renderer: {
            type: "simple",
            symbol: path
        },
		fields: [{
			name: "length",
			alias: "Length",
			type: "string"
		  }
		],
		labelingInfo: [lineLabelClass]
    });
	
	// add all Layers to mapview
	this.esriMap.addMany([this.emLineLayer, this.cbmLineLayer, this.ekmLineLayer, this.baseLayer]);
	
	// configuration on load
	this.emLineLayer.visible = true;
	this.cbmLineLayer.visible = false;
	this.ekmLineLayer.visible = false;
	
});

// manage visibility for each spatial system example
function em(){
	// info view changes
	$('#em').addClass("active");
	$("#infoEM").show();
	$("#infoCBM").hide();
	$("#infoEKM").hide();
	
	// map view changes
	this.emLineLayer.visible = true;
	this.cbmLineLayer.visible = false;
	this.ekmLineLayer.visible = false;		
}

function cbm(){
	// info view changes
	$('#cbm').addClass("active");
	$("#infoEM").hide();
	$("#infoCBM").show();
	$("#infoEKM").hide();
	
	// map view changes
	this.emLineLayer.visible = false;
	this.cbmLineLayer.visible = true;
	this.ekmLineLayer.visible = false;			
}

function ekm(){
	// info view changes
	$('#ekm').addClass("active");
	$("#infoEM").hide();
	$("#infoCBM").hide();
	$("#infoEKM").show();
	
	// map view changes
	this.emLineLayer.visible = false;
	this.cbmLineLayer.visible = false;
	this.ekmLineLayer.visible = true;					
}