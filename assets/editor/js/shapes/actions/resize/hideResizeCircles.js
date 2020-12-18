import slide from "Editor/js/entity/slide";
import session from "Editor/js/session";

/**
 * 
 * @param {SVGGElement} g 
 */
export default function hideResizeCircles(g) {
    const shapeId = g.getAttribute("shape_id");
    const resizeCircleContainer = slide(session.CURRENT_SLIDE).slideG().querySelector('g[shape_id="' + shapeId + '"][role="resize-circles"]');
    if (resizeCircleContainer) resizeCircleContainer.style.display = "none";
}