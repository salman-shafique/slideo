import session from "Editor/js/session";
import getMousePosition from "./utils/getMousePosition";
import calculateMouseDiff from "./utils/calculateMouseDiff";


/**
 * 
 * @param {Event} event
 */
export default function drag(event) {
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