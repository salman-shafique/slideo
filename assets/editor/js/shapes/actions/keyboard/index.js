import deSelectAll from "Editor/js/shapes/actions/drag/utils/deSelectAll";
import deleteShapes from "Editor/js/shapes/actions/delete/deleteShapes";
import session from "Editor/js/session";

/**
 * 
 * @param {Document} contentDocument 
 */
export default function keyboardListener(contentDocument) {
    contentDocument.addEventListener('keyup', (event) => {
        const key = event.key;
        switch (key) {
            case "Escape":
                deSelectAll()
                break;
            case "Delete":
                if (!session.TEXT_EDITING)
                    deleteShapes();
                break;
            default:
                break;
        }
    });
}