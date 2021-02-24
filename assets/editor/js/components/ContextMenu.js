import React from "react";
import ReactDOM from "react-dom";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import "Editor/css/contextMenu.css";

function ContextMenu(BoundingClientObject) {
    const [isOpen, setIsOpen] = React.useState(false);
    
    const [cursorX, setCursorX] = React.useState(null);
    const [cursorY, setCursorY] = React.useState(null);
   

    const openContextMenu = (e) => {
        // Main logic is here
        

        console.log('event', e)
        console.log('e.target ouside selected_', e.target)
        console.log('window slidcontainer', window.parent.document.getElementById('SlideContainer').getBoundingClientRect())
        console.log( `
        Screen X/Y: ${e.screenX}, ${e.screenY}
        Client X/Y: ${e.clientX}, ${e.clientY}`);

        console.log(window.parent.document.getElementById('SlideContainer').getBoundingClientRect().left);
        console.log(window.parent.document.getElementById('SlideContainer').getBoundingClientRect().top);
        setCursorX(window.parent.document.getElementById('SlideContainer').getBoundingClientRect().left);
        setCursorY(window.parent.document.getElementById('SlideContainer').getBoundingClientRect().top);

        console.log('context menu event clicked', BoundingClientObject)

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
            // setCursorX(selectEl.size.x);
            // setCursorY(selectEl.size.y);
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


    console.log('containerxy', cursorX, cursorY)
    return (
        <>
            <div onMouseMove={() => {console.log('mousedown')}}>

            </div>
            <div 
                id="contextMenu" 
                style={{ 
                    display: isOpen ? "" : "none",
                    left: cursorX,
                    top: cursorY,

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
