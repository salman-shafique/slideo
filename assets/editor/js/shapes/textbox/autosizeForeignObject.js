import constants from "Editor/js/constants";
import getTransform from "Editor/js/shapes/actions/drag/utils/getTransform";
import reactToDOM from "Editor/js/utils/reactToDOM";
import React from "react";


/**
 * 
 * @param {SVGForeignObjectElement} foreignObject 
 */
export default function autosizeForeignObject(foreignObject) {
    console.log("AUTOSIZE", foreignObject);
    const table = foreignObject.querySelector("table");

    const tableScreenHeight = table.getBoundingClientRect().height;
    const svgScreenHeight = foreignObject.ownerSVGElement.getBoundingClientRect().height;

    let newHeight = (tableScreenHeight / svgScreenHeight) * constants.SVG_HEIGHT(foreignObject.ownerSVGElement);

    const g = foreignObject.parentElement;
    if (g) {
        const scale = getTransform(g).scale.transform.matrix.a;
        newHeight /= scale;
    }

    const textSpan = reactToDOM(
        <span style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
        </span>
    );

    const td = table.querySelector("tr").querySelector("td")
    td.appendChild(textSpan);
    textSpan.innerText = td.innerText
    newHeight = textSpan.offsetHeight
    const rowHeight = parseInt(table.querySelector("tr").style.height)

    if(parseInt(newHeight) < rowHeight + 1000){
        newHeight = rowHeight
    }

    td.removeChild(td.childNodes[1])

    foreignObject.setAttribute("height", newHeight);
    foreignObject.parentElement.setAttribute("height", newHeight);

    console.log("NEW HEIGHT", foreignObject);
}