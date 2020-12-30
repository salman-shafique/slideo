import constants from "Editor/js/constants";

/**
 * @param {SVGGElement} g
 */

export default function getSizeAttributes(g) {
    if (g.querySelector("foreignObject"))
        return constants.SHAPE_TYPES.TEXTBOX;
    if (g.querySelector("image.bounding_box"))
        return constants.SHAPE_TYPES.IMAGE;
    return constants.SHAPE_TYPES.AUTO_SHAPE;
}