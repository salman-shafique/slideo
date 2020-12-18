import session from "Editor/js/session";
import slide from "Editor/js/entity/slide";
import insertResizeCircles from "./insertResizeCircles";
import copyTransform from "./utils/copyTransform";

/**
 * 
 * @param {SVGGElement} g 
 */
export default function showResizeCircles(g) {
    const shapeId = g.getAttribute("shape_id");
    let resizeCircleContainer = slide(session.CURRENT_SLIDE).slideG().querySelector('g[shape_id="' + shapeId + '"][role="resize-circles"]');
    if (!resizeCircleContainer) resizeCircleContainer = insertResizeCircles(g);
    copyTransform(g, resizeCircleContainer);
    resizeCircleContainer.style.display = "";
}