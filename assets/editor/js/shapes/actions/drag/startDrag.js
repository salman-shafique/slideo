import session from "Editor/js/session";
import selectEl from "./utils/selectEl";
import deSelectEl from "./utils/deSelectEl";
import deSelectAll from "./utils/deSelectAll";
import getMousePosition from "./utils/getMousePosition";
import updateAllTransforms from "./utils/updateAllTransforms";

/**
 * 
 * @param {MouseEvent} event 
 */
export default function startDrag(event) {
    /**
     * @type {SVGGElement} g
     */
    let g = event.target.parentElement;
    let shapeId = g.getAttribute("shape_id");
    if (!g.classList.contains("draggable")) {
        // Deselect all
        deSelectAll();
        return;
    };

    selectEl(event);
    if (event.ctrlKey) {
    } else {
        deSelectAll(shapeId)
    }
    updateAllTransforms();
    
    session.SHAPE_STATE = "DRAGGING";
    session.SAVED_MOUSE_POS = getMousePosition(event);

}
