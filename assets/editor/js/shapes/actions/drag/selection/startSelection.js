
import session from "Editor/js/session";
import getMousePosition from "../utils/getMousePosition";
import createSelectionRectangle from "./createSelectionRectangle.js"
import getSelectionRectangleAttributes from "../utils/getSelectionRectangleAttributes.js"
/**
 *
 * @param {MouseEvent} event
 */
export default function startSelection(event) {
    if (event.target.classList.contains("bounding_box")) return;

    session.SELECTION_STATE = "STARTING";
    session.SAVED_SELECTION_MOUSE_POS = getMousePosition(event);
    createSelectionRectangle(getSelectionRectangleAttributes(event));
}