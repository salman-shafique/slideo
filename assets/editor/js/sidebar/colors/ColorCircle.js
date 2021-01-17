import React from "react";
import session from "Editor/js/session";
import colorTemplate from "Editor/js/entity/colorTemplate";
import "Editor/js/dependencies/spectrum-colorpicker2.min";


export default function ColorCircle({ colorName }) {

    const getThemeColor = () => {
        return colorTemplate(session.CURRENT_SLIDE).getColor(colorName);
    }

    const selectColor = (e) => {
        $(".colors-container>.active.color").removeClass("active");
        e.target.classList.add("active");

        const themeColor = getThemeColor();
        $("#changeColor").val(themeColor);
        $("#changeColor").spectrum("set", themeColor);
        $("#colorPickerContainer").show();

    }

    return (
        <div onClick={selectColor} className={"color"} color-name={colorName}></div>
    )
}