import React from "react";
import ReactDOM from "react-dom";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";


function ContextMenu() {
    const [isOpen, setIsOpen] = React.useState(false);
    
    const openContextMenu = (e) => {
        // Main logic is here

        // Do not open contextMenu when there is no element selected
        if (session.SELECTED_ELEMENTS.length === 0) {
            setIsOpen(false);
            return;
        };

        session.SELECTED_ELEMENTS.forEach(selectEl => {
            if (getShapeType(selectEl.shape) == constants.SHAPE_TYPES.TEXTBOX)
                console.log("there is a TEXTBOX selected");
            if (getShapeType(selectEl.shape) == constants.SHAPE_TYPES.IMAGE)
                console.log("there is a IMAGE selected");
            if (getShapeType(selectEl.shape) == constants.SHAPE_TYPES.ICON)
                console.log("there is a ICON selected");
            if (getShapeType(selectEl.shape) == constants.SHAPE_TYPES.AUTO_SHAPE)
                console.log("there is a.AUTO_SHAPE selected");
        });
        setIsOpen(true);
    }

    const closeContextMenu = () => {
        setIsOpen(false);
    }

    React.useEffect(() => {
        // Close the contextMenu Events
        window.addEventListener("shape.allReleased", closeContextMenu);
        window.addEventListener("shape.allReleasedExcept", closeContextMenu);
        window.addEventListener("shape.drag.started", closeContextMenu);
        window.addEventListener("shape.resize.started", closeContextMenu);

        window.addEventListener("contextMenu.open", openContextMenu);
    }, []);



    return (
        <div id="contextMenu" style={{ display: isOpen ? "" : "none" }}>
            Hey context menu
        </div>
    )
}

ReactDOM.render(<ContextMenu />, document.getElementById("contextMenuWrapper"));
