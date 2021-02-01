import shape from "Editor/js/entity/shape";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";

/**
 * 
 * @param {SVGGElement} g 
 */
export function getOpacity(g) {
    const data = shape(g).data();

    if (data.shape_opacity != undefined)
        return parseFloat(data.shape_opacity);

    const shapeOpacity = g.getAttribute("shape_opacity");
    if (shapeOpacity && shapeOpacity != "0.0")
        return parseFloat(g.getAttribute("shape_opacity"));

    return 1;
}