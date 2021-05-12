import deSelectAll from "Editor/js/shapes/actions/drag/utils/deSelectAll";

/**
 *
 * @param {Event} event
 * @returns  {{x: number, y: number}}
 */
export default function getMousePosition(event) {
    if (event.target.ownerSVGElement) {
        var CTM = event.target.ownerSVGElement.getScreenCTM();
        if (event.touches) {
            event = event.touches[0];
        }
        return {
            x: (event.clientX - CTM.e) / CTM.a,
            y: (event.clientY - CTM.f) / CTM.d
        };
    } else {
        return {
            x: (event.clientX - 0.08460385059743042) / 0.02574278183183645,
            y: (event.clientY - 0) / 0.02574278183183645
        };
    }
};
