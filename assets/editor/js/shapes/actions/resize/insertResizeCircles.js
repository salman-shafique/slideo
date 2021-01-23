import reactToDOM from "Editor/js/utils/reactToDOM";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import slide from "Editor/js/entity/slide";
import React from "react";
import ReactDOM from "react-dom";
import ResizeCirle from "./ResizeCirle";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";

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

    let resizeEls = [];
    resizeEls.push(<line key={"tl"} direction="tl" strokeWidth={"50"} x1={x} y1={y} x2={x + width} y2={y}
        style={{ "stroke": "gray", "strokeWidth": "50" }}
    />);
    resizeEls.push(<line key={"rl"} direction="rl" strokeWidth={"50"} x1={x + width} y1={y} x2={x + width} y2={y + height}
        style={{ "stroke": "gray", "strokeWidth": "50" }}
    />);
    resizeEls.push(<line key={"bl"} direction="bl" strokeWidth={"50"} x1={x + width} y1={y + height} x2={x} y2={y + height}
        style={{ "stroke": "gray", "strokeWidth": "50" }}
    />);
    resizeEls.push(<line key={"ll"} direction="ll" strokeWidth={"50"} x1={x} y1={y + height} x2={x} y2={y}
        style={{ "stroke": "gray", "strokeWidth": "50" }}
    />);

    resizeEls.push(<ResizeCirle g={g} cx={x} cy={y} direction="lt" key={"lt"} />);
    resizeEls.push(<ResizeCirle g={g} cx={x + width} cy={y} direction="rt" key={"rt"} />);
    resizeEls.push(<ResizeCirle g={g} cx={x + width} cy={y + height} direction="rb" key={"rb"} />);
    resizeEls.push(<ResizeCirle g={g} cx={x} cy={y + height} direction="lb" key={"lb"} />);

    const shapeType = getShapeType(g);
    if ([constants.SHAPE_TYPES.TEXTBOX, constants.SHAPE_TYPES.IMAGE].includes(shapeType)) {
        resizeEls.push(<ResizeCirle g={g} cx={x + width / 2} cy={y} direction="t" key={"t"} />);
        resizeEls.push(<ResizeCirle g={g} cx={x + width} cy={y + height / 2} direction="r" key={"r"} />);
        resizeEls.push(<ResizeCirle g={g} cx={x + width / 2} cy={y + height} direction="b" key={"b"} />);
        resizeEls.push(<ResizeCirle g={g} cx={x} cy={y + height / 2} direction="l" key={"l"} />);
    }

    // Line element
    if (g.classList.contains("com.sun.star.drawing.LineShape"))
        resizeEls = resizeEls.slice(0, 4);

    slide(session.CURRENT_SLIDE).slideG().appendChild(resizeCircleContainer);
    ReactDOM.render(resizeEls, resizeCircleContainer);

    return resizeCircleContainer;
}