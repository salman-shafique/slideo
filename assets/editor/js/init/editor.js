jQuery(function () {
	updateCustomGalleries();
	// Event Handler that dictates what happens on clicking on a tool, active or otherwise
	var bgUpload = false;

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

});

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

