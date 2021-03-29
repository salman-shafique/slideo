import session from "Editor/js/session";
import constants from "Editor/js/constants";

/**
 * @type {{ slideId: string, actionType: number, shapes: { shapeId:{data} } }} dragAction
 */
let dragAction = {
    slideId: null,
    actionType: null,
    shapes: {}
};
/**
 * @type {{ slideId: string, actionType: number, shapeId: string, oldText: string, newText: string }} textEditAction
 */
let textEditAction = {
    slideId: null,
    actionType: null,
    shapeId: null,
    oldText: null,
    newText: null
};
/**
 * @type {{ slideId: string, actionType: number, shapes: { shapeId:{data} } }} resizeAction
 */
let resizeAction = {
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
                dragAction.shapes[shapeId] = {
                    startingE: selectedEl.translate.startingE,
                    startingF: selectedEl.translate.startingF
                }
            });
            break;
        case 'shape.drag.ended':
            if (session.SELECTED_ELEMENTS.length == 0) return;

            session.SELECTED_ELEMENTS.forEach(selectedEl => {
                const shapeId = selectedEl.shape.getAttribute('shape_id');
                dragAction.shapes[shapeId].endingE = selectedEl.translate.transform.matrix.e;
                dragAction.shapes[shapeId].endingF = selectedEl.translate.transform.matrix.f;
            });

            dragAction.slideId = session.CURRENT_SLIDE;
            dragAction.actionType = constants.ACTION_TYPES.DRAG;

            event.historyAction = { ...dragAction };
            dragAction = {
                slideId: null,
                actionType: null,
                shapes: {}
            };
            break;
        case 'shape.textbox.edit.started':
            if (session.SELECTED_ELEMENTS.length != 1) return;
            textEditAction.shapeId = session.SELECTED_ELEMENTS[0].shape.getAttribute('shape_id');
            textEditAction.slideId = session.CURRENT_SLIDE;
            textEditAction.actionType = constants.ACTION_TYPES.EDIT_TEXT;
            textEditAction.oldText = event.data.oldText;
            break;
        case 'shape.textbox.edit.ended':
            if (session.SELECTED_ELEMENTS.length != 1) return;
            textEditAction.newText = event.data.newText;
            event.historyAction = { ...textEditAction };

            textEditAction = {
                slideId: null,
                actionType: null,
                shapeId: null,
                oldText: null,
                newText: null
            };
            break;
        case 'shape.resize.started':
            if (session.SELECTED_ELEMENTS.length == 0) return;
            session.SELECTED_ELEMENTS.forEach(selectedEl => {
                const shapeId = selectedEl.shape.getAttribute('shape_id');
                resizeAction.shapes[shapeId] = {
                    startingA: selectedEl.scale.startingA,
                    startingE: selectedEl.translate.startingE,
                    startingF: selectedEl.translate.startingF
                }
            });
            break;
        case 'shape.resize.ended':
            if (session.SELECTED_ELEMENTS.length == 0) return;

            session.SELECTED_ELEMENTS.forEach(selectedEl => {
                const shapeId = selectedEl.shape.getAttribute('shape_id');
                resizeAction.shapes[shapeId].endingA = selectedEl.scale.transform.matrix.a;
                resizeAction.shapes[shapeId].endingE = selectedEl.translate.transform.matrix.e;
                resizeAction.shapes[shapeId].endingF = selectedEl.translate.transform.matrix.f;
            });

            resizeAction.slideId = session.CURRENT_SLIDE;
            resizeAction.actionType = constants.ACTION_TYPES.RESIZE;

            event.historyAction = { ...resizeAction };
            resizeAction = {
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