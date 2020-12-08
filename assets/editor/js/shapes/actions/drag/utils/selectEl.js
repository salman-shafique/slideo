import constants from "Editor/js/constants";
import session from "Editor/js/session";
import checkSelected from "./checkSelected";
import getTransform from "./getTransform";


/**
 * 
 * @param {MouseEvent} event
 */
export default function selectEl(event) {
    /**
     * @type {SVGGElement} g
     */
    let g = event.target.parentElement;
    let shapeId = g.getAttribute("shape_id");

    if (checkSelected(shapeId)) return;

    g.style.outline = "cyan 100px solid";

    let selectedEl = {
        shapeId: shapeId,
        shape: g
    };

    Object.assign(selectedEl,getTransform(g));

    session.SELECTED_ELEMENTS.push(selectedEl);
}