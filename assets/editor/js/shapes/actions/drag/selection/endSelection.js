
import shape from "Editor/js/entity/shape";
import slide from "Editor/js/entity/slide";
import session from "Editor/js/session";
import getMousePosition from "../utils/getMousePosition";
import selectEl from "../utils/selectEl";
import getTransform from "../utils/getTransform";
import getSelectionRectangleAttributes from "../utils/getSelectionRectangleAttributes.js"
/**
 *
 * @param {MouseEvent} event
 */
export default function endSelection(event) {
    if (session.SELECTION_STATE != "SELECTING"){
        session.SELECTION_STATE = null;
        return;
    }
    let start_x,start_y,end_x,end_y;


    const latestPosition = getMousePosition(event);
    console.log("latestPosition", latestPosition);
    console.log("session.SAVED_SELECTION_MOUSE_POS", session.SAVED_SELECTION_MOUSE_POS);

    let selectionRectangleData = getSelectionRectangleAttributes(event)

    if(selectionRectangleData.start_x < selectionRectangleData.end_x){
        start_x = selectionRectangleData.start_x;
        end_x = selectionRectangleData.end_x;
    }
    else{
        start_x = selectionRectangleData.end_x;
        end_x = selectionRectangleData.start_x;
    }
    if(selectionRectangleData.start_y < selectionRectangleData.end_y){
        start_y = selectionRectangleData.start_y;
        end_y = selectionRectangleData.end_y;
    }
    else{
        start_y = selectionRectangleData.end_y;
        end_y = selectionRectangleData.start_y;
    }


    $('object.main-container')[0].contentDocument.getElementById('selectionRectanglebounding').remove();
    session.SELECTION_STATE = null;
    console.log('******************')
    console.log(start_x, start_y)
    console.log(end_x, end_y)    
    console.log('#######################')
    slide(session.CURRENT_SLIDE).slideData().shapes.forEach(shape_ => {

        let shape_center_x = parseInt(shape_.data.x) + parseInt(shape_.data.width)/2;
        let shape_center_y = parseInt(shape_.data.y) + parseInt(shape_.data.height)/2;
        // console.log(shape_center_x, shape_center_y)
        if( (shape_center_x >= parseInt(start_x)) & (shape_center_x <= parseInt(end_x)) & (shape_center_y >= parseInt(start_y)) & (shape_center_y <= parseInt(end_y)) ){
            const shapeCls = shape(session.CURRENT_SLIDE, shape_.data.shape_id);
            const g = shapeCls.el();


            const allTransforms = getTransform(g);
            // find actual centers

            selectEl({ target: { parentElement: g }, ctrlKey: true });
            console.log(shape_);
        }
    })


    
}