import React from "react";
import reactToDOM from "Editor/js/utils/reactToDOM";
import Events from "../../Events";
import selectEl from "Editor/js/shapes/actions/drag/utils/selectEl";

const createIcon = (imageShape) => {
    const icon = reactToDOM(
        <div className="image-icon">
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                width="541.000000pt" height="432.000000pt" viewBox="0 0 541.000000 432.000000"
                preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,432.000000) scale(0.100000,-0.100000)"
                    fill="#000000" stroke="none">
                    <path d="M629 4304 c-66 -20 -137 -72 -176 -128 -37 -54 -42 -73 -15 -60 9 5
                1018 10 2242 12 l2225 2 69 -21 c59 -18 78 -30 131 -82 45 -45 68 -78 83 -120
                l22 -58 0 -1682 c0 -1072 -4 -1695 -10 -1716 -5 -19 -8 -37 -5 -39 7 -7 85 47
                118 82 42 46 75 115 87 187 8 45 10 554 8 1709 l-3 1645 -23 57 c-31 76 -108
                160 -180 195 l-57 28 -2235 2 c-1915 1 -2242 0 -2281 -13z"/>
                    <path d="M270 3926 c-108 -23 -189 -90 -239 -196 l-26 -55 0 -1705 0 -1705 27
                -57 c32 -69 97 -136 163 -169 l50 -24 2265 0 2265 0 50 24 c66 33 131 100 163
                169 l27 57 0 1705 0 1705 -29 60 c-52 105 -141 173 -255 195 -82 15 -4389 12
                -4461 -4z m4443 -258 c12 -6 27 -18 34 -27 10 -12 12 -295 13 -1244 l0 -1229
                -675 810 c-628 754 -678 811 -724 831 -63 27 -109 27 -172 0 -46 -20 -82 -62
                -580 -678 -588 -728 -581 -721 -689 -721 -98 0 -130 28 -376 330 -257 314
                -267 326 -318 352 -61 31 -162 23 -213 -18 -21 -17 -193 -215 -383 -442 -190
                -226 -351 -417 -357 -424 -10 -10 -13 231 -13 1201 l0 1213 29 29 29 29 2187
                0 c1643 0 2192 -3 2208 -12z"/>
                    <path d="M1860 3360 c-267 -48 -430 -314 -350 -573 98 -318 515 -412 743 -168
                187 200 152 519 -74 670 -92 62 -218 90 -319 71z"/>
                </g>
            </svg>
        </div>
    );

    icon.onclick = (event) => {
        if (event.ctrlKey) return;
        selectEl({ target: { parentElement: imageShape } });
        Events.popup.image.open({ shapeId: imageShape.getAttribute("shape_id") });
    }

    return icon;
}

/**
 * 
 * @param {SVGGElement} imageShape 
 */
export default function createForeignObject(imageShape) {
    const foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    foreignObject.setAttribute("x", imageShape.getAttribute("x"));
    foreignObject.setAttribute("y", imageShape.getAttribute("y"));
    foreignObject.setAttribute("width", imageShape.getAttribute("width"));
    foreignObject.setAttribute("height", imageShape.getAttribute("height"));
    foreignObject.setAttribute("class", "bounding_box");

    imageShape.appendChild(foreignObject);

    foreignObject.appendChild(createIcon(imageShape));
}