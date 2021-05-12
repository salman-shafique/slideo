import session from "Editor/js/session";

/**
 *
 * @param {Event} event
 * @returns {{x: number, y: number}}
 */
export default function getMousePosition(event) {
    const CTM = document
        .querySelector(`object.main-container[id="${session.CURRENT_SLIDE}"]`)
        .contentDocument
        .documentElement
        .getScreenCTM();

    if (event.touches)
        event = event.touches[0];
    return {
        x: (event.clientX - CTM.e) / CTM.a,
        y: (event.clientY - CTM.f) / CTM.d
    };
};
