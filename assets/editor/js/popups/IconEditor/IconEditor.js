import React, { useEffect, useState } from 'react';
import Popup from '../Popup/Popup';
import Events from "Editor/js/Events";
import session from "Editor/js/session";
import IconEditorContent from './IconEditorContent';

export default function IconEditor() {
    const [visible, setVisible] = useState(false);
    const [activeShape, setActiveShape] = useState(null);


    const closePopup = (e) => {
        setActiveShape(null);
        setVisible(false);
    }

    // initializing shape listeners
    useEffect(() => {
        Events.listen("popup.icon.open", (e) => {
            setActiveShape(session.SELECTED_ELEMENTS.filter(shape => shape.shapeId === e.data.shapeId)[0]);
            setVisible(true);
            Events.popup.icon.opened();
        });

        Events.listen("shape.allReleased", closePopup);
        Events.listen("shape.selected", closePopup);
        Events.listen("popup.text.opened", closePopup);
    }, []);

    return (
        <Popup visible={visible} shape={activeShape} parent={'IconPopup'} >
            <IconEditorContent />
        </Popup>
    );
}