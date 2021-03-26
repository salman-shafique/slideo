import Events from "Editor/js/Events";
import constants from "Editor/js/constants";
import session from "Editor/js/session";
import shape from "../entity/shape";
import slide from "../entity/slide";

/**
 * 
 * @param {{ slideId: string, actionType: number, shapes: { shapeId:{data} } }} historyObj 
 * @returns 
 */
const addToHistory = (historyObj) => {
    if (!session.INITED) return;
    if (!session.PRESENTATION) return;

    if (!session.PRESENTATION.history) session.PRESENTATION.history = {
        current: null,
        actions: []
    };

    session.PRESENTATION.history.actions.push(historyObj);

    session.PRESENTATION.history.current === null
        ? session.PRESENTATION.history.current = 0
        : session.PRESENTATION.history.current++;
}

export const undo = () => {
    const prevAction = session.PRESENTATION.history.actions;
    if (session.CURRENT_SLIDE != "")
        console.log("undo");
}
export const redo = () => {
    console.log("redo");
}


// Drag
Events.listen('shape.drag.ended', (event) => {
    addToHistory({
        slideId: session.CURRENT_SLIDE,
        actionType: constants.ACTION_TYPES.DRAG,
        shapes: event.history.shapes
    });
});