import React from 'react';
import TextEditor from '../TextEditor/TextEditor';
import IconEditor from '../IconEditor/IconEditor';

export default function PopupsContainer() {
    return (
        <>
            <div id="TextEditorPopup">
                <TextEditor />
            </div>
            <div id="IconPopup">
                <IconEditor />
            </div>
        </>
    );
}