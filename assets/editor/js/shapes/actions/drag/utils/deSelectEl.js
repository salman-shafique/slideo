import session from "Editor/js/session";

/**
 * 
 * @param {string} shapeId
 */
export default function deSelectEl(shapeId) {

    session.SELECTED_ELEMENTS.forEach(selectedEl => {
        if (shapeId == selectedEl.shapeId)
            selectedEl.shape.style.outline = "";
    });
    session.SELECTED_ELEMENTS = session.SELECTED_ELEMENTS.filter(selectedEl => (selectedEl.shapeId != shapeId));

}