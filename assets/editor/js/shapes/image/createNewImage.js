import reactToDOM from "Editor/js/utils/reactToDOM";
import insertImageUrl from "./insertImageUrl";
import slide from "Editor/js/entity/slide";
import shape from "Editor/js/entity/shape";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import selectImageElement from "Editor/js/shapes/image/selectImageElement";
import React from "react";
import initializeG from "Editor/js/shapes/actions/drag/utils/initializeG";
import selectEl from "Editor/js/shapes/actions/drag/utils/selectEl";
import deSelectAll from "Editor/js/shapes/actions/drag/utils/deSelectAll";

let addedImageCounter = 0;

export default function createNewImage(imageData) {

    const x = constants.SVG_WIDTH() / 12 * 2 + (addedImageCounter % 5) * constants.SVG_WIDTH() / 48;
    const y = constants.SVG_HEIGHT() / 12 * 2 + (addedImageCounter % 5) * constants.SVG_HEIGHT() / 48;
    const width = constants.SVG_WIDTH() / 12 * 8;
    const height = constants.SVG_HEIGHT() / 12 * 8;

    const newShapeData = {
        data: {
            active: "true",
            alt: "newimage",
            height: height,
            rotation: 0,
            width: width,
            x: x,
            y: y
        }
    }

    Object.assign(newShapeData.data, imageData);
    if (!newShapeData.data.shape_id)
        newShapeData.data.shape_id = Math.floor(Math.random() * 1000000) + 1000000;

    const newImageShape = reactToDOM(
        <g xmlns="http://www.w3.org/2000/svg" height={newShapeData.data.height} width={newShapeData.data.width} x={newShapeData.data.x} y={newShapeData.data.y} alt="newimage" className="draggable" shape_id={newShapeData.data.shape_id}>
            <image className="bounding_box" height={newShapeData.data.height} width={newShapeData.data.width} x={newShapeData.data.x} y={newShapeData.data.y} xmlnsXlink="http://www.w3.org/1999/xlink" />
        </g>,
        null,
        "http://www.w3.org/2000/svg"
    );
    const slide_ = slide(session.CURRENT_SLIDE);
    // Insert to page
    slide_.page().appendChild(newImageShape);
    slide_.appendNewShape(newShapeData);

    // Make clickable
    shape(session.CURRENT_SLIDE, newShapeData.data.shape_id).addEvent("click", selectImageElement);

    // Transforms
    initializeG(newImageShape);

    // Select only this element
    deSelectAll();
    selectEl({ target: { parentElement: newImageShape } })

    // Image url
    insertImageUrl(newImageShape, newShapeData.data.image.url);

    addedImageCounter++;
}