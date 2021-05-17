
import session from "Editor/js/session";
import getMousePosition from "../utils/getMousePosition";
/**
 *
 * @param {MouseEvent} event
 */
export default function startSelection(event) {
    session.SELECTION_STATE = "STARTING";
    session.SAVED_SELECTION_MOUSE_POS = getMousePosition(event);

}