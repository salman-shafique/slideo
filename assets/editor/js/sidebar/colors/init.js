import toHex from "./toHex";
import select from "Editor/js/utils/selector/select";
import colorTemplate from "Editor/js/entity/colorTemplate";
import session from "Editor/js/session";

$("#Colors_Panel").find(".main-section").find(".color").click(function () {
    $("#changeColor").val($(this).attr("data-color"));
    // Initialize Color Picker
    $('#changeColor').spectrum({
        type: "flat",
        showPalette: "false",
        showInitial: "true",
        preferredFormat: "hex",
        chooseText: "Done",
        showAlpha: false
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


const updateColorTemplate = () => {
    const activeCircle = document.querySelector("#Colors_Panel .main-section .color.active");

    const newColor = $("#changeColor").val();
    activeCircle.setAttribute("data-color", newColor);
    activeCircle.style.backgroundColor = newColor;

    const colorName = activeCircle.getAttribute("color-name");
    let tmp = {};
    tmp[colorName] = newColor;
    colorTemplate(session.CURRENT_SLIDE).changeColors(tmp);
}

$("#changeColor").on('move.spectrum', function (e, color) {
    // Continiouse color change
    updateColorTemplate();
});


$("#colorPickerContainer").delegate("#CPClose", "mouseup", function () {
    updateColorTemplate();
    $('#changeColor').spectrum("destroy");
    $('#changeColor').css("display", "none");
});

