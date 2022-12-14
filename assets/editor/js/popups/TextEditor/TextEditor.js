import React, { useEffect, useState } from 'react';
import Events from "Editor/js/Events";
import session from "Editor/js/session";

// this is imported from sidebar
import FontActions from '../../sidebar/textboxes/fontActions/FontActions';

export default function TextEditor() {
    const [visible, setVisible] = useState(false);
    const [activeShape, setActiveShape] = useState(null);

    const closePopup = (e) => {
        setActiveShape(null);
        setVisible(false);
    }

    // initializing shape listeners
    useEffect(() => {
        Events.listen("popup.text.open", (e) => {
            setActiveShape(session.SELECTED_ELEMENTS.filter(shape => shape.shapeId === e.data.shapeId)[0]);
            setVisible(true);
            Events.popup.text.opened();
        });

        Events.listen("shape.allReleased", closePopup);
        Events.listen("shape.selected", closePopup);
        Events.listen("shape.resize.started", closePopup);
        Events.listen("shape.drag.started", closePopup);
        Events.listen("shape.drag.ended", closePopup);
        Events.listen("popup.icon.opened", closePopup);
        Events.listen("popup.image.opened", closePopup);
    }, []);

    return (
        <>
        {visible ?
            <FontActions />
         : null}
            
        </>
    );
}