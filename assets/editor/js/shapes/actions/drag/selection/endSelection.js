
import shape from "Editor/js/entity/shape";
import slide from "Editor/js/entity/slide";
import session from "Editor/js/session";
import selectEl from "../utils/selectEl";
import getSelectionRectangleAttributes from "../utils/getSelectionRectangleAttributes.js"
/**
 *
 * @param {MouseEvent} event
 */
export default function endSelection(event, slideId = session.CURRENT_SLIDE) {
    if (session.SELECTION_STATE != "SELECTING") {
        session.SELECTION_STATE = null;
        return;
    }
    let start_x, start_y, end_x, end_y;

    let selectionRectangleData = getSelectionRectangleAttributes(event)

    if (selectionRectangleData.start_x < selectionRectangleData.end_x) {
        start_x = selectionRectangleData.start_x;
        end_x = selectionRectangleData.end_x;
    }
    else {
        start_x = selectionRectangleData.end_x;
        end_x = selectionRectangleData.start_x;
    }
    if (selectionRectangleData.start_y < selectionRectangleData.end_y) {
        start_y = selectionRectangleData.start_y;
        end_y = selectionRectangleData.end_y;
    }
    else {
        start_y = selectionRectangleData.end_y;
        end_y = selectionRectangleData.start_y;
    }


    $('object.main-container[data-slide-id="' + slideId + '"]')[0].contentDocument.getElementById('selectionRectanglebounding').remove();
    session.SELECTION_STATE = null;

    slide(session.CURRENT_SLIDE).slideData().shapes.forEach(shape_ => {
        if (shape_.active == "false") return;

        let shape_center_x = parseInt(shape_.data.x) + parseInt(shape_.data.width) / 2;
        let shape_center_y = parseInt(shape_.data.y) + parseInt(shape_.data.height) / 2;

        const shapeCls = shape(session.CURRENT_SLIDE, shape_.data.shape_id);
        console.log(getTransform(shapeCls.el()));
        if ((shape_center_x >= parseInt(start_x)) & (shape_center_x <= parseInt(end_x)) & (shape_center_y >= parseInt(start_y)) & (shape_center_y <= parseInt(end_y))) {

            const g = shapeCls.el();
            selectEl({ target: { parentElement: g }, ctrlKey: true });
        }
    })



}