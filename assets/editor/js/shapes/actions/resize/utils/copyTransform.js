import constants from "Editor/js/constants";
import slide from "Editor/js/entity/slide";
import session from "Editor/js/session";
import getSizeAttributes from "Editor/js/shapes/actions/drag/utils/getSizeAttributes";
import getClipPath from "Editor/js/shapes/actions/resize/utils/getClipPath";

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
            resizeEl.style.strokeWidth = (parseInt(parseFloat(strokeWidth) / newScale)) + "px";

        const r = resizeEl.getAttribute("r");
        if (r)
            resizeEl.style.r = (parseInt(parseFloat(r) / newScale)) + "px";

    });
}

/**
 * 
 * @param {SVGGElement} g 
 * @param {number} newScale 
 */
export function relocateResizeCircleContainer(g) {
    const shapeId = g.getAttribute("shape_id");
    const resizeCircleContainer = slide(session.CURRENT_SLIDE).slideG().querySelector('g[shape_id="' + shapeId + '"][role="resize-circles"]');

    copyTransform(g, resizeCircleContainer);

    const sizeAttr = getSizeAttributes(g);
    const clipPath = getClipPath(g);

    resizeCircleContainer.children.forEach(resizeEl => {
        switch (resizeEl.getAttribute("direction")) {
            case "tl":
                resizeEl.setAttribute("x1", sizeAttr.x);
                resizeEl.setAttribute("y1", sizeAttr.y + clipPath.rt.startingY * sizeAttr.height / 100);
                resizeEl.setAttribute("x2", sizeAttr.x + sizeAttr.width);
                resizeEl.setAttribute("y2", sizeAttr.y + clipPath.rt.startingY * sizeAttr.height / 100);
                break;
            case "rl":
                resizeEl.setAttribute("x1", sizeAttr.x + sizeAttr.width);
                resizeEl.setAttribute("y1", sizeAttr.y);
                resizeEl.setAttribute("x2", sizeAttr.x + sizeAttr.width);
                resizeEl.setAttribute("y2", sizeAttr.y + sizeAttr.height);
                break;
            case "bl":
                resizeEl.setAttribute("x1", sizeAttr.x + sizeAttr.width);
                resizeEl.setAttribute("y1", sizeAttr.y + sizeAttr.height);
                resizeEl.setAttribute("x2", sizeAttr.x);
                resizeEl.setAttribute("y2", sizeAttr.y + sizeAttr.height);
                break;
            case "ll":
                resizeEl.setAttribute("x1", sizeAttr.x);
                resizeEl.setAttribute("y1", sizeAttr.y + sizeAttr.height);
                resizeEl.setAttribute("x2", sizeAttr.x);
                resizeEl.setAttribute("y2", sizeAttr.y);
                break;
            case "lt":
                resizeEl.setAttribute("cx", sizeAttr.x);
                resizeEl.setAttribute("cy", sizeAttr.y + clipPath.lt.startingY * sizeAttr.height / 100);
                break;
            case "rt":
                resizeEl.setAttribute("cx", sizeAttr.x + sizeAttr.width);
                resizeEl.setAttribute("cy", sizeAttr.y + clipPath.rt.startingY * sizeAttr.height / 100);
                break;
            case "rb":
                resizeEl.setAttribute("cx", sizeAttr.x + sizeAttr.width);
                resizeEl.setAttribute("cy", sizeAttr.y + sizeAttr.height);
                break;
            case "lb":
                resizeEl.setAttribute("cx", sizeAttr.x);
                resizeEl.setAttribute("cy", sizeAttr.y + sizeAttr.height);
                break;
            case "t":
                resizeEl.setAttribute("cx", sizeAttr.x + sizeAttr.width / 2);
                resizeEl.setAttribute("cy", sizeAttr.y + clipPath.lt.startingY * sizeAttr.height / 100);
                break;
            case "r":
                resizeEl.setAttribute("cx", sizeAttr.x + sizeAttr.width);
                resizeEl.setAttribute("cy", sizeAttr.y + sizeAttr.height / 2);
                break;
            case "b":
                resizeEl.setAttribute("cx", sizeAttr.x + sizeAttr.width / 2);
                resizeEl.setAttribute("cy", sizeAttr.y + sizeAttr.height);
                break;
            case "l":
                resizeEl.setAttribute("cx", sizeAttr.x);
                resizeEl.setAttribute("cy", sizeAttr.y + sizeAttr.height / 2);
                break;
            default:
                break;
        }
    });
}