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
			$('#indicator').css("background-color", "#D0FA58");
		} else {
			clearInterval(timeoutInstance);
			timeoutInstance = null;
			$('#indicator').css("background-color", "#FA5858");
		}
		
		if(force === true) resetInterval();
	}

	$("#fpsswitcher").on('input',function() {
		$("#fps").html(parseInt($("#fpsswitcher").val()));
		resetInterval(true);
	});
	
	$("#drawfield").click(function(e){
		var x = e.pageX - this.offsetLeft;
		var y = e.pageY - this.offsetTop;
		
		switch(myAppInstance.getValue(x,y)) {
			case 0:
				myAppInstance.createAnt(x,y);
				break;
			case 1:
				myAppInstance.setValue(x,y,0);
				break;
			case 2:
				myAppInstance.killAnt(x,y);
				break;
		} 		
		
		myAppInstance.refresh();
	});
	
	$("button").click(function(){
		var clicked = $(this).attr("name");
		
		if(clicked.localeCompare("resetRaster") == 0){
			myAppInstance.ants = [];
			myAppInstance.resetRaster();
			myAppInstance.refresh();
		}
		
		if(clicked.localeCompare("run") == 0){
			if(timeoutInstance !== null) resetInterval(); // stops
			myAppInstance.proceedGrid();
			myAppInstance.refresh();
		}

		if(clicked.localeCompare("runAuto") == 0){
			resetInterval();
		}
	});
});