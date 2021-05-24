import session from "Editor/js/session";
import constants from "Editor/js/constants";
import selectEl from "./utils/selectEl";
import deSelectAll from "./utils/deSelectAll";
import getMousePosition from "./utils/getMousePosition";
import updateAllTransforms from "./utils/updateAllTransforms";

/**
 * 
 * @param {MouseEvent} event 
 */
export default function startDrag(event) {
    //Disable for text editor popup
    if (event.target.classList.contains('edit-textbox-icon')) return;

    /**
     * @type {SVGGElement} g
     */
    const g = event.target.parentElement;
    if (!g) return;

    // Allow resize circles clicks
    if (g.getAttribute("role") == "resize-circles") return;

    // Allow text editing
    if (session.TEXT_EDITING && event.target.tagName == "editing") return;

    if (!g.classList.contains("draggable")) {
        // Deselect all
        deSelectAll();
        return;
    };

    selectEl(event);

    updateAllTransforms();

    session.SAVED_MOUSE_POS = getMousePosition(event);
    session.SHAPE_STATE = constants.SHAPE_STATES.DRAG_STARTING;
}
