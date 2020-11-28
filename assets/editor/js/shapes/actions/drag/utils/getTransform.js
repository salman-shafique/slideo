import constants from "Editor/js/constants";
/**
 * @param {SVGGElement} g
 */

export default function getTransform(g) {
    let allTransforms = {};
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
                transform: transform
            };
        else if (transform.type == constants.TRANSFORM.ROTATE)
            allTransforms.rotate = {
                transform: transform
            };
    }
    return allTransforms;
}