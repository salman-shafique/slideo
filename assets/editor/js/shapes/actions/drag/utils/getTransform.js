import constants from "Editor/js/constants";
import getShapeType from "./getShapeType";
import getClipPath from "Editor/js/shapes/actions/resize/utils/getClipPath";
/**
 * @param {SVGGElement} g
 */

export default function getTransform(g) {
    if (!g) return;

    let allTransforms = {};
    // transforms
    for (let index = 0; index < g.transform.baseVal.length; index++) {
        let transform = g.transform.baseVal.getItem(index);
        if (transform.type == constants.TRANSFORM.TRANSLATE)
            allTransforms.translate = {
                transform: transform,
                startingE: transform.matrix.e,
                startingF: transform.matrix.f,
            };
        else if (transform.type == constants.TRANSFORM.SCALE)
            allTransforms.scale = {
                transform: transform,
                startingA: transform.matrix.a
            };
        else if (transform.type == constants.TRANSFORM.ROTATE)
            allTransforms.rotate = {
                transform: transform
            };
    }
    
    // crop for images
    if (getShapeType(g) == constants.SHAPE_TYPES.IMAGE)
        allTransforms.crop = getClipPath(g)

    return allTransforms;
}