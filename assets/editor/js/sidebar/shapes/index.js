import React from "react";
import ReactDOM from "react-dom";
import ShapePanel from "./ShapePanel";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import sidebar from "Editor/js/entity/sidebar";
import Events from "Editor/js/Events";

ReactDOM.render(
    <ShapePanel />,
    document.getElementById("Shapes_Panel")
);


const shapeSelected = () => {
    let anyShapeSelected = false;
    session.SELECTED_ELEMENTS.forEach(selectedEl => {
        if (getShapeType(selectedEl.shape) == constants.SHAPE_TYPES.AUTO_SHAPE)
            anyShapeSelected = true;
    });
    const sideBarShapeOptions = document.getElementById("sideBarShapeOptions");
    const sideBarShapeEmpty = document.getElementById("sideBarShapeEmpty");
    if (anyShapeSelected) {
        sideBarShapeEmpty.style.display = "none";
        sideBarShapeOptions.style.display = "";
    } else {
        sideBarShapeEmpty.style.display = "";
        sideBarShapeOptions.style.display = "none";
    }
    document.querySelector("#Shapes_Panel .control-close-button").click()
}




Events.listen("shape.selected", shapeSelected);
Events.listen("shape.allReleased", shapeSelected);

