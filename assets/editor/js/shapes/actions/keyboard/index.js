import deSelectAll from "Editor/js/shapes/actions/drag/utils/deSelectAll";
import deleteShapes from "Editor/js/shapes/actions/delete/deleteShapes";
import session from "Editor/js/session";
import { undo, redo } from "Editor/js/history/index";

const Z_equivalents = ["z", "ז"];
const Y_equivalents = ["y", "ט"];
const C_equivalents = ["c", "ב"];
const X_equivalents = ["x", "ס"];
const V_equivalents = ["v", "ה"];
const S_equivalents = ["s", "ד"];

/**
 * @param {KeyboardEvent} event
*/
const keyboardHandler = (event) => {
    const key = event.key;
    if (key == "Escape") {
        deSelectAll();
    } else if (key == "Delete") {
        if (session.TEXT_EDITING) return;
        deleteShapes();
    } else if (Z_equivalents.includes(key.toLowerCase()) && event.ctrlKey) {
        if (session.TEXT_EDITING) return;
        undo();
    } else if (Y_equivalents.includes(key.toLowerCase()) && event.ctrlKey) {
        if (session.TEXT_EDITING) return;
        redo();
    } else if (C_equivalents.includes(key.toLowerCase()) && event.ctrlKey) {

    } else if (X_equivalents.includes(key.toLowerCase()) && event.ctrlKey) {

    } else if (V_equivalents.includes(key.toLowerCase()) && event.ctrlKey) {

    } else if (S_equivalents.includes(key.toLowerCase()) && event.ctrlKey) {

    }
}

/**
 * @param {Document} contentDocument 
 * @description For slide SVGs
 */
export default function keyboardListener(contentDocument) {
    contentDocument.addEventListener('keyup', keyboardHandler);
}

/**
 * @description For the window, one time
 */
window.addEventListener('keyup', keyboardHandler);