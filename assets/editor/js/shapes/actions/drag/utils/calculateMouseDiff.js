import session from "Editor/js/session";
import getMousePosition from "./getMousePosition";
/**
 *
 * @param {MouseEvent} event
 * @returns {{x:number,y:number}}
 */
export default function calculateMouseDiff(event) {
    let currentPos = getMousePosition(event);
    if (currentPos)
        return {
            x: currentPos.x - session.SAVED_MOUSE_POS.x,
            y: currentPos.y - session.SAVED_MOUSE_POS.y
        };
    else
        return {
            x: 0,
            y: 0
        };
}
