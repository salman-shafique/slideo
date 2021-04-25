import React from "react";
import reactToDOM from "Editor/js/utils/reactToDOM";
import Events from "../../Events";
import selectEl from "Editor/js/shapes/actions/drag/utils/selectEl";

const createReplaceIcon = (iconShape) => {
    const replaceIcon = reactToDOM(
        <div className="replace-icon">
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="401.000000pt" height="401.000000pt" viewBox="0 0 401.000000 401.000000" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,401.000000) scale(0.100000,-0.100000)"
                    fill="#000000" stroke="none">
                    <path d="M393 3996 c-181 -44 -334 -202 -372 -384 -15 -72 -15 -882 0 -954 19
                    -92 67 -177 138 -249 72 -71 157 -119 249 -138 72 -15 882 -15 954 0 187 39
                    348 200 387 387 15 72 15 882 0 954 -39 187 -200 348 -387 387 -77 16 -900 13
                    -969 -3z"/>
                    <path d="M2323 3835 c-76 -33 -95 -138 -36 -196 21 -21 53 -36 118 -53 437
                    -118 791 -385 1009 -762 47 -81 120 -240 132 -288 l6 -26 -221 0 c-246 0 -265
                    -4 -301 -63 -25 -41 -25 -83 0 -124 38 -63 37 -63 482 -63 382 0 405 1 435 20
                    63 38 63 37 63 480 0 443 0 442 -63 480 -41 25 -83 25 -124 0 -55 -33 -58 -44
                    -63 -307 l-5 -243 -34 78 c-46 104 -128 247 -198 345 -72 101 -242 279 -348
                    364 -200 161 -454 286 -716 353 -91 23 -94 24 -136 5z"/>
                    <path d="M73 1740 c-63 -38 -63 -37 -63 -482 0 -382 1 -405 20 -435 37 -61
                    108 -79 167 -43 55 33 58 44 63 307 l5 243 34 -78 c46 -104 128 -247 198 -345
                    72 -101 242 -279 348 -364 201 -162 464 -290 731 -358 74 -18 115 -12 154 25
                    34 31 45 67 36 113 -10 54 -52 85 -152 111 -435 117 -794 388 -1008 762 -47
                    82 -120 241 -132 288 l-6 26 223 0 c205 0 227 2 256 20 82 50 82 160 0 210
                    -30 19 -53 20 -437 20 -384 0 -407 -1 -437 -20z"/>
                    <path d="M2643 1746 c-181 -44 -334 -202 -372 -384 -15 -72 -15 -882 0 -954
                    39 -187 200 -348 387 -387 72 -15 882 -15 954 0 187 39 348 200 387 387 15 72
                    15 882 0 954 -39 187 -200 348 -387 387 -77 16 -900 13 -969 -3z"/>
                </g>
            </svg>
        </div>
    );

    replaceIcon.onclick = () => {
        selectEl({ target: { parentElement: iconShape } });
        Events.popup.icon.open({ shapeId: iconShape.getAttribute("shape_id") });
    }

    return replaceIcon;
}

/**
 * 
 * @param {SVGGElement} iconShape 
 */
export default function createForeignObject(iconShape) {
    const foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    foreignObject.setAttribute("x", iconShape.getAttribute("x"));
    foreignObject.setAttribute("y", iconShape.getAttribute("y"));
    foreignObject.setAttribute("width", iconShape.getAttribute("width"));
    foreignObject.setAttribute("height", iconShape.getAttribute("height"));
    foreignObject.setAttribute("class", "bounding_box");

    iconShape.appendChild(foreignObject);

    foreignObject.appendChild(createReplaceIcon(iconShape));
}