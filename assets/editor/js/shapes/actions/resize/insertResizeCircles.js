import reactToDOM from "Editor/js/utils/reactToDOM";
import session from "Editor/js/session";
import slide from "Editor/js/entity/slide";
import React from "react";
import ReactDOM from "react-dom";
import ResizeCirle from "./ResizeCirle";

/**
 * 
 * @param {SVGGElement} g 
 */
export default function insertResizeCircles(g) {
    const shapeId = g.getAttribute("shape_id");

    // Insert circles for a time
    const x = parseFloat(g.getAttribute("x"));
    const y = parseFloat(g.getAttribute("y"));
    const width = parseFloat(g.getAttribute("width"));
    const height = parseFloat(g.getAttribute("height"));

    const resizeCircleContainer = reactToDOM(
        <g shape_id={shapeId} style={{ "display": "none" }} role={"resize-circles"}></g>,
        null,
        "http://www.w3.org/2000/svg"
    )

    const topLine = <line x1={x} y1={y} x2={x + width} y2={y}
        style={{ "stroke": "gray", "strokeWidth": "50" }}
    />;
    const rightLine = <line x1={x + width} y1={y} x2={x + width} y2={y + height}
        style={{ "stroke": "gray", "strokeWidth": "50" }}
    />;
    const bottomLine = <line x1={x + width} y1={y + height} x2={x} y2={y + height}
        style={{ "stroke": "gray", "strokeWidth": "50" }}
    />;
    const leftLine = <line x1={x} y1={y + height} x2={x} y2={y}
        style={{ "stroke": "gray", "strokeWidth": "50" }}
    />;

    const lt = <ResizeCirle g={g} cx={x} cy={y} direction="lt" />;
    const t = <ResizeCirle g={g} cx={x + width / 2} cy={y} direction="t" />;
    const rt = <ResizeCirle g={g} cx={x + width} cy={y} direction="rt" />;
    const r = <ResizeCirle g={g} cx={x + width} cy={y + height / 2} direction="r" />;
    const rb = <ResizeCirle g={g} cx={x + width} cy={y + height} direction="rb" />;
    const b = <ResizeCirle g={g} cx={x + width / 2} cy={y + height} direction="b" />;
    const lb = <ResizeCirle g={g} cx={x} cy={y + height} direction="lb" />;
    const l = <ResizeCirle g={g} cx={x} cy={y + height / 2} direction="l" />;

    slide(session.CURRENT_SLIDE).slideG().appendChild(resizeCircleContainer);
    ReactDOM.render(
        <>
            {topLine}
            {rightLine}
            {bottomLine}
            {leftLine}
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