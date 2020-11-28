import session from "Editor/js/session";

/**
 * 
 * @param {string} shapeId 
 * @returns {Boolean}
 */
export default function checkSelected(shapeId) {
    // Check if it is selected before
    let selectedBefore = false;
    session.SELECTED_ELEMENTS.forEach(selectedEl => {
        if (selectedEl.shapeId == shapeId)
            selectedBefore = true;
    });
    return selectedBefore;
}