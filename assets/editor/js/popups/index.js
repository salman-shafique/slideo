import React from 'react';
import ReactDOM from 'react-dom';
import PopupsContainer from './PopupsContainer/PopupsContainer';

// Creates new virtual DOM for the popup component, invoke only once
export const renderDOMPopup = () => {
    const popupsContainer = document.createElement("div");
    popupsContainer.setAttribute("id", "PopupsContainer");
    popupsContainer.classList.add('popupscontainer');

    document.getElementById("SlideContainer").appendChild(popupsContainer);    

    document.getElementById('PopupsContainer').onclick = function (event) {
        event.stopPropagation();
    }

    ReactDOM.render(<PopupsContainer />, document.getElementById('PopupsContainer'));
}