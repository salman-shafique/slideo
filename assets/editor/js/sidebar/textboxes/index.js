import React from "react";
import ReactDOM from "react-dom";
import TextboxPanel from "./TextboxPanel";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import Events from "Editor/js/Events";

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

//Events.listen("shape.selected", textboxSelected);
//Events.listen("shape.allReleased", textboxSelected);

