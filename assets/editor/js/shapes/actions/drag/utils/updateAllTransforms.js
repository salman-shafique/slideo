import session from "Editor/js/session";
import getTransform from "./getTransform";

export default function updateAllTransforms() {
    session.SELECTED_ELEMENTS.forEach(selectedEl => {
        Object.assign(selectedEl, getTransform(selectedEl.shape));
    });
}