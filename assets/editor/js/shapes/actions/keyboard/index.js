import deSelectAll from "Editor/js/shapes/actions/drag/utils/deSelectAll";
import deleteShapes from "Editor/js/shapes/actions/delete/deleteShapes";
import session from "Editor/js/session";
import { undo, redo } from "Editor/js/history/index";
import { shapeHandler } from "Editor/js/components/ContextMenu.js"
import shape from "Editor/js/entity/shape";
import toastr from "Editor/js/components/toastr";

const Z_equivalents = ["z", "ז"];
const Y_equivalents = ["y", "ט"];
const C_equivalents = ["c", "ב"];
const X_equivalents = ["x", "ס"];
const V_equivalents = ["v", "ה"];
const S_equivalents = ["s", "ס"];
const D_equivalents = ["d", "ד"];

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
        session.COPIED_ELEMENTS = session.SELECTED_ELEMENTS.map((e) => {
            return { shapeId: e.shapeId, slideId: session.CURRENT_SLIDE, shapeType: e.shapeType }
        });
        session.CUT_ELEMENTS = [];
        toastr.info(`Shape/s copied to clipboard`);
    } else if (X_equivalents.includes(key.toLowerCase()) && event.ctrlKey) {
        session.CUT_ELEMENTS = session.SELECTED_ELEMENTS.map((e) => {
            return { shapeId: e.shapeId, slideId: session.CURRENT_SLIDE, shapeType: e.shapeType }
        });
        session.COPIED_ELEMENTS = [];
        toastr.info(`Shape/s moved to clipboard`);
    } else if (V_equivalents.includes(key.toLowerCase()) && event.ctrlKey) {
        session.COPIED_ELEMENTS?.forEach(copiedElement => {
            const shape_ = shape(copiedElement.slideId, copiedElement.shapeId).data();
            shape_.shape_type = copiedElement.shapeType
            const data = [shape_]
            shapeHandler(data);
        });
        session.CUT_ELEMENTS?.forEach(cutElement => {
            const shape_ = shape(cutElement.slideId, cutElement.shapeId);
            const shapeData = shape_.data();
            shapeData.shape_type = cutElement.shapeType
            shapeHandler([shapeData]);
            shape_.remove();
        }) && (session.COPIED_ELEMENTS = session.CUT_ELEMENTS = []);
    } else if (S_equivalents.includes(key.toLowerCase()) && event.ctrlKey) {

    } else if (D_equivalents.includes(key.toLowerCase()) && event.ctrlKey) {
        if (session.TEXT_EDITING) return;
        shapeHandler("duplication");
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