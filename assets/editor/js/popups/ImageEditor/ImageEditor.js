import React, { useState, useEffect } from 'react';
import ImageEditorContent from './ImageEditorContent';
import Popup from '../Popup/Popup';
import Events from "Editor/js/Events";
import session from "Editor/js/session";
import shape from '../../entity/shape';
import useKeyword from '../hooks/useKeyword';

export default function ImageEditor() {
    const [visible, setVisible] = useState(false);
    const [keyword, setKeyword] = useState(null);
    const [activeShape, setActiveShape] = useState(null);
    const hook = useKeyword('Pexels/find_images', 20);
    
    const closePopup = (e) => {
        setActiveShape(null);
        setVisible(false);
    }

    // initializing shape listeners
    useEffect(async () => {
        Events.listen("popup.image.open",async (e) => {
            setKeyword(shape(session.SELECTED_ELEMENTS[0].shape).data().keyword ? shape(session.SELECTED_ELEMENTS[0].shape).data().keyword : '')                        
            setActiveShape(session.SELECTED_ELEMENTS.filter(shape => shape.shapeId === e.data.shapeId)[0]);

            if(shape(session.SELECTED_ELEMENTS[0].shape).data().keyword){
                setVisible(true)
                Events.popup.image.opened();
    
            }
        });

        Events.listen("shape.allReleased", closePopup);
        Events.listen("shape.selected", closePopup);
        Events.listen("shape.resize.started", closePopup);
        Events.listen("popup.text.opened", closePopup);
        Events.listen("popup.icon.opened", closePopup);
    }, []);
    console.log(keyword)
    return (
        <Popup visible={visible} shape={activeShape} parent={'ImagePopup'} >
        {keyword ?
            <ImageEditorContent keyword={keyword}/>
         :
            null
        }
                
        </Popup>
    );
}