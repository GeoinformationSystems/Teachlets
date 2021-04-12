$(function () {

	// start configuration on load
	// default lang is German => hide all English elements
	$('[lang="en"]').hide();
	$('button[name="de"]').prop("disabled", true);

	$('button[name="showhelp"]').click(function(){
		var w = window.open("html/helpwindow.html", "popupWindow", "width=600, height=400, scrollbars=yes");
	});
});