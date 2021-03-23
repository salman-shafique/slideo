import session from "Editor/js/session";



let shapes = {};
/**
 * 
 * @param {MouseEvent} event 
 */
export const extendEvent = (event) => {
    // Extend the data for the history
    switch (event.type) {
        case 'shape.drag.started':
            if (session.SELECTED_ELEMENTS.length == 0) return;
            session.SELECTED_ELEMENTS.forEach(selectedEl => {
                const shapeId = selectedEl.shape.getAttribute('shape_id');
                shapes[shapeId] = {
                    startingE: selectedEl.translate.startingE,
                    startingF: selectedEl.translate.startingF
                }
            });
            break;
        case 'shape.drag.ended':
            if (session.SELECTED_ELEMENTS.length == 0) return;
       
            session.SELECTED_ELEMENTS.forEach(selectedEl => {
                const shapeId = selectedEl.shape.getAttribute('shape_id');
                shapes[shapeId].endingE = selectedEl.translate.transform.matrix.e;
                shapes[shapeId].endingF = selectedEl.translate.transform.matrix.f;
            });
            event.history = {
                shapes
            };
            shapes = [];
            break;
        default:
            break;
    }
}