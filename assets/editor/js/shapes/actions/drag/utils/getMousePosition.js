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
    } else return null;
}
