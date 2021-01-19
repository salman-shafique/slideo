import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import session from "Editor/js/session";


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
  td.setAttribute("contenteditable", "true");
  td.focus();
  session.TEXT_EDITING = true;
}