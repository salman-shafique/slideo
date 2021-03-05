import React from "react";
import ReactDOM from "react-dom";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import "Editor/css/contextMenu.css";
import slide from "Editor/js/entity/slide";
import shape from "Editor/js/entity/shape";

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



  	
        const g = session.SELECTED_ELEMENTS[0].shape;	
        const slideId = session.CURRENT_SLIDE;	
        const shape_id = g.getAttribute("shape_id");	
        const data = shape(slideId, shape_id);	
        console.log('slideid, shapeid, data', slideId, shape_id, data);	
        console.log('shape', session.SELECTED_ELEMENTS[0].shape)	
        console.log('selected element', session.SELECTED_ELEMENTS[0])	
        console.log('element shape index node val', session.SELECTED_ELEMENTS[0].shape.attributes.shape_index.nodeValue);	
        console.log('element shape index', session.SELECTED_ELEMENTS[0].shape.attributes.shape_index);	
        console.log('element shape attr', session.SELECTED_ELEMENTS[0].shape.attributes);	
        console.log('element shape getattr', session.SELECTED_ELEMENTS[0].shape.getAttribute('shape_index'));	
        const shapesOfSlide = slide(session.CURRENT_SLIDE).slideData().shapes	
        console.log('shapes of slide', shapesOfSlide);	
        // session.SELECTED_ELEMENTS[0].shape.attributes.shape_index.nodeValue = 1000;	
        // console.log('new shape node val', session.SELECTED_ELEMENTS[0].shape.attributes.shape_index.nodeValue)	
        	
        const elementTree = slide(session.CURRENT_SLIDE).page();	
        console.log('element tree', elementTree);	
        // session.SELECTED_ELEMENTS[0].shape.style.zIndex = 1000;	



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
        const child = session.SELECTED_ELEMENTS[0].shape;	
        console.log('child', child)	
        const parent = child.parentNode;	
        const childIndex = Array.prototype.indexOf.call(parent.children, child);	
        const children = parent.children; 	
        console.log('put out')
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

                if (childIndex > 1){	
                    // child.attributes.shape_index.nodeValue = childIndex - 2;


                    console.log('added slide zindex')
                    // parent.insertBefore(children[childIndex], children[childIndex - 1]);
                    
                    console.log('child shape index', child.shape_index)	
                    console.log('new node val', child.attributes.shape_index.nodeValue);	
                    slide(session.CURRENT_SLIDE, session.SELECTED_ELEMENTS[0]);
                    // slide(session.CURRENT_SLIDE, session.SELECTED_ELEMENTS[0]).initSlide().updateZIndex(session.SELECTED_ELEMENTS[0]);
                }
                break;
            case "SEND_TO_BACK":
                console.log("Send to Back clicked.");

                parent.insertBefore(children[childIndex], children[1]);

                break;
            case "BRING_FORWARD":
                console.log("Bring Forward clicked.");

                parent.insertBefore(children[childIndex], children[childIndex + 1]);

                console.log('bring forward children[childIndex +1]', children[childIndex + 1])

                break;
            case "BRING_TO_FRONT":
                console.log("Bring to Front clicked.");	

                parent.insertBefore(children[childIndex], children[children.length - 1].nextSibling);	

                console.log('inserting after laset')
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
