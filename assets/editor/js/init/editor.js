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

	// EVENT HANDLERS FOR Colors
	$("#Colors_Panel").find(".main-section").find(".color").click(function () {
		$("#changeColor").val($(this).attr("data-color"));
		// Initialize Color Picker
		$('#changeColor').spectrum({
			type: "flat",
			showPalette: "false",
			showInitial: "true",
			preferredFormat: "hex",
			chooseText: "Done"
		});

		$("#colorPickerContainer").find(".sp-container").removeClass("sp-clear-enabled");
		$("#colorPickerContainer").find(".sp-cancel").remove();
		$("#colorPickerContainer").find(".sp-choose").remove();
		$("#colorPickerContainer").find(".sp-container").append(
			'<button id="CPClose" class="btn btn-primary btn-sm default-button text-light">Done</button>'
		);
	});

	$(".color").click(function () {
		$(this).closest(".colors-container").find(".active.color").removeClass("active");
		$(this).addClass("active");
	});

	$("#changeColor").on('move.spectrum', function (e, color) {
		var currColor = toHex($("#changeColor").val());
		$("#Colors_Panel").find(".main-section").find(".color.active").attr("data-color", currColor);
		$("#Colors_Panel").find(".main-section").find(".color.active").css("background-color", currColor);
	});

	$("#colorPickerContainer").delegate("#CPClose", "mouseup", function () {
		$('#changeColor').spectrum("destroy");
		$('#changeColor').css("display", "none");
	});

	$("#ColorTemplateSelector").click(function () {
		if ($("#Color_Templates_List").hasClass("d-none")) {
			$("#Color_Templates_List").addClass("d-block").removeClass("d-none");
			$("#Colors_Panel").find(".backdrop-overlay-layout").removeClass("collapse");
		}

		else {
			$("#Color_Templates_List").addClass("d-none").removeClass("d-block");
			$("#Colors_Panel").find(".backdrop-overlay-layout").addClass("collapse");
		}
	});

	// Common Event Handler for all close functions triggered by clicking outside some container
	$(document).mouseup(function (e) {
		if ($("#Color_Templates_List").hasClass("d-block")) {
			var colorSelectorContainers = [$("#ColorTemplateSelector"), $("#Color_Templates_List")];
			var colorSelectorClose = true;
			// outside click for Color Template Selector Dropdown
			colorSelectorClose = detectClickOutside(colorSelectorContainers, colorSelectorClose, e.target);
			if (colorSelectorClose) {
				$("#Color_Templates_List").addClass("d-none").removeClass("d-block");
				$("#Colors_Panel").find(".backdrop-overlay-layout").addClass("collapse");
			}
		}

		if ($(".options-dropdown").hasClass("d-block")) {
			var optionsDropdownContainers = [$(".options-dropdown"), $(".slide-options-menu")];
			var optionsDropdownClose = true;
			// outside click for options Dropdown
			optionsDropdownClose = detectClickOutside(optionsDropdownContainers, optionsDropdownClose, e.target);
			if (optionsDropdownClose) {
				$(".options-dropdown").addClass("d-none").removeClass("d-block");
				$(".options-dropdown").closest(".action-panel").find(".backdrop-overlay-layout").addClass("collapse");
			}
		}

		if ($("#UserMenuDropdown").hasClass("d-block")) {
			var userDropContainers = [$(".linked-user-nav-blocks"), $("#UserMenuDropdown")];
			var userDropClose = true;
			// outside click for user Dropdown
			userDropClose = detectClickOutside(userDropContainers, userDropClose, e.target);
			if (userDropClose) {
				$("#UserMenuDropdown").addClass("d-none").removeClass("d-block");
			}
		}
	});

	$("#Color_Templates_List").delegate(".custom-dropdown-item", "click", function () {
		$("#Color_Templates_List").find(".custom-dropdown-item.active").removeClass("active");
		$(this).addClass("active");
		$("#SelectedColorTemplate_Name").html($(this).find(".template-header").text());
		$("#Colors_Panel").find(".main-section").find(".template-text-container").find("h6").html($(this).find(".template-header").text());
		$("#Colors_Panel").find(".main-section").find(".template-text-container").find("p").html($(this).find(".template-desc").text());
		var parentColorsContainer = $("#Colors_Panel").find(".main-section").find(".colors-container");

		$.each($(this).find(".colors-container").find(".template-icon-color"), function (index, value) {
			let themeColorName = value.getAttribute("color-name-icon");
			console.log(themeColorName,$(value).attr("data-color"));
			parentColorsContainer.find(".color[color-name='"+themeColorName+"']").css("background-color", $(value).attr("data-color"));
			parentColorsContainer.find(".color[color-name='"+themeColorName+"']").attr("data-color", $(value).attr("data-color"));
		});
		parentColorsContainer.find(".color").removeClass("active");
		$("#Color_Templates_List").addClass("d-none").removeClass("d-block");
		$("#Colors_Panel").find(".backdrop-overlay-layout").addClass("collapse");
		$('#changeColor').spectrum("destroy");
		$('#changeColor').css("display", "none");

		console.log("here");
	});

	// Initialize Max char count for trackers
	$.each($(".char-tracker"), function (index, value) {
		$(value).find(".max-char-count").html($(value).closest(".form-group").find(".char-tracked").attr("maxlength"));
	});

	// Track input character count
	$(".char-tracked").on('keyup', function (e) {
		var stringLength = $(this).val().length;
		var maxCharCount = parseInt($(this).closest(".form-group").find(".char-tracker").find(".max-char-count").text());
		$(this).closest(".form-group").find(".char-tracker").find(".curr-char-count").html(stringLength);
		if (stringLength >= maxCharCount) {
			$(this).closest(".form-group").find(".char-tracker").addClass("text-warning").removeClass("text-secondary");
		}
		else {
			$(this).closest(".form-group").find(".char-tracker").removeClass("text-warning").addClass("text-secondary");
		}
	});

	// Reset Color Template Save Form, on close
	$("#Colors_Panel").delegate(".control-close-button", "click", function () {
		$("#Colors_Panel").find(".control-overlay-layout").find("input").val("");
		$("#Colors_Panel").find(".control-overlay-layout").find("textarea").val("");
		$("#Colors_Panel").find(".char-tracker").removeClass("text-warning").addClass("text-secondary");
		$("#Colors_Panel").find(".char-tracker").find(".curr-char-count").html(0);
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

// After a mouseup event is fired anywhere in the document,
// given the target event and its list of permissible containers,
// determine, if the click was outside, all such containers
function detectClickOutside(permittedContainersList, closeFlag, eventTarget) {
	$.each(permittedContainersList, function (index, value) {
		if (!value.is(eventTarget) && value.has(eventTarget).length === 0) {
			closeFlag = (closeFlag & true) == 1 ? true : false;
		}
		else {
			closeFlag = (closeFlag & false) == 1 ? true : false;
		}
	});
	return closeFlag;
}
