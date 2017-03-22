$(document).ready(function() {
	$("select").material_select();

	$(".switch").on("click", function() { $(".collapsible").trigger("click"); });

	if (window.File && window.FileReader && window.FileList && window.Blob) {
		// Great success! All the File APIs are supported.
		$("#fileinput").change(handleFilesSelected);
		$("#applyBtn").click(applyStyles);
	} else {
	  alert("The File APIs are not fully supported in this browser.");
	}
});

function handleFilesSelected(event) {
	let files = event.target.files;

	if(files.length > 0) {		
		if($("#imageArea").children().length > 0) {
			$("#imageArea").empty();
		}

		for (var i = files.length - 1; i >= 0; i--) {
			loadFile(files[i]);
		}
	}
}

function loadFile(file) {
	let fileReader = new FileReader();
	fileReader.addEventListener("load", onLoaded);
	fileReader.readAsDataURL(file);
}

function onLoaded(event) {
	$("#imageArea").append($("<img>").attr({src: event.target.result}));
}

function applyStyles(event) {
	let resizeCards = $("#shouldResize").is(':checked');
	let cardSize = $("#cardSizes").val();

	let applyBorder = $("#applyBorder").is(':checked');
	let borderColor = applyBorder ? $("#borderColor").val() : "#000000";
	let borderThickness = applyBorder ? $("#borderThickness").val() : 0;

	let addSpacing = $("#addSpacing").is(':checked');
	let rowSpace = addSpacing ? $("#rowSpace").val() : 0;
	let columnSpace = addSpacing ?  $("#columnSpace").val() : 0;

	let newWidth;
	let newHeight;

	if(resizeCards) {
		switch(cardSize) {
			case "poker":
				newWidth = 2.5;
				newHeight = 3.5;
			break;

			case "bridge":
				newWidth = 2.25;
				newHeight = 3.5;
			break;

			case "large":
				newWidth = 3.5;
				newHeight = 5;
			break;

			case "tarot":
				newWidth = 2.75;
				newHeight = 4.75;
			break;

			case "mini":
				newWidth = 1.75;
				newHeight = 2.5;
			break;
		}
	}

	$("#imageArea").children().css({
		"border":  `${borderThickness}px solid ${borderColor}`,
		"margin-right": `${columnSpace}px`,
		"margin-bottom": `${rowSpace}px`,
		"width": resizeCards ? newWidth + "in" : "",
		"height": resizeCards ? newHeight + "in" : ""
	});
}