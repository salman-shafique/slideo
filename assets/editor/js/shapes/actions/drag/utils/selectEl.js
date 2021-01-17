import session from "Editor/js/session";
import checkSelected from "./checkSelected";
import getTransform from "./getTransform";
import Events from "Editor/js/Events";
import getSizeAttributes from "./getSizeAttributes";
import getShapeType from "./getShapeType";
import deSelectAll from "./deSelectAll";

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

    let selectedEl = {
        shapeId: shapeId,
        shape: g,
        size: getSizeAttributes(g),
        shapeType: getShapeType(g)
    };

    Object.assign(selectedEl, getTransform(g));
    session.SELECTED_ELEMENTS.push(selectedEl);

    if (event.ctrlKey) {
    } else {
        deSelectAll(shapeId)
    }
    // Trigger selection event
    Events.shape.selected({ 'shape': g });

}