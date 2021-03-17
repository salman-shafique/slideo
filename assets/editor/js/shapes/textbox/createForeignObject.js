import reactToDOM from "Editor/js/utils/reactToDOM";
import React from "react";
import deSelectAll from "Editor/js/shapes/actions/drag/utils/deSelectAll";
import selectTextboxElement from "Editor/js/shapes/textbox/selectTextboxElement";
import selectEl from "Editor/js/shapes/actions/drag/utils/selectEl";

export default function createForeignObject(svg, positionObj = { x: 2000, y: 2000, width: 2000, height: 2000 }) {
    // Generate the foreign object
    const foreignObject = svg.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    foreignObject.setAttribute("x", positionObj.x);
    foreignObject.setAttribute("y", positionObj.y);
    foreignObject.setAttribute("width", positionObj.width);
    foreignObject.setAttribute("height", positionObj.height);
    foreignObject.setAttribute("class", "bounding_box");

    // Clone the template
    const contentTemplate = reactToDOM(
        <table style={{ "width": "100%" }}>
            <tbody style={{ "padding": "0" }}>
                <tr style={{ "padding": "0" }}>
                    <td style={{ "padding": "0", "lineHeight": "1.23" }}>
                    </td>
                </tr>
            </tbody>
        </table>
    );
    const td = contentTemplate.querySelector("td");
    td.onkeyup = (event) => {
        if (event.key == 'Enter') {
            deSelectAll();
        }
    }

    foreignObject.appendChild(contentTemplate);

    const editIcon = reactToDOM(
        <div className="edit-textbox-icon">
            <span className="edit-textbox-icon-inner-wrapper">
                ✎
            </span>
        </div>
    )
    editIcon.onclick = ()=>{
        const g = editIcon.parentElement.parentElement
        selectEl({ target: { parentElement: g } });
        selectTextboxElement({ target: { parentElement: g } });
    }
    foreignObject.appendChild(editIcon)

    return foreignObject;
}