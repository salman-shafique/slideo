jQuery(function () {

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


