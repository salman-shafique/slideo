import React from "react";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import shape from "Editor/js/entity/shape";
import hexToRgb from "Editor/js/sidebar/colors/hexToRgb";
import updateColor from "Editor/js/shapes/actions/color/updateColor";


export default function SingleColor({ color, setCurrentColor, SHAPE_TYPE }) {
    const selectColor = () => {
        if (session.SELECTED_ELEMENTS.length < 1) return;
        session.SELECTED_ELEMENTS.forEach(selectedEl => {
            const g = selectedEl.shape;
            if (getShapeType(g) == SHAPE_TYPE) {
                const rgb = hexToRgb(color);
                const shapeId = g.getAttribute("shape_id");
                const shape_ = shape(session.CURRENT_SLIDE, shapeId);
                const data = shape_.data();
                if (SHAPE_TYPE == constants.SHAPE_TYPES.TEXTBOX) {
                    if (data.text_theme_color)
                        delete data.text_theme_color;
                    g.removeAttribute("text_theme_color");

                    data.font_color = rgb;
                    shape_.el().querySelector("table").style.color = color;
               
                } else if (SHAPE_TYPE == constants.SHAPE_TYPES.ICON) {
                    if (data.icon_theme_color)
                        delete data.icon_theme_color;
                    g.removeAttribute("icon_theme_color");
                    
                    data.rgb = rgb;
                    const feFlood = g.ownerSVGElement.querySelector("#color_filter_" + shapeId+" feFlood");
                    feFlood.style.floodColor = color;
                }
            }
        });
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