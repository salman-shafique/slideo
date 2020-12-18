import session from "Editor/js/session";
import deSelectAll from "./utils/deSelectAll";
import disableTextSelect from "./utils/disableTextSelect";
import slide from "Editor/js/entity/slide";
import Events from "Editor/js/Events";

/**
 * 
 * @param {MouseEvent} event 
 */
export default function endDrag(event) {
    /**
     * @type {SVGGElement} g
     */
    let g = event.target.parentElement;
    if (!g) return;

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

    slide(session.CURRENT_SLIDE).cloneToMiniPrev();

    if (session.SHAPE_STATE == "DRAGGING") {
        g.ownerDocument.removeEventListener('selectstart', disableTextSelect);
        if (g.ownerDocument.querySelector("svg").classList.contains("dragging"))
            g.ownerDocument.querySelector("svg").classList.remove("dragging");
        // Trigger event
        Events.shape.drag.ended();
    }
    session.SAVED_MOUSE_POS = session.SHAPE_STATE = null;
}
