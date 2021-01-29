import React from "react";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import shape from "Editor/js/entity/shape";
import hexToRgb from "Editor/js/sidebar/colors/hexToRgb";


export default function SingleColor({ color, setCurrentColor, SHAPE_TYPE }) {
    const selectColor = () => {
        if (session.SELECTED_ELEMENTS.length < 1) return;
        session.SELECTED_ELEMENTS.forEach(selectedEl => {
            const g = selectedEl.shape;
            if (getShapeType(g) == SHAPE_TYPE) {
                const shape_ = shape(session.CURRENT_SLIDE, g.getAttribute("shape_id"));
                const data = shape_.data();
                if (data.text_theme_color)
                    delete data.text_theme_color;
                g.removeAttribute("text_theme_color");

                const rgb = hexToRgb(color);
                data.font_color = rgb;
                shape_.el().querySelector("table").style.color = color;
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