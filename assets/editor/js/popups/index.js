import React from 'react';
import ReactDOM from 'react-dom';
import PopupsContainer from './PopupsContainer/PopupsContainer';
import TextEdit from './PopupsContainer/TextEdit';

// Creates new virtual DOM for the popup component, invoke only once
export const renderDOMPopup = () => {
    const popupsContainer = document.createElement("div");
    popupsContainer.setAttribute("id", "PopupsContainer");
    popupsContainer.classList.add('popupscontainer');

    const textEdit = document.createElement("div");
    textEdit.setAttribute("id", "TextEdit");
    textEdit.classList.add('textEdit');
    document.getElementById("SlideContainer").appendChild(popupsContainer);    
    document.getElementById("MainPanel").prepend(textEdit)  // [newChild, child1, child2]

    document.getElementById('PopupsContainer').onclick = function (event) {
        event.stopPropagation();
    }
    
    document.getElementById('TextEdit').onclick = function (event) {
        event.stopPropagation();
    }

    ReactDOM.render(<PopupsContainer />, document.getElementById('PopupsContainer'));
    ReactDOM.render(<TextEdit />, document.getElementById('TextEdit'));
}