import shape from "Editor/js/entity/shape";
import getTransform from "Editor/js/shapes/actions/drag/utils/getTransform";
import { updateIcon } from "../shapes/icon/selectIcon";
import { updateImage } from "../shapes/image/selectH1Image";
import { updateText } from "../shapes/textbox/index";

/**
 * 
 * @param {{ slideId: string, actionType: number, shapes: { shapeId:{data} } }} dragAction 
 */
export const undoDrag = (dragAction) => {
    Object.keys(dragAction.shapes).forEach((shapeId) => {
        const shapeActionData = dragAction.shapes[shapeId];
        const g = shape(dragAction.slideId, shapeId).el();
        const allTransforms = getTransform(g);
        allTransforms.translate.transform.setTranslate(
            shapeActionData.startingE,
            shapeActionData.startingF
        )
    });
}

/**
 * 
 * @param {{ slideId: string, actionType: number, shapes: { shapeId:{data} } }} dragAction 
 */
export const redoDrag = (dragAction) => {
    Object.keys(dragAction.shapes).forEach((shapeId) => {
        const shapeActionData = dragAction.shapes[shapeId];
        const g = shape(dragAction.slideId, shapeId).el();
        const allTransforms = getTransform(g);
        allTransforms.translate.transform.setTranslate(
            shapeActionData.endingE,
            shapeActionData.endingF
        )
    });
}


/**
 * 
 * @param {{ slideId: string, actionType: number, shapeId: string, oldText: string, newText: string }} textEditAction 
 */
export const undoTextEdit = (textEditAction) => {
    const g = shape(textEditAction.slideId, textEditAction.shapeId).el();
    updateText(g, textEditAction.oldText);
}

/**
 * 
 * @param {{ slideId: string, actionType: number, shapeId: string, oldText: string, newText: string }} textEditAction 
 */
export const redoTextEdit = (textEditAction) => {
    const g = shape(textEditAction.slideId, textEditAction.shapeId).el();
    updateText(g, textEditAction.newText);
}


/**
 * 
 * @param {{ slideId: string, actionType: number, shapes: { shapeId:{data} } }} resizeAction 
 */
export const undoResize = (resizeAction) => {
    Object.keys(resizeAction.shapes).forEach((shapeId) => {
        const shapeActionData = resizeAction.shapes[shapeId];
        const g = shape(resizeAction.slideId, shapeId).el();
        const allTransforms = getTransform(g);
        allTransforms.scale.transform.setScale(
            shapeActionData.startingA,
            shapeActionData.startingA
        );
        allTransforms.translate.transform.setTranslate(
            shapeActionData.startingE,
            shapeActionData.startingF
        );
    });
}

/**
 * 
 * @param {{ slideId: string, actionType: number, shapes: { shapeId:{data} } }} resizeAction 
 */
export const redoResize = (resizeAction) => {
    Object.keys(resizeAction.shapes).forEach((shapeId) => {
        const shapeActionData = resizeAction.shapes[shapeId];
        const g = shape(resizeAction.slideId, shapeId).el();
        const allTransforms = getTransform(g);
        allTransforms.scale.transform.setScale(
            shapeActionData.endingA,
            shapeActionData.endingA
        );
        allTransforms.translate.transform.setTranslate(
            shapeActionData.endingE,
            shapeActionData.endingF
        );
    });
}


/**
 * 
 * @param {{ slideId: string, actionType: number, shapeId: string, oldIcon: object, newIcon: object }} iconChangeAction 
 */
export const undoChangeIcon = (iconChangeAction) => {
    updateIcon(iconChangeAction.slideId, iconChangeAction.shapeId, iconChangeAction.oldIcon);
}

/**
 * 
 * @param {{ slideId: string, actionType: number, shapeId: string, oldIcon: object, newIcon: object }} iconChangeAction 
 */
export const redoChangeIcon = (iconChangeAction) => {
    updateIcon(iconChangeAction.slideId, iconChangeAction.shapeId, iconChangeAction.newIcon);
}

/**
 * 
 * @param {{ slideId: string, actionType: number, shapeId: string, oldImage: object, newImage: object }} imageChangeAction 
 */
export const undoChangeImage = (imageChangeAction) => {
    updateImage(imageChangeAction.slideId, imageChangeAction.shapeId, imageChangeAction.oldImage);
}

/**
 * 
 * @param {{ slideId: string, actionType: number, shapeId: string, oldImage: object, newImage: object }} imageChangeAction 
 */
export const redoChangeImage = (imageChangeAction) => {
    updateImage(imageChangeAction.slideId, imageChangeAction.shapeId, imageChangeAction.newImage);
}

/**
 * 
 * @param {{ slideId: string, actionType: number, shapeIds: []}} deleteShapeAction 
 */
export const undoDeleteShape = (deleteShapeAction) => {
    deleteShapeAction.shapeIds.forEach(shapeId => {
        shape(deleteShapeAction.slideId, shapeId).restore();
    });
}

/**
 * 
 * @param {{ slideId: string, actionType: number, shapeIds: []}} deleteShapeAction 
 */
export const redoDeleteShape = (deleteShapeAction) => {
    deleteShapeAction.shapeIds.forEach(shapeId => {
        shape(deleteShapeAction.slideId, shapeId).remove();
    });
}