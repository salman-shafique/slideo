import startDrag from "./drag/startDrag";
import drag from "./drag/drag";
import endDrag from "./drag/endDrag";

/**
 * 
 * @param {Document} svg 
 */
export default function makeDraggable(contentDocument) {
    contentDocument.addEventListener('mousedown', startDrag);
    contentDocument.addEventListener('touchstart', startDrag);
    contentDocument.addEventListener('mousemove', drag);
    contentDocument.addEventListener('touchmove', drag);
    contentDocument.addEventListener('mouseup', endDrag);
    contentDocument.addEventListener('touchend', endDrag);
    contentDocument.addEventListener('touchcancel', endDrag);
}