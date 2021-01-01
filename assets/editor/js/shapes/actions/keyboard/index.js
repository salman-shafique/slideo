import deSelectAll from "Editor/js/shapes/actions/drag/utils/deSelectAll";
import deleteShapes from "Editor/js/shapes/actions/delete/deleteShapes";
import { saveChanges } from "Editor/js/navbar/SaveButton";


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
                deleteShapes();
                break;
            default:
                break;
        }
    });
}