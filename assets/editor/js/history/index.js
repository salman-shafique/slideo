import Events from "Editor/js/Events";
import constants from "Editor/js/constants";
import session from "Editor/js/session";
import slide from "Editor/js/entity/slide";
import {
    undoDrag,
    redoDrag,
    undoTextEdit,
    redoTextEdit,
    undoResize,
    redoResize,
    undoChangeIcon,
    redoChangeIcon,
    undoChangeImage,
    redoChangeImage,
    undoDeleteShape,
    redoDeleteShape,
} from "./utils";
import toastr from "Editor/js/components/toastr";
import deSelectAll from "../shapes/actions/drag/utils/deSelectAll";

/**
 * 
 * @param {{ slideId: string, actionType: number }} action 
 * @returns 
 */
const addToHistory = (event) => {
    if (!session.INITED) return;
    if (!session.PRESENTATION) return;

    if (!event?.historyAction?.slideId) return;

    const action = event.historyAction;

    // Slice the old events
    if (session.PRESENTATION.history.current + 1 != session.PRESENTATION.history.actions.length)
        session.PRESENTATION.history.actions = session.PRESENTATION.history.actions.slice(0, session.PRESENTATION.history.current + 1);

    session.PRESENTATION.history.actions.push(action);
    session.PRESENTATION.history.current++;
}

export const undo = () => {
    if (!session.CURRENT_SLIDE) return;
    if (!session.PRESENTATION.history) return;
    if (session.PRESENTATION.history.current === -1) {
        toastr.info("No action to undo");
        return;
    }

    const action = session.PRESENTATION.history.actions[session.PRESENTATION.history.current];

    // go to related slide
    if (action.slideId != session.CURRENT_SLIDE)
        slide(action.slideId).display();

    switch (action.actionType) {
        case constants.ACTION_TYPES.DRAG:
            undoDrag(action);
            break;
        case constants.ACTION_TYPES.EDIT_TEXT:
            undoTextEdit(action);
            break;
        case constants.ACTION_TYPES.RESIZE:
            undoResize(action);
            break;
        case constants.ACTION_TYPES.CHANGE_ICON:
            undoChangeIcon(action);
            break;
        case constants.ACTION_TYPES.CHANGE_IMAGE:
            undoChangeImage(action);
            break;
        case constants.ACTION_TYPES.DELETE_SHAPE:
            undoDeleteShape(action);
            break;
        case constants.ACTION_TYPES.DELETE_SLIDE:
            slide(action.slideId).restore();
            break;
        default:
            return;
    }
    deSelectAll();

    session.PRESENTATION.history.current--;
}

export const redo = () => {
    if (!session.CURRENT_SLIDE) return;
    if (!session.PRESENTATION.history) return;
    // Latest action
    if (session.PRESENTATION.history.current + 1 == session.PRESENTATION.history.actions.length) {
        toastr.info("No action to redo");
        return;
    }

    const action = session.PRESENTATION.history.actions[session.PRESENTATION.history.current + 1];

    // go to related slide
    if (action.slideId != session.CURRENT_SLIDE)
        slide(action.slideId).display();

    switch (action.actionType) {
        case constants.ACTION_TYPES.DRAG:
            redoDrag(action);
            break;
        case constants.ACTION_TYPES.EDIT_TEXT:
            redoTextEdit(action);
            break;
        case constants.ACTION_TYPES.RESIZE:
            redoResize(action);
            break;
        case constants.ACTION_TYPES.CHANGE_ICON:
            redoChangeIcon(action);
            break;
        case constants.ACTION_TYPES.CHANGE_IMAGE:
            redoChangeImage(action);
            break;
        case constants.ACTION_TYPES.DELETE_SHAPE:
            redoDeleteShape(action);
            break;
        case constants.ACTION_TYPES.DELETE_SLIDE:
            slide(action.slideId).delete(false);
            break;
        default:
            return;
    }
    deSelectAll();

    session.PRESENTATION.history.current++;
}


// Drag
Events.listen('shape.drag.ended', addToHistory);
// Edit textbox
Events.listen('shape.textbox.edit.ended', addToHistory);
// Resize
Events.listen('shape.resize.ended', addToHistory);
// Change Icon
Events.listen('shape.icon.changed', addToHistory);
// Change Image
Events.listen('shape.image.changed', addToHistory);
// Delete Shape
Events.listen('shape.deleted', addToHistory);
// Delete Slide
Events.listen('slide.deleted', addToHistory);


export const historyInit = () => {
    if (!session.PRESENTATION?.history?.actions)
        session.PRESENTATION.history = {
            current: -1,
            actions: []
        };

    if (typeof session.PRESENTATION.history.current != "number")
        session.PRESENTATION.history.current = parseInt(session.PRESENTATION.history.current);

    if (session.PRESENTATION.history.actions.length > 0) {
        session.PRESENTATION.history.actions.forEach(action => {
            action.actionType = parseInt(action.actionType);
            switch (action.actionType) {
                case constants.ACTION_TYPES.DRAG:
                    Object.keys(action.shapes).forEach((shapeId) => {
                        const shapeActionData = action.shapes[shapeId];
                        shapeActionData.startingE = parseFloat(shapeActionData.startingE);
                        shapeActionData.startingF = parseFloat(shapeActionData.startingF);
                        shapeActionData.endingE = parseFloat(shapeActionData.endingE);
                        shapeActionData.endingF = parseFloat(shapeActionData.endingF);
                    });
                    break;
                case constants.ACTION_TYPES.RESIZE:
                    Object.keys(action.shapes).forEach((shapeId) => {
                        const shapeActionData = action.shapes[shapeId];
                        shapeActionData.startingA = parseFloat(shapeActionData.startingA);
                        shapeActionData.startingE = parseFloat(shapeActionData.startingE);
                        shapeActionData.startingF = parseFloat(shapeActionData.startingF);
                        shapeActionData.endingA = parseFloat(shapeActionData.endingA);
                        shapeActionData.endingE = parseFloat(shapeActionData.endingE);
                        shapeActionData.endingF = parseFloat(shapeActionData.endingF);
                    });
                    break;
                default:
                    return;
            }
        });
    }

}