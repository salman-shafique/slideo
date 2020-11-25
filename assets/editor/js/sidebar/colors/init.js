import updateThemeColors from "./updateThemeColors";
import toHex from "./toHex";

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
    var currColor = $("#changeColor").val();
    $("#Colors_Panel").find(".main-section").find(".color.active").attr("data-color", currColor);
    $("#Colors_Panel").find(".main-section").find(".color.active").css("background-color", currColor);
});

$("#colorPickerContainer").delegate("#CPClose", "mouseup", function () {
    let colorCircle = document.querySelector("#Colors_Panel .main-section .color.active");
    let color = colorCircle.getAttribute("data-color");
    let colorName = colorCircle.getAttribute("color-name");
    updateThemeColors();
    console.log(color, colorName);
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

$("#Color_Templates_List").delegate(".color_template_dropdown_item", "click", function () {
    $("#Color_Templates_List").find(".color_template_dropdown_item.active").removeClass("active");
    $(this).addClass("active");
    $("#SelectedColorTemplate_Name").html($(this).find(".template-header").text());
    $("#Colors_Panel").find(".main-section").find(".template-text-container").find("h6").html($(this).find(".template-header").text());
    $("#Colors_Panel").find(".main-section").find(".template-text-container").find("p").html($(this).find(".template-desc").text());
    var parentColorsContainer = $("#Colors_Panel").find(".main-section").find(".colors-container");

    $.each($(this).find(".colors-container").find(".template-icon-color"), function (index, value) {
        let themeColorName = value.getAttribute("color-name-icon");
        $(document).find(".color[color-name='" + themeColorName + "']").css("background-color", $(value).attr("data-color"));
        $(document).find(".color[color-name='" + themeColorName + "']").attr("data-color", $(value).attr("data-color"));
    });
    parentColorsContainer.find(".color").removeClass("active");
    $("#Color_Templates_List").addClass("d-none").removeClass("d-block");
    $("#Colors_Panel").find(".backdrop-overlay-layout").addClass("collapse");
    $('#changeColor').spectrum("destroy");
    $('#changeColor').css("display", "none");

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
