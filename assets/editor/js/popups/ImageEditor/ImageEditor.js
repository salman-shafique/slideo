import React, { useState, useEffect } from 'react';
import ImageEditorContent from './ImageEditorContent';
import Popup from '../Popup/Popup';
import Events from "Editor/js/Events";
import session from "Editor/js/session";

export default function ImageEditor() {
    const [visible, setVisible] = useState(false);
    const [activeShape, setActiveShape] = useState(null);


    const closePopup = (e) => {
        setActiveShape(null);
        setVisible(false);
    }

    // initializing shape listeners
    useEffect(() => {
        Events.listen("popup.image.open", (e) => {
            setActiveShape(session.SELECTED_ELEMENTS.filter(shape => shape.shapeId === e.data.shapeId)[0]);
            setVisible(true);
            Events.popup.image.opened();
        });

        Events.listen("shape.allReleased", closePopup);
        Events.listen("shape.selected", closePopup);
        Events.listen("popup.text.opened", closePopup);
        Events.listen("popup.icon.opened", closePopup);
    }, []);

    return (
        <Popup visible={visible} shape={activeShape} parent={'ImagePopup'} >
            <ImageEditorContent />
        </Popup>
    );
}