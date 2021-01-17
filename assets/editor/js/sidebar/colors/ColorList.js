import React from "react";
import ColorInput from "./ColorInput";
import ColorCircle from "./ColorCircle";
import session from "Editor/js/session";
import { getThemeColorNameOfShape, themeColorNames } from "./utils";


export default function ColorList() {

    const mounted = React.useRef();
    React.useEffect(() => {
        if (!mounted.current) {
            window.addEventListener("shape.selected", (event) => {

                $(".colors-container>.active.color").removeClass("active");
                $("#colorPickerContainer").hide();
                if (session.SELECTED_ELEMENTS.length == 1) {
                    const g = event.data.shape;
                    const themeColorOfShape = getThemeColorNameOfShape(g);
                    if (!themeColorOfShape) return;

                    document.querySelector("div.color[color-name='" + themeColorOfShape.themeColorName + "']").click();
                }

            });
            mounted.current = true;
        }
    });

    const circles = [];
    themeColorNames.forEach(colorName => {
        circles.push(
            <ColorCircle key={colorName} colorName={colorName} />
        )
    });

    return (
        <>
            <h6 className="text-light small-top-margin small-bottom-margin centered-contents single-line">צבעי עיצוב</h6>
            <div className="colors-container main-colors">
                <div className="colors-container main-colors">
                    {circles}
                </div>
            </div>

            <div className="template-text-container"></div>
            <ColorInput />
        </>
    )
}