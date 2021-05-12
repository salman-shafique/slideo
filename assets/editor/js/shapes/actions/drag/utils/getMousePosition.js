import session from "Editor/js/session";

/**
 *
 * @param {Event} event
 * @returns {{x: number, y: number}}
 */
export default function getMousePosition(event) {
    if (event.touches)
        event = event.touches[0];
    return {
        x: (event.clientX - session.CURRENT_SLIDE_CTM.e) / session.CURRENT_SLIDE_CTM.a,
        y: (event.clientY - session.CURRENT_SLIDE_CTM.f) / session.CURRENT_SLIDE_CTM.d
    };
};
