import React from "react";
import ColorInput from "./ColorInput";
import ColorCircle from "./ColorCircle";
import session from "Editor/js/session";


export default function ColorList() {

    const setThemeColorNameOfShape = (g, newThemeColorName) => {

    }

    const getThemeColorNameOfShape = (g) => {

    }

    const mounted = React.useRef();
    React.useEffect(() => {
        if (!mounted.current) {
            window.addEventListener("shape.selected", (event) => {

                const g = event.data.shape;
                console.log(session.SELECTED_ELEMENTS.length, "on color list");
                if (session.SELECTED_ELEMENTS.length == 1)
                    console.log("change");

            });
            mounted.current = true;
        }
    });

    const circles = [];
    [
        "ACCENT_1",
        "ACCENT_2",
        "ACCENT_3",
        "ACCENT_4",
        "ACCENT_5",
        "ACCENT_6",
        "BACKGROUND_1",
        "BACKGROUND_2",
        "TEXT_1",
        "TEXT_2",
    ].forEach(colorName => {
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