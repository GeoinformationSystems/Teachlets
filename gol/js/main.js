$(function() {
	// resize canvas to fill parent (keep square)
	var canvas = $("#drawfield");
	var minSize = Math.min(canvas.parent().width(), canvas.parent().height());
	canvas[0].width=minSize;
	canvas[0].height=minSize;
	
	var myAppInstance = new APP(20,0,"#drawfield","#steps-count"); //size defaultvalue uniqueid rows = colums
	value = false;
	block = false;
	timeoutInstance = null;
	
	function resetInterval(force){
		
		var timout = parseInt(1000 / parseInt($("#fpsswitcher").val()));
		
		if(timeoutInstance === null){
			timeoutInstance = setInterval(function(){
				myAppInstance.proceedGrid();
			}, timout);
		} else {
			clearInterval(timeoutInstance);
			timeoutInstance = null;
		}
		
		if(force === true) resetInterval();
	}

	$("#fpsswitcher").on('input',function() {
		$(".input-caption[lang='de']").find("span").html(parseInt($("#fpsswitcher").val()));
		$(".input-caption[lang='en']").find("span").html(parseInt($("#fpsswitcher").val()));
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

	// default lang is German => hide all English elements
	$('[lang="en"]').hide();
	$('button[name="de"]').prop("disabled", true);

	// add click handler to all elements of type button	
	$("button").click(function () {
		// get name of button
		var clicked = $(this).attr("name");

		// determine which button is clicked based on "name" attribute
		if(clicked.localeCompare("resetRaster") == 0){
			myAppInstance.resetAll();
		}
		if(clicked.localeCompare("run") == 0){
			myAppInstance.proceedGrid();
		}
		if(clicked.localeCompare("runAuto") == 0){
			resetInterval();
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
});