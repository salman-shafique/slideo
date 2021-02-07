import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import session from "Editor/js/session";
import sidebar from "Editor/js/entity/sidebar";
import reactToDOM from "Editor/js/utils/reactToDOM";
import React from "react";
/**
 * 
 * @param {HTMLElement} td 
 */
export const createTextNode = (td) => {
  const editing = reactToDOM(
    <editing contentEditable className="highlighted"></editing>
  );
  editing.innerText = td.innerText;
  td.innerText = "";
  td.appendChild(editing);
  editing.focus();
  editing.onkeydown = (e) => {
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
  //td.setAttribute("contenteditable", "true");
  // td.focus();
  createTextNode(td);
  session.TEXT_EDITING = true;
  sidebar.open("Text_Tool");
}