import React from "react";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import shape from "Editor/js/entity/shape";
import hexToRgb from "Editor/js/sidebar/colors/hexToRgb";
import toHex from "Editor/js/sidebar/colors/toHex";
import { getThemeColor } from "Editor/js/sidebar/colors/utils";


export default function SingleColor({ color, setCurrentColor, SHAPE_TYPE, FILL_TYPE, GRADIENT_STOP }) {
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
                    g.querySelector("table").style.color = color;

                } else if (SHAPE_TYPE == constants.SHAPE_TYPES.ICON) {
                    if (data.icon_theme_color)
                        delete data.icon_theme_color;
                    g.removeAttribute("icon_theme_color");

                    data.rgb = rgb;
                    const feFlood = g.ownerSVGElement.querySelector("#color_filter_" + shapeId + " feFlood");
                    feFlood.style.floodColor = color;
                } else if (SHAPE_TYPE == constants.SHAPE_TYPES.AUTO_SHAPE) {
                    if (FILL_TYPE == constants.FILL_TYPES.SOLID_FILL) {
                        if (data.fill_theme_color)
                            delete data.fill_theme_color;
                        g.removeAttribute("fill_theme_color");

                        const path = g.querySelector("path");
                        path.style.fill = color;
                        data.fill_rgb = rgb;

                    } else if (FILL_TYPE == constants.FILL_TYPES.GRADIENT_FILL) {
                        if (GRADIENT_STOP === 0) {
                            if (data.fill_gradient_stop_0)
                                delete data.fill_gradient_stop_0;
                            g.removeAttribute("fill_gradient_stop_0");

                            data.fill_gradient_stop_0_rgb = rgb;
                            const stop0 = g.querySelector('g defs stop[offset="0"]');
                            if (stop0) {
                                stop0.style.color = color;
                                stop0.style.stopColor = color;
                            }
                        } else if (GRADIENT_STOP === 1) {
                            if (data.fill_gradient_stop_1)
                                delete data.fill_gradient_stop_1;
                            g.removeAttribute("fill_gradient_stop_1");

                            data.fill_gradient_stop_1_rgb = rgb;
                            const stop1 = g.querySelector('g defs stop[offset="1"]');
                            if (stop1) {
                                stop1.style.color = color;
                                stop1.style.stopColor = color;
                            }
                        }
                    }
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