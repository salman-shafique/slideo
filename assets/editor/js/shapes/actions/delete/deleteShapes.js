import session from "Editor/js/session";
import shape from "Editor/js/entity/shape";
import deSelectAll from "Editor/js/shapes/actions/drag/utils/deSelectAll";

export default function deleteShapes() {
    session.SELECTED_ELEMENTS.forEach(selectedEl => {
        shape(session.CURRENT_SLIDE, selectedEl.shapeId).remove();
    });
    deSelectAll();
}