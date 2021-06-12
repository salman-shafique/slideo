import session from "Editor/js/session";
import getMousePosition from "../utils/getMousePosition";
/**
 *
 * @param {Event} event
 * @returns {{x: number, y: number}}
 */
export default function getSelectionRectangleAttributes(event) {
    let mouse_position_end = getMousePosition(event);
    let mouse_position_starting = session.SAVED_SELECTION_MOUSE_POS;

    return {
        'start_x': mouse_position_starting['x'],
        'start_y': mouse_position_starting['y'],
        'end_x': mouse_position_end['x'],
        'end_y': mouse_position_end['y'],
        'width': Math.abs(mouse_position_end['x'] - mouse_position_starting['x']),
        'height': Math.abs(mouse_position_end['y'] - mouse_position_starting['y'])
    }
};
