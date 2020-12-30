import reactToDOM from "Editor/js/utils/reactToDOM";
import slide from "Editor/js/entity/slide";
import shape from "Editor/js/entity/shape";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import selectIconElement from "Editor/js/shapes/icon/selectIconElement";
import selectIcon from "./selectIcon";
import React from "react";
import initializeG from "Editor/js/shapes/actions/drag/utils/initializeG";
import selectEl from "Editor/js/shapes/actions/drag/utils/selectEl";
import deSelectAll from "Editor/js/shapes/actions/drag/utils/deSelectAll";

let addedIconCounter = 0;

export default function createNewIcon(iconData) {
    if (!session.CURRENT_SLIDE) return;
    const shapeId = Math.floor(Math.random() * 1000000) + 1000000;

    const x = constants.SVG_WIDTH() / 12 * 5 + (addedIconCounter % 10) * constants.SVG_WIDTH() / 48;
    const y = constants.SVG_HEIGHT() / 12 * 5 + (addedIconCounter % 10) * constants.SVG_HEIGHT() / 48;
    const width = constants.SVG_WIDTH() / 12;
    const height = constants.SVG_WIDTH() / 12;

    const newIconShape = reactToDOM(
        <g xmlns="http://www.w3.org/2000/svg" height={height} width={width} x={x} y={y} alt="newicon" className="draggable" shape_id={shapeId}>
            <image className="bounding_box" height={height} width={width} x={x} y={y} xmlnsXlink="http://www.w3.org/1999/xlink" />
        </g>,
        null,
        "http://www.w3.org/2000/svg"
    );

    const newShapeData = {
        data: {
            shape_id: shapeId,
            active: true,
            alt: "newicon",
            height: height,
            icon: iconData,
            keyword: iconData.keyword,
            rotation: 0,
            shape_id: shapeId,
            width: width,
            x: x,
            y: y
        }
    }

    const slide_ = slide(session.CURRENT_SLIDE);
    // Insert to page
    slide_.page().appendChild(newIconShape);
    slide_.slideData().shapes.push(newShapeData);

    // Make clickable
    shape(session.CURRENT_SLIDE, shapeId).addEvent("click", selectIconElement);

    // Transforms
    initializeG(newIconShape);

    // Select only this element
    deSelectAll();
    selectEl({ target: { parentElement: newIconShape } })

    // Select icon
    selectIcon(session.CURRENT_SLIDE, shapeId)

    addedIconCounter++;
}