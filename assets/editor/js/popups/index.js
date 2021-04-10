import React from 'react';
import ReactDOM from 'react-dom';
import TextEditor from './TextEditor/TextEditor';

// Adding Text Editor Popup to container
const textEditorPopup = document.createElement("div");
textEditorPopup.setAttribute("id", "TextEditorPopup");

document.getElementById("MainPanel").appendChild(textEditorPopup);

ReactDOM.render(
    <TextEditor />,
    document.getElementById("TextEditorPopup")
);