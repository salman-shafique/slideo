
import shape from "Editor/js/entity/shape";
import slide from "Editor/js/entity/slide";
import session from "Editor/js/session";
import getMousePosition from "../utils/getMousePosition";
import selectEl from "../utils/selectEl";
import getTransform from "../utils/getTransform";

/**
 *
 * @param {MouseEvent} event
 */
export default function endSelection(event) {
    if (session.SELECTION_STATE != "SELECTING") return;


    const latestPosition = getMousePosition(event);
    console.log("latestPosition", latestPosition);
    console.log("session.SAVED_SELECTION_MOUSE_POS", session.SAVED_SELECTION_MOUSE_POS);

    slide(session.CURRENT_SLIDE).slideData().shapes.forEach(shape_ => {
        const shapeCls = shape(session.CURRENT_SLIDE, shape_.data.shape_id);
        const g = shapeCls.el();
        // g.getAttribute("transform")

        const allTransforms = getTransform(g);
        // find actual centers

        selectEl({ target: { parentElement: g }, ctrlKey: true });
        console.log(shape_);
    })

    session.SELECTION_STATE = null;
}