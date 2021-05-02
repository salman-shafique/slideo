import React from 'react';
import TextEditor from '../TextEditor/TextEditor';
import IconEditor from '../IconEditor/IconEditor';
import ImageEditor from '../ImageEditor/ImageEditor';

export default function PopupsContainer() {
    return (
        <>
            <div id="TextEditorPopup">
                <TextEditor />
            </div>
            <div id="IconPopup">
                <IconEditor />
            </div>
            <div id="ImagePopup">
                <ImageEditor />
            </div>
        </>
    );
}