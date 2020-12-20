import session from "Editor/js/session";
import getTransform from "./getTransform";
import getSizeAttributes from "./getSizeAttributes";

export default function updateAllTransforms() {
    session.SELECTED_ELEMENTS.forEach(selectedEl => {
        Object.assign(selectedEl, getTransform(selectedEl.shape));
        selectedEl.size = getSizeAttributes(selectedEl.shape);
    });
}