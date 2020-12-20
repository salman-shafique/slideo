import session from "Editor/js/session";
import Events from "Editor/js/Events";

/**
 * 
 * @param {string} shapeId
 */
export default function deSelectEl(shapeId) {

    session.SELECTED_ELEMENTS.forEach(selectedEl => {
        if (shapeId == selectedEl.shapeId) {
            selectedEl.SAVED_SCALE_DATA = null;
            // Trigger deselection event
            Events.shape.released({ 'shape': selectedEl.shape });
        }
    });
    session.SELECTED_ELEMENTS = session.SELECTED_ELEMENTS.filter(selectedEl => (selectedEl.shapeId != shapeId));

}