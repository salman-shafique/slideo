import session from "Editor/js/session";
import constants from "Editor/js/constants";
import shape from "Editor/js/entity/shape";
import getTransform from "Editor/js/shapes/actions/drag/utils/getTransform";


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
export const extendEvent = (event) => {
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

/**
 * 
 * @param {{ slideId: string, actionType: number, shapes: { shapeId:{data} } }} action 
 */
export const undoDrag = (action) => {
    Object.keys(action.shapes).forEach((shapeId) => {
        const shapeActionData = action.shapes[shapeId];
        const g = shape(action.slideId, shapeId).el();
        const allTransforms = getTransform(g);
        allTransforms.translate.transform.setTranslate(
            shapeActionData.endingE,
            shapeActionData.endingF
        )
    });
}

/**
 * 
 * @param {{ slideId: string, actionType: number, shapes: { shapeId:{data} } }} action 
 */
export const redoDrag = (action) => {
    Object.keys(action.shapes).forEach((shapeId) => {
        const shapeActionData = action.shapes[shapeId];
        const g = shape(action.slideId, shapeId).el();
        const allTransforms = getTransform(g);
        allTransforms.translate.transform.setTranslate(
            shapeActionData.startingE,
            shapeActionData.startingF
        )
    });
}