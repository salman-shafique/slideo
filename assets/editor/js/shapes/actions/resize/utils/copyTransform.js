import constants from "Editor/js/constants";

/**
 * 
 * @param {SVGGElement} sourceG 
 * @param {SVGGElement} targetG 
 */
export default function copyTransform(sourceG, targetG) {
    targetG.transform.baseVal.clear();
    for (let index = 0; index < sourceG.transform.baseVal.length; index++) {
        let transform = sourceG.transform.baseVal.getItem(index);
        if (transform.type == constants.TRANSFORM.TRANSLATE)
            targetG.transform.baseVal.appendItem(transform);
        else if (transform.type == constants.TRANSFORM.ROTATE)
            targetG.transform.baseVal.appendItem(transform);
    }
}