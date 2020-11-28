import deSelectEl from "./deSelectEl";
import session from "Editor/js/session";

/**
 * 
 * @param {?string} except 
 */
export default function deSelectAll(except = null) {
    session.SELECTED_ELEMENTS.forEach(selectedEl => {
        if (except) {
            if (selectedEl.shapeId != except) {
                deSelectEl(selectedEl.shapeId);
            }
        } else
            deSelectEl(selectedEl.shapeId);
    });
}