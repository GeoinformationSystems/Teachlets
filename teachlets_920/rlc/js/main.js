$(function() {
	var myAppInstance = new APP(16,0,"#drawfield"); //size defaultvalue uniqueid rows = colums
	var block;
	
	//start config
	$('#resultRLCf').show();
	$('#rlc_var').css("background","none");
	$('#rlc_fest').css("background","#b8cfe5");	
	
	$("#drawfield").mousedown(function(e){
		var x = e.pageX - this.offsetLeft;
		var y = e.pageY - this.offsetTop;
		value = myAppInstance.getValue(x,y);
		if(value == 1){
			value = 0;
		} else {
			value = 1;
		}
		
		$(this).mousemove(function(e){
			block = true;
			var x = e.pageX - this.offsetLeft;
			var y = e.pageY - this.offsetTop;
			if(value !== false){
				myAppInstance.setValue(x,y,value);
			}
			myAppInstance.refresh();
		});
	}).mouseup(function () {
		$(this).unbind('mousemove');
	}).mouseout(function () {
		$(this).unbind('mousemove');
	}).click(function(e){
		if(block){
			block = false;
			return;
		}
		var x = e.pageX - this.offsetLeft;
		var y = e.pageY - this.offsetTop;
		
		myAppInstance.invertRasterDataValue(x,y);
		myAppInstance.refresh();
	});	
	
	
	$("button").click(function(){
		var clicked = $(this).attr("name");
		
		if(clicked.localeCompare("resetRaster") == 0){
			$('#resultRLCf').html("");
			$('#resultRLCv').html("");
			$('#resultNotComp').html("");
			myAppInstance.resetRaster();
			myAppInstance.clearRaster();
		}
		
		if(clicked.localeCompare("rlc_fest") == 0){
			$('#resultRLCf').show();
			$('#resultRLCv').hide();
			$('#rlc_var').css("background","none");
			$('#rlc_fest').css("background","#b8cfe5");
		}
		
		if(clicked.localeCompare("rlc_var") == 0){
			$('#resultRLCv').show();
			$('#resultRLCf').hide();
			$('#rlc_fest').css("background","none");
			$('#rlc_var').css("background","#b8cfe5");
		}
		
		if(clicked.localeCompare("run") == 0){
			$('#resultRLCf').html("");
			$('#resultNotComp').html("");
			myAppInstance.proceed();
		}	
	});
	
	$('#examplesSelect').on('change', function(){
		myAppInstance.clearRaster();
		var val = parseInt(this.value);
		switch(val) {
			case 0:
				myAppInstance.changeRasterSize(16);
				break;
			case 1:
				var raster = new Array(16);
				for (var i = 0; i < 16; i++) {
				  raster[i] = new Array(16);
				}
				
				for(var r=0; r < 16; r++){
					for(var c=0; c < 16; c++){
						if(r<4 && c<4)
							raster[r][c] = 1;
						else
							raster[r][c] = 0;
					}
				}
				
				myAppInstance.loadRaster(raster);
				break;
			case 2:
				var raster=[[1,1,1,1,0,0,0,0],[1,1,1,0,1,1,0,1],[0,0,0,1,0,0,0,1],[1,1,1,0,0,0,1,1],[0,1,1,0,0,0,1,1],[0,0,0,1,1,0,0,0],[0,0,1,1,1,0,0,0],[0,1,1,1,1,1,1,0]];
				myAppInstance.loadRaster(raster);
				break;
			case 3:
				var raster = new Array(100);
				for (var i = 0; i < 100; i++) {
				  raster[i] = new Array(100);
				}
				
				for(var r=0; r < 100; r++){
					for(var c=0; c < 100; c++){
						if(r>25 && r<76 && c>25 && c<75)
							raster[r][c] = 1;
						else
							raster[r][c] = 0;
					}
				}
				
				myAppInstance.loadRaster(raster);
				break;
		} 
	})	
	
});