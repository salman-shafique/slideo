import session from "Editor/js/session";
import shape from "Editor/js/entity/shape";

/**
 * 
 * @param {Event} event 
 */
export default function selectTextboxElement(event) {
    /**
      * @type {SVGGElement} g
      */
    const g = event.target.parentElement;
    console.log(g);
    if (!g.querySelector("foreignObject")) return;

    const shapeId = g.getAttribute("shape_id");
    const shape_ = shape(session.CURRENT_SLIDE, shapeId);
    const shapeData = shape_.data();

    if (!g.classList.contains("text_editing"))
        g.classList.add("text_editing");

    g.querySelector("td").focus();
}