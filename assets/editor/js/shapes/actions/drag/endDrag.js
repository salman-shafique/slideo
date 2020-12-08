import session from "Editor/js/session";
import deSelectAll from "./utils/deSelectAll";
import disableTextSelect from "./utils/disableTextSelect";

/**
 * 
 * @param {MouseEvent} event 
 */
export default function endDrag(event) {
    /**
     * @type {SVGGElement} g
     */
    let g = event.target.parentElement;
    if(!g) return;
    
    let shapeId = g.getAttribute("shape_id");

    if (event.ctrlKey) {
        // CTRL
    } else {
        // NO CTRL
        if (session.SELECTED_ELEMENTS.length > 1) {
            // Deselect others
            deSelectAll(shapeId);
        }
    }

    session.SAVED_MOUSE_POS = session.SHAPE_STATE = null;
    g.ownerDocument.removeEventListener('selectstart', disableTextSelect);
}
