import session from "Editor/js/session";
import constants from "Editor/js/constants";

/**
 * @type {{ slideId: string, actionType: number, shapes: { shapeId:{data} } }}
 */
let action = {
    slideId: null,
    actionType: null,
    shapes: {}
};
/**
 * 
 * @param {MouseEvent} event 
 */
const extendEvent = (event) => {
    // Extend the data for the history
    switch (event.type) {
        case 'shape.drag.started':
            if (session.SELECTED_ELEMENTS.length == 0) return;
            session.SELECTED_ELEMENTS.forEach(selectedEl => {
                const shapeId = selectedEl.shape.getAttribute('shape_id');
                action.shapes[shapeId] = {
                    startingE: selectedEl.translate.startingE,
                    startingF: selectedEl.translate.startingF
                }
            });
            break;
        case 'shape.drag.ended':
            if (session.SELECTED_ELEMENTS.length == 0) return;

            session.SELECTED_ELEMENTS.forEach(selectedEl => {
                const shapeId = selectedEl.shape.getAttribute('shape_id');
                action.shapes[shapeId].endingE = selectedEl.translate.transform.matrix.e;
                action.shapes[shapeId].endingF = selectedEl.translate.transform.matrix.f;
            });

            action.slideId = session.CURRENT_SLIDE;
            action.actionType = constants.ACTION_TYPES.DRAG;

            event.historyAction = { ...action };
            action = {
                slideId: null,
                actionType: null,
                shapes: {}
            };
            break;
        default:
            break;
    }
}

export default extendEvent;