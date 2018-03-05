$(function() {
	var myAppInstance = new APP(8,0,"#drawfield"); //size defaultvalue uniqueid rows = colums
	
	$("#drawfield").click(function(e){
		var x = e.pageX - this.offsetLeft;
		var y = e.pageY - this.offsetTop;
		myAppInstance.invertRasterDataValue(x,y);
		myAppInstance.refresh();
	});
	
	$("button").click(function(){
		var clicked = $(this).attr("name");
		
		if(clicked.localeCompare("resetRaster") == 0){
			$('#resultChart').html("");
			myAppInstance.resetRaster();
			myAppInstance.refresh();
		}
		
		if(clicked.localeCompare("runQuad") == 0){
			$('#resultChart').html("");
			myAppInstance.startQuad();
		}

		if(clicked.localeCompare("help") == 0){
		}		
	});
});