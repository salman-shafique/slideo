import constants from "Editor/js/constants";
import getTransform from "Editor/js/shapes/actions/drag/utils/getTransform";
import shape from "Editor/js/entity/shape";
import reduceFontSize from "./reduceFontSize";
import session from "Editor/js/session";

/**
 * 
 * @param {SVGForeignObjectElement} foreignObject 
 */
export default function autosizeForeignObject(foreignObject) {

    // If not auto sized make it
    const g = foreignObject.parentElement;
    if (g) {
        const shapeId = g.getAttribute("shape_id");
        const shape_ = shape(session.CURRENT_SLIDE, shapeId);
        const shapeData = shape_.data();
        if (!shapeData.font_size_optimized) {
            shapeData.font_size = reduceFontSize(foreignObject);
            shapeData.font_size_optimized = "true";
            return;
        }
    }

    const table = foreignObject.querySelector("table");

    const tableScreenHeight = table.getBoundingClientRect().height;
    const svgScreenHeight = foreignObject.ownerSVGElement.getBoundingClientRect().height;

    let newHeight = (tableScreenHeight / svgScreenHeight) * constants.SVG_HEIGHT(foreignObject.ownerSVGElement);

    if (g) {
        const scale = getTransform(g).scale.transform.matrix.a;
        newHeight /= scale;
    }

    foreignObject.setAttribute("height", newHeight);
    foreignObject.parentElement.setAttribute("height", newHeight);
}