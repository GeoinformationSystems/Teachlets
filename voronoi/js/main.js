$(function () {
	
	
	var canvas = $("#voronoiCanvas");
	
	Voronoi.init();	
	Voronoi.setCanvasSize(canvas.parent().width(),canvas.parent().height());
	Voronoi.clearSites();
	Voronoi.generateSites(100);

	// default lang is German => hide all English elements
	$('[lang="en"]').hide();
	$('button[name="de"]').prop("disabled", true);


	$("#fpsswitcher").on('input', function() {
		$(".input-caption[lang='de']").find("span").html(parseInt($("#fpsswitcher").val()));
		$(".input-caption[lang='en']").find("span").html(parseInt($("#fpsswitcher").val()));
		Voronoi.clearSites();
		Voronoi.generateSites(parseInt($("#fpsswitcher").val()));
	});


	// add click handler to all elements of type button
	$("button").click(function () {
		// get name of button
		var clicked = $(this).attr("name");

		if (clicked.localeCompare("resetClear") == 0) {
			Voronoi.clearSites();
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
