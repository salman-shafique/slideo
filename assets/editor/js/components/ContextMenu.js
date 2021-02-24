import React from "react";
import ReactDOM from "react-dom";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import "Editor/css/contextMenu.css";
import slide from "Editor/js/entity/slide";

function ContextMenu() {
    const [isOpen, setIsOpen] = React.useState(false);

    const [contextMenuLeft, setContextMenuLeft] = React.useState(null);
    const [contextMenuTop, setContextMenuTop] = React.useState(null);
    const [clickedElementType, setClickedElementType] = React.useState(null);

    const openContextMenu = (e) => {
        // Do not open contextMenu when there is no element selected
        if (session.SELECTED_ELEMENTS.length === 0) {
            setIsOpen(false);
            return;
        };

        const slideObject = slide(session.CURRENT_SLIDE).object().getBoundingClientRect();
        const clickedEl = session.SELECTED_ELEMENTS[0].shape.getBoundingClientRect();
        setContextMenuLeft(slideObject.left + clickedEl.left + clickedEl.width);
        setContextMenuTop(slideObject.top + clickedEl.top);

        if (session.SELECTED_ELEMENTS.length == 1) {
            // One element selected
            setClickedElementType(getShapeType(session.SELECTED_ELEMENTS[0].shape));
        } else if (session.SELECTED_ELEMENTS.length > 1) {
            let pureType = null;
            session.SELECTED_ELEMENTS.forEach(selectEl => {
                if (pureType === null)
                    pureType = getShapeType(selectEl.shape);

                if (pureType != getShapeType(selectEl.shape))
                    pureType = "MULTIPLE";
            });
            setClickedElementType(pureType);
        }

        setIsOpen(true);
    }

    const closeContextMenu = () => {
        setIsOpen(false);
    }

    const contextMenuAction = (type) => {
        switch (type) {
            case "EDIT_TEXT":
                console.log("Edit text clicked.");
                break;
            case "DUPLICATE":
                console.log("Duplicate clicked.");
                break;
            case "SHOW_FULL_IMAGE":
                console.log("Show Full Image clicked.");
                break;
            case "CHANGE_COLOR":
                console.log("Change Color clicked.");
                break;
            case "DELETE":
                console.log("Delete clicked.");
                break;
            case "SEND_BACKWARD":
                console.log("Send Backward clicked.");
                break;
            case "SEND_TO_BACK":
                console.log("Send to Back clicked.");
                break;
            case "BRING_FORWARD":
                console.log("Bring Forward clicked.");
                break;
            case "BRING_TO_FRONT":
                console.log("Bring to Front clicked.");
                break;
            default:
                return null;
        }
    }

    React.useEffect(() => {
        // Close the contextMenu Events
        window.addEventListener("shape.allReleased", closeContextMenu);
        window.addEventListener("shape.allReleasedExcept", closeContextMenu);
        window.addEventListener("shape.drag.started", closeContextMenu);
        window.addEventListener("shape.resize.started", closeContextMenu);
        window.addEventListener("shape.selected", closeContextMenu);
        window.addEventListener("contextMenu.open", openContextMenu);
    }, []);

    return (
        <div
            id="contextMenu"
            style={{
                display: isOpen ? "" : "none",
                left: contextMenuLeft,
                top: contextMenuTop,
            }}
        >


            {
                (clickedElementType === constants.SHAPE_TYPES.TEXTBOX && session.SELECTED_ELEMENTS.length == 1)
                    ? <div
                        className="contextMenu-line-wrapper"
                        onClick={() => { contextMenuAction("EDIT_TEXT") }}
                    >
                        <div className="contextMenu-icon-wrapper">
                            <i className="fas fa-pencil-alt" />
                        </div>
                        <div className="contextMenu-text-wrapper">
                            Edit Text
                    </div>
                    </div>
                    : null
            }
            {
                clickedElementType === constants.SHAPE_TYPES.IMAGE &&
                <div
                    className="contextMenu-line-wrapper"
                    onClick={() => { contextMenuAction("SHOW_FULL_IMAGE") }}
                >
                    <div className="contextMenu-icon-wrapper">
                        <i className="far fa-image" />
                    </div>
                    <div className="contextMenu-text-wrapper">
                        Show Full Image
                    </div>
                </div>
            }
            {
                ([constants.SHAPE_TYPES.TEXTBOX, constants.SHAPE_TYPES.ICON, constants.SHAPE_TYPES.AUTO_SHAPE].includes(clickedElementType))
                    ? <div
                        className="contextMenu-line-wrapper"
                        onClick={() => { contextMenuAction("CHANGE_COLOR") }}>
                        <div className="contextMenu-icon-wrapper">
                            <i className="fas fa-palette" />
                        </div>
                        <div className="contextMenu-text-wrapper">
                            Change Color
                        </div>
                    </div>
                    : null
            }
            <div
                className="contextMenu-line-wrapper"
                onClick={() => { contextMenuAction("DUPLICATE") }}
            >
                <div className="contextMenu-icon-wrapper">
                    <i className="far fa-clone" />
                </div>
                <div className="contextMenu-text-wrapper">
                    Duplicate
                </div>
            </div>
            <div
                className="contextMenu-line-wrapper"
                onClick={() => { contextMenuAction("DELETE") }}
            >
                <div className="contextMenu-icon-wrapper">
                    <i className="far fa-trash-alt" />
                </div>
                <div className="contextMenu-text-wrapper">
                    Delete
                </div>
            </div>
            <div className="contextMenu-divider"></div>
            <div
                className="contextMenu-line-wrapper"
                onClick={() => { contextMenuAction("SEND_BACKWARD") }}
            >
                <div className="contextMenu-icon-wrapper">
                    <i className="fas fa-angle-left" />
                </div>
                <div className="contextMenu-text-wrapper">
                    Send Backward
                </div>
            </div>
            <div
                className="contextMenu-line-wrapper"
                onClick={() => { contextMenuAction("SEND_TO_BACK") }}
            >
                <div className="contextMenu-icon-wrapper">
                    <i className="fas fa-angle-double-left" />
                </div>
                <div className="contextMenu-text-wrapper">
                    Send to Back
                </div>
            </div>
            <div
                className="contextMenu-line-wrapper"
                onClick={() => { contextMenuAction("BRING_FORWARD") }}
            >
                <div className="contextMenu-icon-wrapper">
                    <i className="fas fa-angle-right" />
                </div>
                <div className="contextMenu-text-wrapper">
                    Bring Forward
                </div>
            </div>
            <div
                className="contextMenu-line-wrapper"
                onClick={() => { contextMenuAction("BRING_TO_FRONT") }}
            >
                <div className="contextMenu-icon-wrapper">
                    <i className="fas fa-angle-double-right" />
                </div>
                <div className="contextMenu-text-wrapper">
                    Bring to Front
                </div>
            </div>
        </div>
    )
}

ReactDOM.render(<ContextMenu />, document.getElementById("contextMenuWrapper"));
