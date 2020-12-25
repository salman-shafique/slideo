import session from "./session";


/**
 * 
 * @param {?SVGSVGElement} svg 
 */
const getViewBox = (svg) => {
    if (svg) {
        const viewBox = svg.getAttribute("viewBox").split(" ");
        return {
            width: parseInt(viewBox[2]),
            height: parseInt(viewBox[3])
        }
    }

    if (!session.CURRENT_SLIDE) return {
        width: 25400,
        height: 14288
    };
    /**
     * @type {HTMLObjectElement} object
     */
    const object = document.getElementById(session.CURRENT_SLIDE);
    const viewBox = object.contentDocument.querySelector("svg").getAttribute("viewBox").split(" ");
    return {
        width: parseInt(viewBox[2]),
        height: parseInt(viewBox[3])
    }
}
const constants = {
    /**
     * 
     * @param {?SVGSVGElement} svg 
     */
    SVG_WIDTH: (svg = null) => {
        return getViewBox(svg)['width']
    },
    /**
     * 
     * @param {?SVGSVGElement} svg 
     */
    SVG_HEIGHT: (svg = null) => {
        return getViewBox(svg)['height']
    },
    ALIGNMENTS: {
        "1": 'left',
        "2": 'center',
        "3": 'right',
        "4": 'justify'
    },
    GOLDEN_RATIO: (1 + Math.sqrt(5)) / 2,
    IS_CHROME: /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
    TRANSFORM: {
        TRANSLATE: 2,
        SCALE: 3,
        ROTATE: 4
    },
    TRIGONOMETRY_AREAS: {
        FIRST: 1,
        SECOND: 2,
        THIRD: 3,
        FOURTH: 4
    },
    SHAPE_TYPES: {
        TEXTBOX: 0,
        IMAGE: 1,
        AUTO_SHAPE: 2
    },
    MAX_SLIDE_CAPACITY: 8,
}


export default constants 