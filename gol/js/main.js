$(function() {
	var myAppInstance = new APP(20,0,"#drawfield"); //size defaultvalue uniqueid rows = colums
	value = false;
	block = false;
	timeoutInstance = null;
	
	function resetInterval(force){
		
		var timout = parseInt(1000 / parseInt($("#fpsswitcher").val()));
		
		if(timeoutInstance === null){
			timeoutInstance = setInterval(function(){
				myAppInstance.proceedGrid();
			}, timout);
            $('#autorun_button').html('Auto-Simulation stop');
			// $('#indicator').css("background-color", "#D0FA58");
		} else {
			clearInterval(timeoutInstance);
			timeoutInstance = null;
            $('#autorun_button').html('Auto-Simulation start');
			// $('#indicator').css("background-color", "#FA5858");
		}
		
		if(force === true) resetInterval();
	}

	$("#fpsswitcher").on('input',function() {
		$("#fps").html(parseInt($("#fpsswitcher").val()));
		resetInterval(true);
	});
	
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
			myAppInstance.resetRaster();
			myAppInstance.refresh();
		}
		
		if(clicked.localeCompare("run") == 0){
			if(timeoutInstance !== null) resetInterval(); // stops
			myAppInstance.proceedGrid();
		}

		if(clicked.localeCompare("runAuto") == 0){
			resetInterval();
		}
	});
});