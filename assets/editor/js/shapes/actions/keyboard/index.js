import deSelectAll from "Editor/js/shapes/actions/drag/utils/deSelectAll";


/**
 * 
 * @param {Document} contentDocument 
 */
export default function keyboardListener(contentDocument) {
    contentDocument.addEventListener('keyup', (event) => {
        const key = event.key;

        if (key == "Escape") {
            deSelectAll()
        }
    });


}