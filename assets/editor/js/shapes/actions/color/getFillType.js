import constants from "Editor/js/constants";
import session from "Editor/js/session";
import shape from "Editor/js/entity/shape";


/**
 * @param {SVGGElement} g
 */

export default function getFillType(g) {
    if (!g) return null;

    const shape_ = shape(session.CURRENT_SLIDE, g.getAttribute("shape_id"));
    const data = shape_.data();
    if (!data || !data.fill_type) return null;

    const fillType = String(data.fill_type).split("")[0]
    if (["3", "GRADIENT"].includes(fillType))
        return constants.FILL_TYPES.GRADIENT_FILL;
    else if (["1", "SOLID"].includes(fillType))
        return constants.FILL_TYPES.SOLID_FILL;
    return null;

}