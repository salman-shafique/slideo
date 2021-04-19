import React, { useEffect, useState } from 'react';
import Popup from '../Popup/Popup';
import Events from "Editor/js/Events";
import session from "Editor/js/session";

// this is imported from sidebar
import FontActions from '../../sidebar/textboxes/fontActions/FontActions';

export default function TextEditor() {
    const [visible, setVisible] = useState(false);
    const [activeShape, setActiveShape] = useState(null);

    // initializing shape listeners
    useEffect(() => {
        Events.listen("popup.text.open", (e) => {
            setActiveShape(session.SELECTED_ELEMENTS.filter(shape => shape.shapeId === e.data.shapeId)[0]);
            setVisible(true);
        });

        Events.listen("shape.allReleased", () => {
            setActiveShape(null);
            setVisible(false);
        });

        Events.listen("shape.selected", () => {
            setActiveShape(null);
            setVisible(false);
        });
    }, []);

    return (
        <Popup visible={ visible } shape={ activeShape } parent={'TextEditorPopup'} >
            <FontActions />
        </Popup>
    );
}