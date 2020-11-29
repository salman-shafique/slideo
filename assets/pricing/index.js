import "./faq.css";
import "./pricing.css";


$(document).ready(function() {
	$('[data-toggle="tooltip"]').tooltip();
	$("#PlanDurationToggle").find(".toggle-sub-container").click(function() {
		var currInactiveOption = $(this).find(".toggle-option:not(.active)");
		var currActiveOption = $(this).find(".toggle-option.active");
		var pricingParentContainer = $("#Pricing_Plans");
		var planType = currInactiveOption.attr("id").replace("Opt_", "").toLowerCase();
		pricingParentContainer.find(".amount").addClass("collapse");
		pricingParentContainer.find(".original-price").addClass("collapse");
		pricingParentContainer.find(".price-summary").addClass("collapse");
		pricingParentContainer.find(".amount.amt-" + planType).removeClass("collapse");
		pricingParentContainer.find(".price-summary." + planType + "-summary").removeClass("collapse");
		pricingParentContainer.find(".original-price." + planType).removeClass("collapse");
		currActiveOption.removeClass("active");
		currInactiveOption.addClass("active");
	});

	$(".resp-plan").delegate(".plan-toggle", "click", function() {
		if($(this).hasClass("active")) {
			$(this).closest(".resp-plan").find(".plan-details").addClass("collapse");
			$(this).closest(".resp-plan").addClass("collapsed");
			$(this).removeClass("active");
		}

		else {
			$(this).closest(".resp-plan").find(".plan-details").removeClass("collapse");
			$(this).closest(".resp-plan").removeClass("collapsed");
			$(this).addClass("active");
		}
	});
});
