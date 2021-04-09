import React, { useEffect, useState } from 'react';
import Popup from '../Popup/Popup';
import Events from "Editor/js/Events";
import session from "Editor/js/session";

// this is imported from sidebar
import FontActions from '../../sidebar/textboxes/fontActions/FontActions';

export default function TextEditor() {
    const [visible, setVisible] = useState(false);
    const [normalizedProperties, setNormalizedProperties] = useState({
        width: 1,
        height: 1
    });
    const [offset, setOffset] = useState({
        left: 40,
        top: 40
    });
;
    // function that normalizes svg view box into normal slide width and height
    const normalize = () => {
        const slideContainer = document.getElementById("SlideContainer");
        const svgViewBox = slideContainer.children[0].contentDocument.children[0]?.viewBox?.baseVal;

        const normalWidth = slideContainer.offsetWidth;
        const normalHeight = slideContainer.offsetHeight;

        if (svgViewBox) {
            setNormalizedProperties({ 
                width: normalWidth / svgViewBox.width, 
                height: normalHeight / svgViewBox.height 
            });
        }
    }

    // effect for normalizing properties
    useEffect(() => {
        Events.listen("slide.display", () => {
            normalize();
        });

        window.addEventListener('resize', normalize);

        // listener cleaning function
        return () => {
            window.removeEventListener('resize', normalize);
        }
    }, []);


    // initializing shape listeners
    useEffect(() => {
        Events.listen("popup.text.open", (g) => {
            const shapeCoordinates = session.SELECTED_ELEMENTS.map(shape => ({
                x: shape.size.x + shape.translate.startingE,
                y: shape.size.y + shape.translate.startingF,
                width: shape.size.width,
                height: shape.size.height
            }));

            const popupWidth = 300;

            if (shapeCoordinates.length === 1) {
                setOffset({
                    left: shapeCoordinates[0].x * normalizedProperties.width - popupWidth,
                    top: shapeCoordinates[0].y * normalizedProperties.height
                });
            } else {
                const topShape = Math.min(...shapeCoordinates.map(shape => shape.y));
                const leftShape = Math.min(...shapeCoordinates.map(shape => shape.x));

                setOffset({
                    left: leftShape * normalizedProperties.width - popupWidth,
                    top: topShape * normalizedProperties.height
                });
            }
            
            setVisible(true);
        });

        Events.listen("shape.allReleased", () => {
            setVisible(false);
        });

        Events.listen("shape.selected", () => {
            setVisible(false);
        });
    }, [normalizedProperties]);

    return (
        <Popup visible={ visible } offset={ offset } parent={ 'TextEditorPopup' } >
            <FontActions />
        </Popup>
    );
}