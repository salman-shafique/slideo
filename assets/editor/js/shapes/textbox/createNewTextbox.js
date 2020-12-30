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
import selectTextboxElement from "Editor/js/shapes/textbox/selectTextboxElement";

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
    if (!session.CURRENT_SLIDE) return;

    const x = constants.SVG_WIDTH() / 12 * textboxData.xGrid + (addedTextboxCounter[textboxData.size] % 5) * constants.SVG_WIDTH() / 48;
    const y = constants.SVG_HEIGHT() / 12 * textboxData.yGrid + (addedTextboxCounter[textboxData.size] % 5) * constants.SVG_HEIGHT() / 48;
    const width = constants.SVG_WIDTH() / 12 * textboxData.widthGrid;
    const height = constants.SVG_HEIGHT() / 12 * textboxData.heightGrid;

    const shapeId = Math.floor(Math.random() * 1000000) + 1000000;

    const newTextboxShape = reactToDOM(
        <g xmlns="http://www.w3.org/2000/svg" height={height} width={width} x={x} y={y} alt="newtextbox" className="draggable" shape_id={shapeId}>
        </g>,
        null,
        "http://www.w3.org/2000/svg"
    );

    const slide_ = slide(session.CURRENT_SLIDE);
    const foreignObject = createForeignObject(slide_.contentDocument(), { x: x, y: y, width: width, height: height });

    const newShapeData = {
        data: {
            "x": x,
            "y": y,
            "width": width,
            "height": height,
            "shape_id": shapeId,
            "font_size": textboxData.fontSize,
            "text": textboxData.text,
            "font_weight": textboxData.fontWeight,
            "alt": "newtextbox",
            "class": "draggable",
            "active": true,
            "italic": "False",
            "rotation": "0",
            "alignment": "2",
            "underline": "False",
            "word_wrap": "False",
            "font_color": "0 0 0",
            "shape_type": "TEXT_BOX (17)",
            "font_family": "Arial, sans-serif",
            "vertical_anchor": "1",
            "margin_top_ratio": 0.006666666666666667,
            "text_theme_color": 6,
            "margin_left_ratio": 0.0075,
            "margin_right_ratio": 0.0075,
            "margin_bottom_ratio": 0.006666666666666667,
            "direction": "rtl",
            "sizeRatio": 1,
        }
    }
    arrangeForeignObject(foreignObject, newShapeData.data, textboxData.text, "rtl");

    newTextboxShape.appendChild(foreignObject);

    // Insert to page
    slide_.page().appendChild(newTextboxShape);
    slide_.slideData().shapes.push(newShapeData);

    // Make clickable
    shape(session.CURRENT_SLIDE, shapeId).addEvent("dblclick", selectTextboxElement);

    // Transforms
    initializeG(newTextboxShape);

    // Select only this element
    deSelectAll();
    selectEl({ target: { parentElement: newTextboxShape } })

    addedTextboxCounter[textboxData.size]++;
}