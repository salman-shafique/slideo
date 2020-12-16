import constants from "Editor/js/constants";
import reactToDOM from "Editor/js/utils/reactToDOM";
import session from "Editor/js/session";
import shape from "Editor/js/entity/shape";
import slide from "Editor/js/entity/slide";
import React from "react";
import ReactDOM from "react-dom";
import ResizeCirle from "./ResizeCirle";


/**
 * 
 * @param {SVGGElement} g 
 */
export function insertResizeCircles(g) {
    const shapeId = g.getAttribute("shape_id");

    // Insert circles for a time
    const x = parseFloat(g.getAttribute("x"));
    const y = parseFloat(g.getAttribute("y"));
    const width = parseFloat(g.getAttribute("width"));
    const height = parseFloat(g.getAttribute("height"));

    const lt = <ResizeCirle g={g} cx={x} cy={y} direction="lt" />;
    const t = <ResizeCirle g={g} cx={x + width / 2} cy={y} direction="t" />;
    const rt = <ResizeCirle g={g} cx={x + width} cy={y} direction="rt" />;
    const r = <ResizeCirle g={g} cx={x + width} cy={y + height / 2} direction="r" />;
    const rb = <ResizeCirle g={g} cx={x + width} cy={y + height} direction="rb" />;
    const b = <ResizeCirle g={g} cx={x + width / 2} cy={y + height} direction="b" />;
    const lb = <ResizeCirle g={g} cx={x} cy={y + height} direction="lb" />;
    const l = <ResizeCirle g={g} cx={x} cy={y + height / 2} direction="l" />;

    const resizeCircleContainer = reactToDOM(
        <g shape_id={shapeId} style={{ "display": "none" }} role={"resize-circles"}></g>,
        null,
        "http://www.w3.org/2000/svg"
    )
    slide(session.CURRENT_SLIDE).slideG().appendChild(resizeCircleContainer);
    ReactDOM.render(
        <>
            {lt}
            {t}
            {rt}
            {r}
            {rb}
            {b}
            {lb}
            {l}
        </>, resizeCircleContainer
    );
    return resizeCircleContainer;

}
export function hideResizeCircles(shapeId) {
    const resizeCircleContainer = slide(session.CURRENT_SLIDE).slideG().querySelector('g[shape_id="' + shapeId + '"][role="resize-circles"]');
    if (resizeCircleContainer) resizeCircleContainer.style.display = "none";
}
export function showResizeCircles(g) {
    const shapeId = g.getAttribute("shape_id");
    let resizeCircleContainer = slide(session.CURRENT_SLIDE).slideG().querySelector('g[shape_id="' + shapeId + '"][role="resize-circles"]');
    if (!resizeCircleContainer) resizeCircleContainer = insertResizeCircles(g);
    resizeCircleContainer.style.display = "";
}
