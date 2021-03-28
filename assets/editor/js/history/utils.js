import shape from "Editor/js/entity/shape";
import getTransform from "Editor/js/shapes/actions/drag/utils/getTransform";

/**
 * 
 * @param {{ slideId: string, actionType: number, shapes: { shapeId:{data} } }} action 
 */
export const undoDrag = (action) => {
    Object.keys(action.shapes).forEach((shapeId) => {
        const shapeActionData = action.shapes[shapeId];
        const g = shape(action.slideId, shapeId).el();
        const allTransforms = getTransform(g);
        allTransforms.translate.transform.setTranslate(
            shapeActionData.startingE,
            shapeActionData.startingF
        )
    });
}

/**
 * 
 * @param {{ slideId: string, actionType: number, shapes: { shapeId:{data} } }} action 
 */
export const redoDrag = (action) => {
    Object.keys(action.shapes).forEach((shapeId) => {
        const shapeActionData = action.shapes[shapeId];
        const g = shape(action.slideId, shapeId).el();
        const allTransforms = getTransform(g);
        allTransforms.translate.transform.setTranslate(
            shapeActionData.endingE,
            shapeActionData.endingF
        )
    });
}