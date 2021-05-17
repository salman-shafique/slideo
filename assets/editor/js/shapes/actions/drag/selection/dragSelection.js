
import session from "Editor/js/session";
import getMousePosition from "../utils/getMousePosition";
/**
 *
 * @param {MouseEvent} event
 */
export default function dragSelection(event) {
    if (session.SELECTION_STATE != "STARTING") return;
    session.SELECTION_STATE = "SELECTING";

    console.log("getMousePosition(event)", getMousePosition(event));
}