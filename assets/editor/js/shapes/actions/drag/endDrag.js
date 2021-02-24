import session from "Editor/js/session";
import deSelectAll from "./utils/deSelectAll";
import disableTextSelect from "./utils/disableTextSelect";
import Events from "Editor/js/Events";
import updateAllTransforms from "./utils/updateAllTransforms";
import dragPreventDefault from "./utils/dragPreventDefault";

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


    const shapeId = g.getAttribute("shape_id");


    if (!(event.which == 3 || event.button == 2)) // Check if it is right click
        if (event.ctrlKey) {
            // CTRL
        } else {
            // NO CTRL
            if (session.SELECTED_ELEMENTS.length > 1) {
                // Deselect others
                deSelectAll(shapeId);
            }
        }

    // Update saved transfroms for next actions
    updateAllTransforms();

    if (session.SHAPE_STATE == "DRAGGING") {
        dragPreventDefault(g, true);
        // Trigger event
        Events.shape.drag.ended();
    }
    if (session.SHAPE_STATE == "RESIZING") {
        dragPreventDefault(g, true);
        // Trigger event
        Events.shape.resize.ended();
    }

    session.SAVED_MOUSE_POS =
        session.SHAPE_STATE =
        session.SCALING_DIRECTION =
        null;
}
