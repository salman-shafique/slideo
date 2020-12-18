import session from "Editor/js/session";
import calculateMouseDiff from "./utils/calculateMouseDiff";
import Events from "Editor/js/Events";
import disableTextSelect from "./utils/disableTextSelect";

/**
 * 
 * @param {Event} event
 */
export default function drag(event) {
    if (session.SHAPE_STATE == "DRAG_STARTING") {
        /**
         * @type {SVGGElement} g
         */
        const g = event.target.parentElement;
        if (!g) return;

        if (!g.classList.contains("dragging"))
            g.classList.add("dragging");
        g.ownerDocument.addEventListener("selectstart", disableTextSelect);

        session.SHAPE_STATE = "DRAGGING";
        // Trigger event
        Events.shape.drag.started();
    }

    if (session.SHAPE_STATE == "DRAGGING" && session.SAVED_MOUSE_POS) {
        if (session.SELECTED_ELEMENTS.length > 0) {
            let mouseDiff = calculateMouseDiff(event);
            session.SELECTED_ELEMENTS.forEach(selectedEl => {
                selectedEl.translate.transform.setTranslate(
                    selectedEl.translate.startingE + mouseDiff.x,
                    selectedEl.translate.startingF + mouseDiff.y,
                );
            });
        }
    }
}