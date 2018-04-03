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
	ctx.arc(70, 250, 5, 0, Math.PI*2, true);
	ctx.fillText("P1",65,265);
	ctx.closePath();
	ctx.fill();		
	ctx.beginPath();	
	ctx.arc(350, 50, 5, 0, Math.PI*2, true);
	ctx.fillText("P2",350+7,50+4);	
	ctx.closePath();
	ctx.fill();		
}

function em(){
	resetCanvas();
	ctx.strokeStyle = "red";
	ctx.beginPath();
	ctx.moveTo(70,250);
	ctx.lineTo(350,50);
	ctx.closePath();
	ctx.stroke();		
}

function cbm(){
	resetCanvas();
	ctx.strokeStyle = "red";
	ctx.beginPath();
	ctx.moveTo(70,250);
	ctx.lineTo(70,50); ctx.moveTo(70,50);
	ctx.lineTo(350,50); 
	ctx.closePath();
	ctx.stroke();	
	
	ctx.strokeStyle = "green";
	ctx.beginPath();
	ctx.moveTo(70,250);
	ctx.lineTo(90,250); ctx.moveTo(90,250);
	ctx.lineTo(90,230); ctx.moveTo(90,230);
	ctx.lineTo(110,230); ctx.moveTo(110,230);
	ctx.lineTo(110,210); ctx.moveTo(110,210);
	ctx.lineTo(130,210); ctx.moveTo(130,210);
	ctx.lineTo(130,190); ctx.moveTo(130,190);
	ctx.lineTo(150,190); ctx.moveTo(150,190);
	ctx.lineTo(150,170); ctx.moveTo(150,170);
	ctx.lineTo(170,170); ctx.moveTo(170,170);
	ctx.lineTo(170,150); ctx.moveTo(170,150);
	ctx.lineTo(250,150); ctx.moveTo(250,150);
	ctx.lineTo(250,100); ctx.moveTo(250,100);
	ctx.lineTo(300,100); ctx.moveTo(300,100);
	ctx.lineTo(300,80); ctx.moveTo(300,80);
	ctx.lineTo(350,80); ctx.moveTo(350,80);
	ctx.lineTo(350,50);
	ctx.closePath();
	ctx.stroke();		
	
	ctx.strokeStyle = "blue";
	ctx.beginPath();
	ctx.moveTo(70,251);
	ctx.lineTo(300,251); ctx.moveTo(300,251);
	ctx.lineTo(300,150); ctx.moveTo(300,150);
	ctx.lineTo(300,150); ctx.moveTo(300,150);
	ctx.lineTo(351,150); ctx.moveTo(351,150);
	ctx.lineTo(351,50);
	ctx.closePath();
	ctx.stroke();			
}

function ekm(){
	resetCanvas();
	ctx.strokeStyle = "red";
	ctx.beginPath();
	ctx.moveTo(70,250);
	ctx.lineTo(90,250); ctx.moveTo(90,250);
	ctx.lineTo(90,230); ctx.moveTo(90,230);
	ctx.lineTo(110,230); ctx.moveTo(110,230);
	ctx.lineTo(110,210); ctx.moveTo(110,210);
	ctx.lineTo(130,210); ctx.moveTo(130,210);
	ctx.lineTo(130,190); ctx.moveTo(130,190);
	ctx.lineTo(150,190); ctx.moveTo(150,190);
	ctx.lineTo(150,170); ctx.moveTo(150,170);
	ctx.lineTo(300,100); ctx.moveTo(300,100);
	ctx.lineTo(300,80); ctx.moveTo(300,80);
	ctx.lineTo(350,80); ctx.moveTo(350,80);
	ctx.lineTo(350,50);
	ctx.closePath();
	ctx.stroke();			
}