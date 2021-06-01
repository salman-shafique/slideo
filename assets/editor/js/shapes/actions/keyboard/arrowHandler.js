import session from "Editor/js/session";
import constants from "Editor/js/constants";
import { relocateResizeCircleContainer } from "Editor/js/shapes/actions/resize/utils/copyTransform";

let width_1 = 0;
let width_2 = 0;

export default function arrowHandler(event) {
    if (session.TEXT_EDITING) return;
    if (session.SHAPE_STATE == constants.SHAPE_STATES.PREVIEW) return;
    
    switch (event.which) {
        case 37:
            width_1 = -500;
            width_2 = 0;
            break;
        case 38:
            width_1 = 0;
            width_2 = -500;
            break;
        case 39:
            width_1 = 500;
            width_2 = 0;
            break;
        case 40:
            width_2 = 500;
            width_1 = 0;
            break;
        default:
            return;
    }
    session.SELECTED_ELEMENTS.forEach(selectedEl => {
        selectedEl.translate.transform.setTranslate(
            selectedEl.translate.transform.matrix.e + width_1,
            selectedEl.translate.transform.matrix.f + width_2
        );
        relocateResizeCircleContainer(selectedEl.shape);
    })
}