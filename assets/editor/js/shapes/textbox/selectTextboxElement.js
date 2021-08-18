import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import session from "Editor/js/session";
import reactToDOM from "Editor/js/utils/reactToDOM";
import getSizeAttributes from "Editor/js/shapes/actions/drag/utils/getSizeAttributes";
import hideResizeCircles from "Editor/js/shapes/actions/resize/hideResizeCircles";

import React from "react";
import Events from "../../Events";

/**
 *
 * @param {HTMLElement} td
 */
export const createTextNode = (td) => {
    const fontScale = 19.5;
    const gParentAttributes = getSizeAttributes(td.closest('g'));
    const tableParent = td.closest("table");
    const tableFont = parseInt(tableParent.style.fontSize, 10);
    const editorWidth = gParentAttributes.width / fontScale;
    const editorHeight = gParentAttributes.height / fontScale;


    const textFontSize = `${1.8 * constants.PIXEL_TO_PT * tableFont}px`;
    // const valign = td.getAttribute("valign");
    td.setAttribute("valign", "top");
    let editing_style = {caretColor: 'black', border: 'none', outline: '3px solid cyan', width: editorWidth, zIndex: "99999", padding: "0 15px"};
    const textDiv = reactToDOM(
        <div style={{
            transform: `scale(${fontScale})`,
            transformOrigin: `top center`,
            fontSize: textFontSize,
            display: 'flex',
            justifyContent: 'center',
            justifySelf: "flex-end",
            alignItems: 'center',
        }}>
        </div>
    );
    const alt = td.closest("g").getAttribute("alt");
    if (alt.includes("h1|") || alt == "slidetitle" || alt == "subtitle" || alt == "newtextbox") {
        editing_style["width"] = editorWidth;
    }
    const editing = reactToDOM(
        <editing contentEditable="true" className="highlighted" style={editing_style}></editing>
    );
    editing.innerText = td.innerText;
    textDiv.appendChild(editing);
    td.innerText = "";
    td.appendChild(textDiv);
    editing.focus();
    editing.onkeydown = (e) => {
        if (e.key == "Shift") return;
        const ltrChars = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF';
        const rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC';
        const isAlpha = new RegExp('^[0-9' + ltrChars + rtlChars + ']{1}$');

        if (isAlpha.test(e.key) || ["Delete", "Backspace"].includes(e.key))
            e.target.innerText = "";
        e.target.onkeydown = null;
        e.target.onmousedown = null;
        e.target.classList.remove("highlighted");
    }
    editing.onmousedown = (e) => {
        e.target.classList.remove("highlighted");
        e.target.onmousedown = null;
        e.target.onkeydown = null;
    }
}
/**
 *
 * @param {Event} event
 */
export default function selectTextboxElement(event) {
    if (event.ctrlKey) return;
    /**
     * @type {SVGGElement} g
     */
    const g = event.target.parentElement;
    if (getShapeType(g) != constants.SHAPE_TYPES.TEXTBOX) return;

    // if (session.SELECTED_ELEMENTS.length != 1) return;
    if (session.SELECTED_ELEMENTS[0].shape != g) return;

    if (!g.classList.contains("text_editing"))
        g.classList.add("text_editing");

    const td = g.querySelector("td");
    createTextNode(td);
    Events.shape.textbox.edit.started({oldText: td.innerText});
    hideResizeCircles(session.SELECTED_ELEMENTS[0].shape)

    session.TEXT_EDITING = true;
    Events.popup.text.open({shapeId: g.getAttribute("shape_id")});
}