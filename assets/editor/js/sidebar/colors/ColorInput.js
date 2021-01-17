import React from "react";
import "Editor/js/dependencies/spectrum-colorpicker2.min";
import reactToDOM from "Editor/js/utils/reactToDOM";
import colorTemplate from "Editor/js/entity/colorTemplate";
import session from "Editor/js/session";



export default function ColorInput() {

    const mounted = React.useRef();
    React.useEffect(() => {
        if (!mounted.current) {
            const updateColorTemplate = () => {
                const activeCircle = document.querySelector("#Colors_Panel .main-section .color.active");

                const newColor = $("#changeColor").val();
                const colorName = activeCircle.getAttribute("color-name");
                let tmp = {};
                tmp[colorName] = newColor;
                colorTemplate(session.CURRENT_SLIDE).changeColors(tmp);
            }

            // Initialize Color Picker
            $("#changeColor").spectrum({
                type: "flat",
                showPalette: false,
                showInitial: false,
                allowEmpty: false,
                preferredFormat: "hex",
                chooseText: "Done",
                showAlpha: false,
                move: (color) => {
                    let currColor = color.toHexString();
                    $("#Colors_Panel").find(".main-section").find(".color.active").attr("data-color", currColor);
                    $("#Colors_Panel").find(".main-section").find(".color.active").css("background-color", currColor);
                    updateColorTemplate();
                }
            });

            const cancelBtn = document.querySelector(".sp-cancel");
            cancelBtn.remove();

            const doneBtn = document.querySelector(".sp-choose");
            doneBtn.addEventListener("mouseup", () => {
                $("#colorPickerContainer").hide();
            })

            mounted.current = true;
        }
    });


    return (
        <div id="colorPickerContainer" className="medium-top-margin row m-0 justify-content-center" style={{ display: "none" }}>
            <div className="col-10">
                <input id="changeColor" className="collapse" defaultValue="#ffffff" />
            </div>
        </div>
    )
}