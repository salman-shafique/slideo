import React from 'react';
import IconEditor from '../IconEditor/IconEditor';
import ImageEditor from '../ImageEditor/ImageEditor';

export default function PopupsContainer() {
    return (
        <>
            <div id="IconPopup">
                <IconEditor />
            </div>
            <div id="ImagePopup">
                <ImageEditor />
            </div>
        </>
    );
}