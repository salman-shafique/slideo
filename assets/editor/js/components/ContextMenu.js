import React from "react";
import ReactDOM from "react-dom";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import "Editor/css/contextMenu.css";

function ContextMenu() {
    const [isOpen, setIsOpen] = React.useState(false);
    
    const [contextMenuLeft, setContextMenuLeft] = React.useState(null);
    const [contextMenuTop, setContextMenuTop] = React.useState(null);
   

    const openContextMenu = (e) => {
        // Main logic is here
        

        console.log('event', e)
        console.log('e.target ouside selected_', e.target)
        console.log( `
        Screen X/Y: ${e.screenX}, ${e.screenY}
        Client X/Y: ${e.clientX}, ${e.clientY}`);

        const slideWindowLeft = window.parent.document.getElementById('SlideContainer').getBoundingClientRect().left;
        const slideWindowTop = window.parent.document.getElementById('SlideContainer').getBoundingClientRect().top;
        const clickedElLeft = session.SELECTED_ELEMENTS[0].shape.getBoundingClientRect().left;
        const clickedElTop = session.SELECTED_ELEMENTS[0].shape.getBoundingClientRect().top;
        setContextMenuLeft(slideWindowLeft + clickedElLeft);
        setContextMenuTop(slideWindowTop + clickedElTop);

        console.log('session selected elements', session.SELECTED_ELEMENTS[0].shape.getBoundingClientRect())

        // Do not open contextMenu when there is no element selected
        if (session.SELECTED_ELEMENTS.length === 0) {
            setIsOpen(false);
            return;
        };

        session.SELECTED_ELEMENTS.forEach(selectEl => {
            console.log('offset', e.offsetX)
            // console.log('target', selectEl.target.getBoundingClientRect())
            console.log('client', e.clientX)
            console.log('page', e.pageX)
            console.log(e.screenX, e.screenY);
            console.log('selectel', selectEl)
            console.log(selectEl.size.x);
            // setContextMenuLeft(selectEl.size.x);
            // setContextMenuTop(selectEl.size.y);
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


    console.log('containerxy', contextMenuLeft)
    return (
        <>
            <div onMouseMove={() => {console.log('mousedown')}}>

            </div>
            <div 
                id="contextMenu" 
                style={{ 
                    display: isOpen ? "" : "none",
                    left: contextMenuLeft,
                    top: contextMenuTop,

                }}
                onMouseMove={() => {console.log('mousedown')}}
            >
                <div className="contextMenu-line-wrapper">
                    <div className="contextMenu-icon-wrapper">
                        <i className="fas fa-pencil-alt" />
                    </div>
                    <div className="contextMenu-text-wrapper">
                        Edit Text
                    </div>
                </div>
                <div className="contextMenu-line-wrapper">
                    <div className="contextMenu-icon-wrapper">
                        <i className="far fa-clone" />
                    </div>
                    <div className="contextMenu-text-wrapper">
                        Duplicate
                    </div>
                </div>
                <div className="contextMenu-line-wrapper">
                    <div className="contextMenu-icon-wrapper">
                        <i className="far fa-trash-alt" />
                    </div>
                    <div className="contextMenu-text-wrapper">
                        Delete
                    </div>
                </div>
                <div className="contextMenu-line-wrapper">
                    <div className="contextMenu-icon-wrapper">
                        <i className="fas fa-angle-left" />
                    </div>
                    <div className="contextMenu-text-wrapper">
                        Send Backward
                    </div>
                </div>
                <div className="contextMenu-line-wrapper">
                    <div className="contextMenu-icon-wrapper">
                        <i className="fas fa-angle-double-left" />
                    </div>
                    <div className="contextMenu-text-wrapper">
                        Send to Back
                    </div>
                </div>
                <div className="contextMenu-line-wrapper">
                    <div className="contextMenu-icon-wrapper">
                        <i className="fas fa-angle-right" />
                    </div>
                    <div className="contextMenu-text-wrapper">
                        Bring Forward
                    </div>
                </div>
                <div className="contextMenu-line-wrapper">
                    <div className="contextMenu-icon-wrapper">
                        <i className="fas fa-angle-double-right" />
                    </div>
                    <div className="contextMenu-text-wrapper">
                        Bring to Front
                    </div>
                </div>
                <div className="contextMenu-line-wrapper">
                    <div className="contextMenu-icon-wrapper">
                        <i className="far fa-image" />
                    </div>
                    <div className="contextMenu-text-wrapper">
                        Show Full Image
                    </div>
                </div>
                <div className="contextMenu-line-wrapper">
                    <div className="contextMenu-icon-wrapper">
                        <i className="fas fa-palette" />
                    </div>
                    <div className="contextMenu-text-wrapper">
                        Change Color
                    </div>
                </div>
            </div>
        </>
    )
}

ReactDOM.render(<ContextMenu />, document.getElementById("contextMenuWrapper"));
