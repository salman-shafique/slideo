import startDrag from "./startDrag";
import drag from "./drag";
import endDrag from "./endDrag";
import startSelection from "./selection/startSelection";
import endSelection from "./selection/endSelection";
import dragSelection from "./selection/dragSelection";
import changeSize from "Editor/js/shapes/actions/resize/changeSize";
import React from "react";
import reactToDOM from "Editor/js/utils/reactToDOM";
import constants from "Editor/js/constants";

/**
 * 
 * @param {Document} contentDocument 
 */
export default function makeDraggable(contentDocument) {
    // Insert the rect in order to make all spaces draggable
    const rect = reactToDOM(
        <rect x="0" y="0" width={constants.SVG_WIDTH()} height={constants.SVG_HEIGHT()} fill="white" />,
        null,
        "http://www.w3.org/2000/svg"
    )
    contentDocument.querySelector(".SlideGroup .Slide").prepend(rect);

    contentDocument.addEventListener('mousedown', startDrag);
    contentDocument.addEventListener('touchstart', startDrag);
    contentDocument.addEventListener('mousemove', drag);
    contentDocument.addEventListener('touchmove', drag);
    contentDocument.addEventListener('mouseup', endDrag);
    contentDocument.addEventListener('touchend', endDrag);
    contentDocument.addEventListener('touchcancel', endDrag);

    // Resize function
    contentDocument.addEventListener('mousemove', changeSize);
    contentDocument.addEventListener('touchmove', changeSize);

    // Selection listeners
    contentDocument.addEventListener('mousedown', startSelection);
    contentDocument.addEventListener('touchstart', startSelection);
    contentDocument.addEventListener('mousemove', dragSelection);
    contentDocument.addEventListener('touchmove', dragSelection);
    contentDocument.addEventListener('mouseup', endSelection);
    contentDocument.addEventListener('touchend', endSelection);


}
