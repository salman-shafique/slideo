import session from "Editor/js/session";
import selectEl from "./utils/selectEl";
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
    const g = event.target.parentElement;
    if (!g) return;

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

    session.SAVED_MOUSE_POS = getMousePosition(event);
    session.SHAPE_STATE = "DRAG_STARTING";
}
