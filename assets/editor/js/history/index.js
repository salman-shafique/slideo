import Events from "Editor/js/Events";
import constants from "Editor/js/constants";
import session from "Editor/js/session";
import slide from "Editor/js/entity/slide";
import { undoDrag, redoDrag } from "./utils";
import toastr from "Editor/js/components/toastr";
import deSelectAll from "../shapes/actions/drag/utils/deSelectAll";

/**
 * 
 * @param {{ slideId: string, actionType: number, shapes: { shapeId:{data} } }} action 
 * @returns 
 */
const addToHistory = (action) => {
    if (!session.INITED) return;
    if (!session.PRESENTATION) return;

    if (!session.PRESENTATION.history)
        session.PRESENTATION.history = {
            current: -1,
            actions: []
        };

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
        default:
            return;
    }
    deSelectAll();

    session.PRESENTATION.history.current++;
}


// Drag
Events.listen('shape.drag.ended', (event) => {
    addToHistory(event.historyAction);
});