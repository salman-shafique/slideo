import constants from "Editor/js/constants";
import getTransform from "Editor/js/shapes/actions/drag/utils/getTransform";

/**
 * 
 * @param {SVGForeignObjectElement} foreignObject 
 */
export default function autosizeForeignObject(foreignObject) {
    const table = foreignObject.querySelector("table");

    const tableScreenHeight = table.getBoundingClientRect().height;
    const svgScreenHeight = foreignObject.ownerSVGElement.getBoundingClientRect().height;

    let newHeight = (tableScreenHeight / svgScreenHeight) * constants.SVG_HEIGHT(foreignObject.ownerSVGElement);

    const g = foreignObject.parentElement;
    if (g) {
        const scale = getTransform(g).scale.transform.matrix.a;
        newHeight /= scale;
    }

    foreignObject.setAttribute("height", newHeight);
    foreignObject.parentElement.setAttribute("height", newHeight);
}