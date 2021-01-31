import shape from "Editor/js/entity/shape";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";

/**
 * 
 * @param {SVGGElement} g 
 */
export function getOpacity(g) {
    const shapeId = g.getAttribute("shape_id");
    const shape_ = shape(session.CURRENT_SLIDE, shapeId);
    const data = shape_.data();
    if (data.shape_opacity != undefined)
        return parseFloat(data.shape_opacity);

    if (g.getAttribute("shape_opacity"))
        return parseFloat(g.getAttribute("shape_opacity"));

    return 1;
}