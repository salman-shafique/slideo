import startDrag from "./startDrag";
import drag from "./drag";
import endDrag from "./endDrag";
import changeSize from  "Editor/js/shapes/actions/resize/changeSize";

/**
 * 
 * @param {Document} contentDocument 
 */
export default function makeDraggable(contentDocument) {
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
    
}