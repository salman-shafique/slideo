import constants from "Editor/js/constants";

/**
 * @param {SVGGElement} g
 */

export default function getShapeType(g) {
    if (!g) return;

    const alt = g.getAttribute("alt");

    if (g.querySelector("foreignObject") && !alt.includes("icon"))
        return constants.SHAPE_TYPES.TEXTBOX;
    if (alt && alt.includes("icon"))
        return constants.SHAPE_TYPES.ICON;
    if (alt && alt.includes("image"))
        return constants.SHAPE_TYPES.IMAGE;
    return constants.SHAPE_TYPES.AUTO_SHAPE;
}