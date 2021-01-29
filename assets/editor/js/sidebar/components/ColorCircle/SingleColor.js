import React from "react";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import shape from "Editor/js/entity/shape";


export default function SingleColor({ color, setCurrentColor }) {
    const selectColor = () => {
        setCurrentColor(color);
    }
    return (
        <div
            onClick={selectColor}
            className="color-circle-single"
            style={{
                backgroundColor: color,
                border: (color == "#ffffff") ? "solid lightgray 1px" : "none"
            }}></div>
    )
}