
import session from "Editor/js/session";
import getMousePosition from "../utils/getMousePosition";
import updateSelectionRectangle from "./updateSelectionRectangle.js"
import getSelectionRectangleAttributes from "../utils/getSelectionRectangleAttributes.js"
/**
 *
 * @param {MouseEvent} event
 */
export default function dragSelection(event) {
    if ( session.SELECTION_STATE == "SELECTING"){
        
        updateSelectionRectangle(getSelectionRectangleAttributes(event))
        return;
    }
    if (session.SELECTION_STATE != "STARTING") return;
    session.SELECTION_STATE = "SELECTING"

    
}