import reactToDOM from "Editor/js/utils/reactToDOM";
import slide from "Editor/js/entity/slide";
import session from "Editor/js/session";
import React from "react";
import initializeG from "Editor/js/shapes/actions/drag/utils/initializeG";

export default function createSelectionRectangle(selectionRectangleData, slideId = session.CURRENT_SLIDE) {
    const x = selectionRectangleData.start_x;
    const y = selectionRectangleData.start_y;

    let width = selectionRectangleData.width;
    let height = selectionRectangleData.height;

    const newSelectionRectangleShape = reactToDOM(
        <g xmlns="http://www.w3.org/2000/svg" height={height} width={width} x={x} y={y} className="selectionRectangle" id='selectionRectanglebounding'>
            <rect className="bounding_box" height={height} width={width} x={x} y={y} opacity='0.5' xmlnsXlink="http://www.w3.org/1999/xlink" id='selectionRectangle' />
        </g>,
        null,
        "http://www.w3.org/2000/svg"
    );
    const slide_ = slide(slideId);
    // Insert to page
    slide_.page().appendChild(newSelectionRectangleShape);
    // slide_.appendNewShape(newShapeData);

    // Transforms
    // initializeG(newSelectionRectangleShape);

}