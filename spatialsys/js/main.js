$(function() {
	
	canvas = document.getElementById("drawfield");
    ctx = canvas.getContext("2d");	
	
	canvas.height = $("#drawfield").height();
	canvas.width = $("#drawfield").width();	
	
	em();
	
	$("button").click(function(){
		$("#info > div > button").show();
		var clicked = $(this).attr("name");
		
		if(clicked.localeCompare("em") == 0){
			em();
			$("#em").hide();
		}
		
		if(clicked.localeCompare("cbm") == 0){
			cbm();
			$("#cbm").hide();
		}

		if(clicked.localeCompare("ekm") == 0){
			ekm();
			$("#ekm").hide();
		}		
	});
});

function resetCanvas(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//P1(70,250) //P2(350,50)
	ctx.fillStyle="#000";
	ctx.beginPath();	
	ctx.arc(10, 250, 5, 0, Math.PI*2, true);
	ctx.fillText("P1",5,265);
	ctx.closePath();
	ctx.fill();		
	ctx.beginPath();	
	ctx.arc(290, 50, 5, 0, Math.PI*2, true);
	ctx.fillText("P2",290-20,50+4);	
	ctx.closePath();
	ctx.fill();		
}

function em(){
	resetCanvas();
	ctx.strokeStyle = "red";
	ctx.beginPath();
	ctx.moveTo(10,250);
	ctx.lineTo(290,50);
	ctx.closePath();
	ctx.stroke();		
}

function cbm(){
	resetCanvas();
	ctx.strokeStyle = "red";
	ctx.beginPath();
	ctx.moveTo(10,250);
	ctx.lineTo(10,50); ctx.moveTo(10,50);
	ctx.lineTo(290,50); 
	ctx.closePath();
	ctx.stroke();	
	
	ctx.strokeStyle = "green";
	ctx.beginPath();
	ctx.moveTo(10,250);
	ctx.lineTo(30,250); ctx.moveTo(30,250);
	ctx.lineTo(30,230); ctx.moveTo(30,230);
	ctx.lineTo(50,230); ctx.moveTo(50,230);
	ctx.lineTo(50,210); ctx.moveTo(50,210);
	ctx.lineTo(70,210); ctx.moveTo(70,210);
	ctx.lineTo(70,190); ctx.moveTo(70,190);
	ctx.lineTo(90,190); ctx.moveTo(90,190);
	ctx.lineTo(90,170); ctx.moveTo(90,170);
	ctx.lineTo(110,170); ctx.moveTo(110,170);
	ctx.lineTo(110,150); ctx.moveTo(110,150);
	ctx.lineTo(190,150); ctx.moveTo(190,150);
	ctx.lineTo(190,100); ctx.moveTo(190,100);
	ctx.lineTo(240,100); ctx.moveTo(240,100);
	ctx.lineTo(240,80); ctx.moveTo(240,80);
	ctx.lineTo(290,80); ctx.moveTo(290,80);
	ctx.lineTo(290,50);
	ctx.closePath();
	ctx.stroke();		
	
	ctx.strokeStyle = "blue";
	ctx.beginPath();
	ctx.moveTo(10,251);
	ctx.lineTo(240,251); ctx.moveTo(240,251);
	ctx.lineTo(240,150); ctx.moveTo(240,150);
	ctx.lineTo(240,150); ctx.moveTo(240,150);
	ctx.lineTo(291,150); ctx.moveTo(291,150);
	ctx.lineTo(291,50);
	ctx.closePath();
	ctx.stroke();			
}

function ekm(){
	resetCanvas();
	ctx.strokeStyle = "red";
	ctx.beginPath();
	ctx.moveTo(10,250);
	ctx.lineTo(30,250); ctx.moveTo(30,250);
	ctx.lineTo(30,230); ctx.moveTo(30,230);
	ctx.lineTo(50,230); ctx.moveTo(50,230);
	ctx.lineTo(50,210); ctx.moveTo(50,210);
	ctx.lineTo(70,210); ctx.moveTo(70,210);
	ctx.lineTo(70,190); ctx.moveTo(70,190);
	ctx.lineTo(90,190); ctx.moveTo(90,190);
	ctx.lineTo(90,170); ctx.moveTo(90,170);
	ctx.lineTo(240,100); ctx.moveTo(240,100);
	ctx.lineTo(240,80); ctx.moveTo(240,80);
	ctx.lineTo(290,80); ctx.moveTo(290,80);
	ctx.lineTo(290,50);
	ctx.closePath();
	ctx.stroke();			
}