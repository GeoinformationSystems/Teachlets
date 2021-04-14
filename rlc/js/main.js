$(function() {
	// resize canvas to fill parent (keep square)
	var canvas = $("#drawfield");
	var minSize = Math.min(canvas.parent().width(), canvas.parent().height());
	canvas[0].width=minSize;
	canvas[0].height=minSize;
	
	var myAppInstance = new APP(16,0,"#drawfield"); //size defaultvalue uniqueid rows = colums
	var block;
	
	//start config
	$('#rlc_festDe').addClass("active");
	$('#resultRLCvDe').hide();
	$('#resultRLCvEng').hide();

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
	
	// default lang is German => hide all English elements
	$('[lang="en"]').hide();
	$('button[name="de"]').prop("disabled", true);

	// add click handler to all elements of type button
	$("button").click(function () {
		// get name of button
		var clicked = $(this).attr("name");

		// determine which button is clicked based on "name" attribute
		if(clicked.localeCompare("resetRaster") == 0){
			$('#resultRLCfDe').html("");
			$('#resultRLCfEng').html("");
			$('#resultRLCvDe').html("");
			$('#resultRLCvEng').html("");
			$('#resultNotCompDe').html("");
			$('#resultNotCompEng').html("");
			myAppInstance.resetRaster();
			myAppInstance.clearRaster();
		} 
		if(clicked.localeCompare("rlc_festDe") == 0){
			//$('#resultRLCfDe').show();
			//$('#resultRLCfEng').show();
			//$('#resultRLCvDe').hide();
			//$('#resultRLCvEng').hide();
			//$('#rlc_fest').addClass("active");
			//$('#rlc_var').removeClass("active");
			$('#info > div > div > p[id="resultRLCfDe"]').show();
			$('#info > div > div > p[id="resultRLCfEng"]').hide();
			$('#info > div > div > p[id="resultRLCvDe"]').hide();
			$('#info > div > div > p[id="resultRLCvEng"]').hide();
			$('#rlc_festDe').addClass("active");
			$('#rlc_festEng').removeClass("active");
			$('#rlc_varDe').removeClass("active");
			$('#rlc_varEng').removeClass("active");
		}
		if (clicked.localeCompare("rlc_festEng") == 0) {
			//$('#resultRLCfEng').show();
			//$('#resultRLCfDe').show();
			//$('#resultRLCvDe').hide();
			//$('#resultRLCvEng').hide();
			//$('#rlc_fest').addClass("active");
			//$('#rlc_var').removeClass("active");
			$('#info > div > div > p[id="resultRLCfEng"]').show();
			$('#info > div > div > p[id="resultRLCfDe"]').hide();
			$('#info > div > div > p[id="resultRLCvDe"]').hide();
			$('#info > div > div > p[id="resultRLCvEng"]').hide();
			$('#rlc_festEng').addClass("active");
			$('#rlc_festDe').removeClass("active");
			$('#rlc_varDe').removeClass("active");
			$('#rlc_varEng').removeClass("active");
		}
		if(clicked.localeCompare("rlc_varDe") == 0){
			//$('#resultRLCvDe').show();
			//$('#resultRLCvEng').show();
			//$('#resultRLCfDe').hide();
			//$('#resultRLCfEng').hide();
			//$('#rlc_fest').removeClass("active");
			//$('#rlc_var').addClass("active");
			$('#info > div > div > p[id="resultRLCvDe"]').show();
			$('#info > div > div > p[id="resultRLCvEng"]').hide();
			$('#info > div > div > p[id="resultRLCfEng"]').hide();
			$('#info > div > div > p[id="resultRLCfDe"]').hide();
			$('#rlc_varDe').addClass("active");
			$('#rlc_varEng').removeClass("active");
			$('#rlc_festEng').removeClass("active");
			$('#rlc_festDe').removeClass("active");
		}
		if (clicked.localeCompare("rlc_varEng") == 0) {
			//$('#resultRLCvDe').show();
			//$('#resultRLCvEng').show();
			//$('#resultRLCfDe').hide();
			//$('#resultRLCfEng').hide();
			//$('#rlc_fest').removeClass("active");
			//$('#rlc_var').addClass("active");
			$('#info > div > div > p[id="resultRLCvEng"]').show();
			$('#info > div > div > p[id="resultRLCvDe"]').hide();
			$('#info > div > div > p[id="resultRLCfEng"]').hide();
			$('#info > div > div > p[id="resultRLCfDe"]').hide();
			$('#rlc_varEng').addClass("active");
			$('#rlc_varDe').removeClass("active");
			$('#rlc_festEng').removeClass("active");
			$('#rlc_festDe').removeClass("active");
		}
		if(clicked.localeCompare("runDe") == 0){
			//$('#resultRLCfDe').html("");
			//$('#resultRLCfEng').html("");
			//$('#resultNotCompDe').html("");
			//$('#resultNotCompEng').html("");
			$('#resultNotCompDe').show();
			$('#resultNotCompEng').hide();
			$('#info > div > div > p[id="resultRLCfDe"]').show();
			$('#info > div > div > p[id="resultRLCfEng"]').hide();
			$('#info > div > div > p[id="resultRLCvDe"]').hide();
			$('#info > div > div > p[id="resultRLCvEng"]').hide();
			myAppInstance.proceed();
		}	
		if (clicked.localeCompare("runEng") == 0) {
			//$('#resultRLCfDe').html("");
			//$('#resultRLCfEng').html("");
			//$('#resultNotCompDe').html("");
			//$('#resultNotCompEng').html("");
			$('#resultNotCompDe').hide();
			$('#resultNotCompEng').show();
			$('#info > div > div > p[id="resultRLCfDe"]').hide();
			$('#info > div > div > p[id="resultRLCfEng"]').show();
			$('#info > div > div > p[id="resultRLCvDe"]').hide();
			$('#info > div > div > p[id="resultRLCvEng"]').hide();
			myAppInstance.proceed();
		}	
		else if (clicked.localeCompare("en") == 0) {
			$('[lang="en"]').show();
			$('[lang="de"]').hide();
			$('button[name="en"]').prop("disabled", true);
			$('button[name="de"]').prop("disabled", false);
		}
		else if (clicked.localeCompare("de") == 0) {
			$('[lang="de"]').show();
			$('[lang="en"]').hide();
			$('button[name="de"]').prop("disabled", true);
			$('button[name="en"]').prop("disabled", false);
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