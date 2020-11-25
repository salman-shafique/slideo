import "Editor/js/dependencies/spectrum-colorpicker2.min";
import toHex from "Editor/js/sidebar/colors/toHex";
jQuery(function () {
	updateCustomGalleries();
	// Event Handler that dictates what happens on clicking on a tool, active or otherwise
	var bgUpload = false;
	var colorDrag = false;
	$(".tool").on("click", function () {
		// allow transitions
		$("#ActionsPanel").removeClass("no-transition");
		$("#SlidesPanel").removeClass("no-transition");
		$("#MainPanel").removeClass("no-transition");
		var activeExisted = false;
		var activeToolID = "";
		if ($(".active-tool")[0]) {
			var currActivePanel = $("#" + $(".active-tool").attr("id").replace("Tool", "Panel"));
			currActivePanel.addClass("collapse");
			activeExisted = true;
			activeToolID = $(".active-tool").attr("id");
		}
		var newActivePanel = $("#" + $(this).attr("id").replace("Tool", "Panel"));
		newActivePanel.addClass("collapse");
		if ($(this).hasClass("active-tool")) {
			$("#ActionsPanel").addClass("closed");
			$("#MainPanel").addClass("expanded");
			$(this).removeClass("active-tool");
		}
		else {
			// load Action panel components based on button clicked
			$("#ActionsPanel").removeClass("closed");
			$("#MainPanel").removeClass("expanded");
			$(".active-tool").removeClass("active-tool");
			$(this).addClass("active-tool");
		}

		if (activeExisted) {
			// clicked on the active tool
			if ($(this).attr("id") === activeToolID) { } // do nothing
			else newActivePanel.removeClass("collapse"); // instantly change panel
		}
		else {
			// newly opening panel, open with delay
			setTimeout(function () {
				newActivePanel.removeClass("collapse");
			}, 300);
		}
		setTimeout(function () {
			// block transitions
			$("#ActionsPanel").addClass("no-transition");
			$("#SlidesPanel").addClass("no-transition");
			$("#MainPanel").addClass("no-transition");
		}, 600);

	});

	$(".control-button").click(function () {
		$(this).closest(".action-panel").find(".control-overlay-layout").removeClass("closed");
		$(this).addClass("collapse");
		$(this).closest(".control-section").find(".control-close-button").removeClass("collapse");
		$(this).closest(".action-panel").find(".backdrop-overlay-layout").removeClass("collapse");
	});

	$("body").delegate(".control-close-button", "click", function () {
		$(this).closest(".action-panel").find(".control-overlay-layout").addClass("closed");
		$(this).closest(".action-panel").find(".control-section").find(".control-close-button").addClass("collapse");
		$(this).closest(".action-panel").find(".control-section").find(".control-button").removeClass("collapse");
		$(this).closest(".action-panel").find(".backdrop-overlay-layout").addClass("collapse");
	});

	$("body").delegate(".keyword-dismiss", "click", function () {
		$(this).closest(".search-keyword").remove();
	});

	$(".keyword-search").on('keyup', function (e) {
		if (e.key === 'Enter' || e.keyCode === 13) {
			addKeywordToList($(this).closest(".action-panel").find(".keywords-list"), $(this).val());
			$(this).val("");
		}
	});

	$(".search-click").click(function () {
		addKeywordToList($(this).closest(".action-panel").find(".keywords-list"), $(this).closest(".action-panel").find(".keyword-search").val());
		$(this).closest(".action-panel").find(".keyword-search").val("");
	});

	$("#UploadFirstCustomImage").click(function () {
		$("#CommonImageInput").trigger("click");
		bgUpload = false;
	});

	$("#UploadCustomImage").click(function () {
		$("#CommonImageInput").trigger("click");
		bgUpload = false;
	});

	$("#UploadFirstCustomBG").click(function () {
		$("#CommonImageInput").trigger("click");
		bgUpload = true;
	});

	$("#UploadCustomBG").click(function () {
		$("#CommonImageInput").trigger("click");
		bgUpload = true;
	});

	$("body").delegate("#CommonImageInput", 'change', function () {
		readImageURL(this, $("#CommonImageDump"));
		setTimeout(function () {
			var imageURL = $("#CommonImageDump").attr("src");
			if (imageURL) {
				if (bgUpload)
					addNewCustomImage($("#Background_Panel").find(".custom-image-display").find(".images-gallery"), imageURL);
				else {
					addNewCustomImage($("#Images_Panel").find(".custom-image-display").find(".images-gallery"), imageURL);
				}
			}
		}, 500);

	});

	$(".linked-user-nav-blocks").mouseenter(function () {
		$(".linked-user-nav-blocks").find("i").removeClass("text-light").addClass("text-dark");
	});

	$(".linked-user-nav-blocks").mouseout(function () {
		$(".linked-user-nav-blocks").find("i").removeClass("text-dark").addClass("text-light");
	});

	$(".slide-options-menu").click(function () {
		var parentPanel = $(this).closest(".action-panel");
		parentPanel.find(".options-dropdown").removeClass("d-none").addClass("d-block");
		parentPanel.find(".backdrop-overlay-layout").removeClass("collapse");
	});

	$("body").delegate(".dropdown-closer", "click", function () {
		var parentPanel = $(this).closest(".action-panel");
		parentPanel.find(".options-dropdown").addClass("d-none").removeClass("d-block");
		parentPanel.find(".backdrop-overlay-layout").addClass("collapse");
	});

	$(".linked-user-nav-blocks").click(function () {
		if ($("#UserMenuDropdown").hasClass("d-none"))
			$("#UserMenuDropdown").removeClass("d-none").addClass("d-block");
		else $("#UserMenuDropdown").addClass("d-none").removeClass("d-block");
	});

	$(".image-item").click(function () {
		$(this).closest(".images-gallery").find(".image-item").removeClass("active");
		$(this).addClass("active");
	});

	$("#colorPickerContainer").delegate(".sp-alpha", "mousedown", function () {
		colorDrag = true;
	});

	$("#colorPickerContainer").delegate(".sp-alpha", "mousemove", function () {
		if (colorDrag) {
			var currColor = $("#changeColor").val();
			$("#Colors_Panel").find(".main-section").find(".color.active").attr("data-color", currColor);
			$("#Colors_Panel").find(".main-section").find(".color.active").css("background-color", currColor);
		}
	});

	$("body").delegate("#colorPickerContainer", "mouseup", function () {
		if ($("#colorPickerContainer").find(".sp-thumb-el.sp-thumb-light.sp-thumb-active").length > 0) {
			var currColor = $("#changeColor").val();
			$("#Colors_Panel").find(".main-section").find(".color.active").attr("data-color", currColor);
			$("#Colors_Panel").find(".main-section").find(".color.active").css("background-color", currColor);
			colorDrag = false;
		}
	});
});

function addKeywordToList(listSelector, KeywordText) {
	if (KeywordText && $(listSelector) && $(listSelector).length >= 0) {
		$(listSelector).prepend(
			'<div class="search-keyword">' +
			'<span class="keyword-text text-dark">' + KeywordText + '</span>&emsp;' +
			'<span class="text-dark keyword-dismiss"><i class="fas fa-times"></i></span>' +
			'</div>'
		);
	}
}

function addNewCustomImage(gallerySelector, imageURL) {
	$(gallerySelector).append(
		'<img class="image-item" src="' + imageURL + '">'
	);
	updateCustomGalleries();
}

function updateCustomGalleries() {
	$.each($(".custom-image-display"), function (index, value) {
		if ($(this).hasClass("collapse")) {
			if ($(this).find(".image-item").length > 0) {
				$(this).closest(".action-panel").find(".no-image-display").addClass("collapse");
				$(this).removeClass("collapse");
			}
		}
	});
}

// Function to Read and return the URL of an image browsed from system files
function readImageURL(input, imageDisplay) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			imageDisplay.attr('src', e.target.result);
		}

		reader.readAsDataURL(input.files[0]); // convert to base64 string
	}
}

