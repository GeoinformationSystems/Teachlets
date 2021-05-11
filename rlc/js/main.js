$(function() {
	// resize canvas to fill parent (keep square)
	var canvas = $("#drawfield");
	var minSize = Math.min(canvas.parent().width(), canvas.parent().height());
	canvas[0].width=minSize;
	canvas[0].height=minSize;
	
	var myAppInstance = new APP(16,0,"#drawfield"); //size defaultvalue uniqueid rows = colums
	var block;
	
	//start config
	$('#rlc_fix').addClass("active");
	$('#resultRLCv').hide();

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
		
		var activeLang="de";
		if($('button[name="en"]').is(':disabled')) activeLang="en";
		
		// get name of button
		var clicked = $(this).attr("name");
	
		// determine which button is clicked based on "name" attribute
		if(clicked.localeCompare("resetRaster") == 0){
			$('#resultRLCf[lang="de"],#resultRLCf[lang="en"],#resultRLCv[lang="de"],#resultRLCv[lang="en"]').html("");
			$('#resultNotComp[lang="de"],#resultNotComp[lang="en"]').html("");		
			myAppInstance.resetRaster();
			// myAppInstance.clearRaster();
		} 
		else if(clicked.localeCompare("rlc_fix") == 0){
			$('#resultRLCf[lang="de"],#resultRLCf[lang="en"],#resultRLCv[lang="de"],#resultRLCv[lang="en"]').hide()
			$('#resultRLCf[lang="'+ activeLang +'"]').show();
			$('#rlc_fix[lang="'+ activeLang +'"]').addClass("active");
			$('#rlc_var[lang="'+ activeLang +'"]').removeClass("active");
		}
		else if(clicked.localeCompare("rlc_var") == 0){
			$('#resultRLCf[lang="de"],#resultRLCf[lang="en"],#resultRLCv[lang="de"],#resultRLCv[lang="en"]').hide()
			$('#resultRLCv[lang="'+ activeLang +'"]').show();
			$('#rlc_var[lang="'+ activeLang +'"]').addClass("active");
			$('#rlc_fix[lang="'+ activeLang +'"]').removeClass("active");
		}
		else if(clicked.localeCompare("run") == 0){
			$('#resultRLCf[lang="de"],#resultRLCf[lang="en"],#resultRLCv[lang="de"],#resultRLCv[lang="en"]').hide()
			$('#resultNotComp[lang="de"],#resultNotComp[lang="en"]').hide();
			
			$('#resultNotComp[lang="'+ activeLang +'"]').show();
			$('#resultRLCf[lang="'+ activeLang +'"]').show();			
			$('#rlc_fix[lang="'+ activeLang +'"]').addClass("active");
			$('#rlc_var[lang="'+ activeLang +'"]').removeClass("active");
			
			myAppInstance.proceed();
		}
		else if (clicked.localeCompare("en") == 0) {
			$('[lang="en"]').show();
			$('[lang="de"]').hide();
			
			//switch to fixed rlc tab
			$('#rlc_fix[lang="en"]').addClass("active");
			$('#rlc_var[lang="en"]').removeClass("active");
			$('#resultRLCv[lang="en"]').hide();
			
			$('button[name="en"]').prop("disabled", true);
			$('button[name="de"]').prop("disabled", false);
		}
		else if (clicked.localeCompare("de") == 0) {
			$('[lang="de"]').show();
			$('[lang="en"]').hide();
			
			//switch to fixed rlc tab
			$('#rlc_fix[lang="de"]').addClass("active");
			$('#rlc_var[lang="de"]').removeClass("active");
			$('#resultRLCv[lang="de"]').hide();
			
			$('button[name="de"]').prop("disabled", true);
			$('button[name="en"]').prop("disabled", false);
		}
	});
	
	$('#examplesSelect').on('change', function(){
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