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

    const x = constants.SVG_WIDTH() / 12 * 5 + (addedIconCounter % 10) * constants.SVG_WIDTH() / 48;
    const y = constants.SVG_HEIGHT() / 12 * 5 + (addedIconCounter % 10) * constants.SVG_HEIGHT() / 48;
    const width = constants.SVG_WIDTH() / 12;
    const height = constants.SVG_WIDTH() / 12;

    const newShapeData = {
        data: {
            active: "true",
            alt: "newicon",
            height: height,
            rotation: 0,
            width: width,
            x: x,
            y: y
        }
    }
    Object.assign(newShapeData.data, iconData);
    if (!newShapeData.data.shape_id)
        newShapeData.data.shape_id = Math.floor(Math.random() * 1000000) + 1000000;


    const newIconShape = reactToDOM(
        <g xmlns="http://www.w3.org/2000/svg" height={newShapeData.data.height} width={newShapeData.data.width} x={newShapeData.data.x} y={newShapeData.data.y} alt="newicon" className="draggable" shape_id={newShapeData.data.shape_id}>
            <image className="bounding_box" height={newShapeData.data.height} width={newShapeData.data.width} x={newShapeData.data.x} y={newShapeData.data.y} xmlnsXlink="http://www.w3.org/1999/xlink" />
        </g>,
        null,
        "http://www.w3.org/2000/svg"
    );

    const slide_ = slide(session.CURRENT_SLIDE);
    // Insert to page
    slide_.page().appendChild(newIconShape);
    slide_.appendNewShape(newShapeData);

    // Make clickable
    shape(session.CURRENT_SLIDE, newShapeData.data.shape_id).addEvent("click", selectIconElement);

    // Transforms
    initializeG(newIconShape);

    // Select only this element
    deSelectAll();
    selectEl({ target: { parentElement: newIconShape } })

    // Select icon
    selectIcon(session.CURRENT_SLIDE, newShapeData.data.shape_id)

    addedIconCounter++;
}