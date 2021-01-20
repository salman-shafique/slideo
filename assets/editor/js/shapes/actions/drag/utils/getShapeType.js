import constants from "Editor/js/constants";

/**
 * @param {SVGGElement} g
 */

export default function getShapeType(g) {
    if (!g) return;
    if (g.querySelector("foreignObject"))
        return constants.SHAPE_TYPES.TEXTBOX;
    const alt = g.getAttribute("alt");
    if (alt && alt.includes("icon"))
        return constants.SHAPE_TYPES.ICON;
    if (alt && alt.includes("image"))
        return constants.SHAPE_TYPES.IMAGE;
    return constants.SHAPE_TYPES.AUTO_SHAPE;
}