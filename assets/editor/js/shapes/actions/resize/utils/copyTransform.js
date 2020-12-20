import constants from "Editor/js/constants";
import slide from "Editor/js/entity/slide";
import session from "Editor/js/session";

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
        else if (transform.type == constants.TRANSFORM.SCALE)
            targetG.transform.baseVal.appendItem(transform);
        else if (transform.type == constants.TRANSFORM.ROTATE)
            targetG.transform.baseVal.appendItem(transform);
    }
}

/**
 * 
 * @param {SVGGElement} g 
 * @param {number} newScale 
 */
export function resizeCircleContainer(g, newScale) {
    const shapeId = g.getAttribute("shape_id");
    const resizeCircleContainer = slide(session.CURRENT_SLIDE).slideG().querySelector('g[shape_id="' + shapeId + '"][role="resize-circles"]');
    copyTransform(g, resizeCircleContainer);

    resizeCircleContainer.children.forEach(resizeEl => {
        const strokeWidth = resizeEl.getAttribute("stoke-width");
        if (strokeWidth) 
            resizeEl.style.strokeWidth = (parseInt(parseFloat(strokeWidth) / newScale))+"px";
        
        const r = resizeEl.getAttribute("r");
        if (r) 
            resizeEl.style.r = (parseInt(parseFloat(r) / newScale))+"px";
        
    });

}