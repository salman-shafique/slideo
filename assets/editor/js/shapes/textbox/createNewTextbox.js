import reactToDOM from "Editor/js/utils/reactToDOM";
import React from "react";
import slide from "Editor/js/entity/slide";
import shape from "Editor/js/entity/shape";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import initializeG from "Editor/js/shapes/actions/drag/utils/initializeG";
import selectEl from "Editor/js/shapes/actions/drag/utils/selectEl";
import deSelectAll from "Editor/js/shapes/actions/drag/utils/deSelectAll";
import createForeignObject from "Editor/js/shapes/textbox/createForeignObject";
import arrangeForeignObject from "Editor/js/shapes/textbox/arrangeForeignObject";


let addedTextboxCounter = {
    XL: 0,
    L: 0,
    MD: 0,
    SM: 0
};

/**
 * 
 * @param {{ 
 *  xGrid : number,
 *  yGrid : number,
 *  heightGrid : number,
 *  widthGrid : number,
 *  fontSize : number,
 *  fontWeight : number,
 *  text : String ,
 *  size : "XL" | "L" | "MD" | "SM"
 * }} textboxData 
 */
export default function createNewTextbox(textboxData) {

    const x = constants.SVG_WIDTH() / 12 * textboxData.xGrid + (addedTextboxCounter[textboxData.size] % 5) * constants.SVG_WIDTH() / 48;
    const y = constants.SVG_HEIGHT() / 12 * textboxData.yGrid + (addedTextboxCounter[textboxData.size] % 5) * constants.SVG_HEIGHT() / 48;
    const width = constants.SVG_WIDTH() / 12 * textboxData.widthGrid;
    const height = constants.SVG_HEIGHT() / 12 * textboxData.heightGrid;

    const newShapeData = {
        data: {
            "x": x,
            "y": y,
            "width": width,
            "height": height,
            "alt": "newtextbox",
            "class": "draggable",
            "active": "true",
            "italic": "False",
            "rotation": "0",
            "alignment": "2",
            "underline": "False",
            "word_wrap": "False",
            "font_color": "0 0 0",
            "shape_type": "TEXT_BOX (17)",
            "font_family": "Arial, sans-serif",
            "vertical_anchor": "1",
            "margin_top_ratio": "0.006666666666666667",
            "text_theme_color": "0",
            "margin_left_ratio": "0.0075",
            "margin_right_ratio": "0.0075",
            "margin_bottom_ratio": "0.006666666666666667",
            "direction": "rtl",
            "sizeRatio": 1,
        }
    }
    Object.assign(newShapeData.data, textboxData);

    if (!newShapeData.data.shape_id)
        newShapeData.data.shape_id = Math.floor(Math.random() * 1000000) + 1000000;

    const newTextboxShape = reactToDOM(
        <g xmlns="http://www.w3.org/2000/svg" height={newShapeData.data.height} width={newShapeData.data.width} x={newShapeData.data.x} y={newShapeData.data.y} alt="newtextbox" className="draggable" shape_id={newShapeData.data.shape_id}>
        </g>,
        null,
        "http://www.w3.org/2000/svg"
    );

    const slide_ = slide(session.CURRENT_SLIDE);
    const foreignObject = createForeignObject(slide_.contentDocument(), { x: newShapeData.data.x, y: newShapeData.data.y, width: newShapeData.data.width, height: newShapeData.data.height });
    arrangeForeignObject(foreignObject, newShapeData.data, textboxData.text, "rtl");
    newTextboxShape.appendChild(foreignObject);

    // Insert to page
    slide_.page().appendChild(newTextboxShape);
    slide_.appendNewShape(newShapeData);

    // Transforms
    initializeG(newTextboxShape);

    // Select only this element
    deSelectAll();
    selectEl({ target: { parentElement: newTextboxShape } })

    addedTextboxCounter[textboxData.size]++;
}