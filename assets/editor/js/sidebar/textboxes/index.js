import React from "react";
import ReactDOM from "react-dom";
import TextboxPanel from "./TextboxPanel";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";

ReactDOM.render(
    <TextboxPanel />,
    document.getElementById("Text_Panel")
);


const textboxSelected = () => {
    let anyTextboxSelected = false;
    session.SELECTED_ELEMENTS.forEach(selectedEl => {
        if (getShapeType(selectedEl.shape) == constants.SHAPE_TYPES.TEXTBOX)
            anyTextboxSelected = true;
    });
    const sideBarTextOptions = document.getElementById("sideBarTextOptions");
    const sideBarTextEmpty = document.getElementById("sideBarTextEmpty");
    if (anyTextboxSelected) { 
        sideBarTextEmpty.style.display = "none";
        sideBarTextOptions.style.display = "";
    } else {
        sideBarTextEmpty.style.display = "";
        sideBarTextOptions.style.display = "none";
    }
    document.querySelector("#Text_Panel .control-close-button").click()
}

window.addEventListener("shape.selected", textboxSelected);
window.addEventListener("shape.allReleased", textboxSelected);

