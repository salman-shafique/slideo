import React from "react";
import "Editor/js/dependencies/spectrum-colorpicker2.min";
import { getThemeColor, changeThemeColorOfShapes } from "./utils";

export default function ColorCircle({ colorName }) {

    const selectColor = (e) => {
        $(".colors-container>.active.color").removeClass("active");
        e.target.classList.add("active");

        const themeColor = getThemeColor(colorName);
        $("#changeColor").val(themeColor);
        $("#changeColor").spectrum("set", themeColor);
        $("#colorPickerContainer").show();

        // Change color logic
        changeThemeColorOfShapes(colorName)
    }

    return (
        <div onClick={selectColor} className={"color"} color-name={colorName}></div>
    )
}