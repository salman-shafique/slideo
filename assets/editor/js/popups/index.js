import React from 'react';
import ReactDOM from 'react-dom';
import TextEditor from './TextEditor/TextEditor';

// Creates new virtual DOM for the popup component, invoke only once
export const renderDOMPopup = () => {
    const textEditorPopup = document.createElement("div");
    textEditorPopup.setAttribute("id", "TextEditorPopup");

    document.getElementById("SlideContainer").appendChild(textEditorPopup);

    ReactDOM.render(
        <TextEditor />,
        document.getElementById("TextEditorPopup")
    );
}