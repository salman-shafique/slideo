import shape from "Editor/js/entity/shape";
import getTransform from "Editor/js/shapes/actions/drag/utils/getTransform";
import { updateIcon } from "../shapes/icon/selectIcon";
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
 * @param {{ slideId: string, actionType: number, shapeId: string, oldIcon: string, newIcon: string }} iconChangeAction 
 */
export const undoChangeIcon = (iconChangeAction) => {
    updateIcon(iconChangeAction.slideId, iconChangeAction.shapeId, iconChangeAction.oldIcon);
}

/**
 * 
 * @param {{ slideId: string, actionType: number, shapeId: string, oldIcon: string, newIcon: string }} iconChangeAction 
 */
export const redoChangeIcon = (iconChangeAction) => {
    updateIcon(iconChangeAction.slideId, iconChangeAction.shapeId, iconChangeAction.newIcon);
}