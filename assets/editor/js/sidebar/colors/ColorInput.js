import React from "react";
import "Editor/js/dependencies/spectrum-colorpicker2.min";
import colorTemplate from "Editor/js/entity/colorTemplate";
import session from "Editor/js/session";

import {updateColorTemplate} from "./utils";

export default function ColorInput() {

    const mounted = React.useRef();
    React.useEffect(() => {
        if (!mounted.current) {
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
                    updateColorTemplate(currColor);
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