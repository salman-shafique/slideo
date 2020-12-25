import constants from "Editor/js/constants";
import getTransform from "Editor/js/shapes/actions/drag/utils/getTransform";


/**
 * 
 * @param {SVGForeignObjectElement} foreignObject 
 * @param {Object} shape 
 */
export default function autosizeForeignObject(foreignObject, shape) {

    const table = foreignObject.querySelector("table");

    const tableScreenHeight = table.getBoundingClientRect().height;
    const svgScreenHeight = foreignObject.ownerSVGElement.getBoundingClientRect().height;

    const newHeight = (tableScreenHeight / svgScreenHeight) * constants.SVG_HEIGHT(foreignObject.ownerSVGElement);

    foreignObject.setAttribute("height", newHeight);
    foreignObject.parentElement.setAttribute("height", newHeight);
}