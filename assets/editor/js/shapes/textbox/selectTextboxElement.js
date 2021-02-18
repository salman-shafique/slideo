import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import session from "Editor/js/session";
import reactToDOM from "Editor/js/utils/reactToDOM";
import React from "react";
/**
 * 
 * @param {HTMLElement} td 
 */
export const createTextNode = (td) => {
  const textDiv = reactToDOM(
    <div xmlns="http://www.w3.org/1999/xhtml" style={{transform: 'scale(20)', transformOrigin: 'top left', width: 'calc(100% / 20)', fontSize: '55px'}}>
    </div>
  );
  const editing = reactToDOM(
    <editing contentEditable="true" className="highlighted" style={{caretColor: 'black', border: 'none', outline: 'none'}}>
    </editing>
  );
  editing.innerText = td.innerText;
  console.log('editing:', editing)
  textDiv.appendChild(editing);
  console.log('td innertext:', td.innerText)
  td.innerText = "";
  td.appendChild(textDiv);
  editing.focus();
  editing.onkeydown = (e) => {
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
  /**
    * @type {SVGGElement} g
    */
  const g = event.target.parentElement;
  if (getShapeType(g) != constants.SHAPE_TYPES.TEXTBOX) return;

  if (session.SELECTED_ELEMENTS.length != 1) return;
  if (session.SELECTED_ELEMENTS[0].shape != g) return;

  if (!g.classList.contains("text_editing"))
    g.classList.add("text_editing");

  const td = g.querySelector("td");
  createTextNode(td);
  session.TEXT_EDITING = true;
}