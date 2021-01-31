
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import colorTemplate from "Editor/js/entity/colorTemplate";
import shape from "Editor/js/entity/shape";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";

/**
 * 
 * @param {String} colorName like ACCENT_1
 */
const getThemeColor = (colorName) => {
    if (!colorName) return null;
    return colorTemplate(session.CURRENT_SLIDE).getColor(String(colorName).split(" ")[0]);
}

const themeColorNames = [
    "ACCENT_1",
    "ACCENT_2",
    "ACCENT_3",
    "ACCENT_4",
    "ACCENT_5",
    "ACCENT_6",
    "BACKGROUND_1",
    "BACKGROUND_2",
    "TEXT_1",
    "TEXT_2",
]

const validColorAttributes = [
    "fill_theme_color",
    "fill_gradient_stop_0",
    "fill_gradient_stop_1",
    "text_theme_color",
    "icon_theme_color"
];


/**
 * 
 * @param {SVGGElement} g 
 */
const getThemeColorNameOfShape = (g) => {

    for (let index = 0; index < validColorAttributes.length; index++) {
        const attributeName = validColorAttributes[index];
        const attr = g.getAttribute(attributeName);
        if (attr) {
            const themeColorName = attr.split(" ")[0];
            if (themeColorNames.includes(attr.split(" ")[0]))
                return { attributeName: attributeName, themeColorName: themeColorName }

        }
    }

    return null;
}


export {
    themeColorNames,
    validColorAttributes,
    getThemeColorNameOfShape,
    getThemeColor,
}