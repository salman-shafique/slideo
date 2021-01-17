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

    // Allow resize circles clicks
    if (g.getAttribute("role") == "resize-circles") return;

    if (!g.classList.contains("draggable")) {
        // Deselect all
        deSelectAll();
        return;
    };

    selectEl(event);

    updateAllTransforms();

    session.SAVED_MOUSE_POS = getMousePosition(event);
    session.SHAPE_STATE = "DRAG_STARTING";
}
