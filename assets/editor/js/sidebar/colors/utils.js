
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
    return colorTemplate(session.CURRENT_SLIDE).getColor(colorName);
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


const updateColorTemplate = (newColor) => {

    const activeCircle = document.querySelector("#Colors_Panel .main-section .color.active");
    activeCircle.setAttribute("data-color", newColor);
    activeCircle.style.backgroundColor = newColor;

    const colorName = activeCircle.getAttribute("color-name");
    let tmp = {};
    tmp[colorName] = newColor;
    colorTemplate(session.CURRENT_SLIDE).changeColors(tmp);
}


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



const setThemeColor = (g, attrName, newThemeColorName) => {
    g.setAttribute(attrName, newThemeColorName);
    const shape_ = shape(session.CURRENT_SLIDE, g.getAttribute("shape_id"));
    shape_.data()[attrName] = newThemeColorName;
}
/**
 * 
 * @param {SVGGElement} g 
 */
const setThemeColorNameOfShape = (g, newThemeColorName) => {
    const shapeType = getShapeType(g);
    validColorAttributes.forEach(attrName => {
        if (g.hasAttribute(attrName)) {
            setThemeColor(g, attrName, newThemeColorName);
        } else if (attrName == "icon_theme_color") {
            if (shapeType == constants.SHAPE_TYPES.ICON)
                setThemeColor(g, attrName, newThemeColorName);
        } else if (attrName == "text_theme_color") {
            if (shapeType == constants.SHAPE_TYPES.TEXTBOX)
                setThemeColor(g, attrName, newThemeColorName);
        }
    });
    colorTemplate(session.CURRENT_SLIDE).changeColors();
}

/**
 * 
 * @param {String} newThemeColorName like ACCENT_1
 */
const changeThemeColorOfShapes = (newThemeColorName) => {
    if (session.SELECTED_ELEMENTS.length > 0)
        session.SELECTED_ELEMENTS.forEach(selectedEl => {
            const g = selectedEl.shape;
            setThemeColorNameOfShape(g, newThemeColorName);
        });
}

export {
    themeColorNames,
    validColorAttributes,
    updateColorTemplate,
    setThemeColorNameOfShape,
    getThemeColorNameOfShape,
    getThemeColor,
    changeThemeColorOfShapes
}