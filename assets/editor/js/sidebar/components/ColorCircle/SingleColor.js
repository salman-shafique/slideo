import React from "react";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import shape from "Editor/js/entity/shape";
import slide from "Editor/js/entity/slide";
import hexToRgb from "Editor/js/sidebar/colors/hexToRgb";
import toHex from "Editor/js/sidebar/colors/toHex";
import { getThemeColor } from "Editor/js/sidebar/colors/utils";



export default function SingleColor({ color, setCurrentColor, SHAPE_TYPE, FILL_TYPE, GRADIENT_STOP, BACKGROUND }) {
    const selectColor = () => {
        setCurrentColor(color);
        const rgb = hexToRgb(color);

        if (BACKGROUND) {
            const tmpCurrentSlide = session.CURRENT_SLIDE;
            session.PRESENTATION.slides.forEach(aSlide => {
                const slide_ = slide(aSlide.slideId);
                slide_.display();
                const slideData = slide_.slideData();
                const background = slideData.background.data;
                const documentElement = slide_.documentElement();
                const g = documentElement.querySelector("g.SlideGroup g.Page g.Background");
                // Handle if not g!
                if (background.type == "solidFill") {
                    // fill_theme_color
                    let path = g.querySelector("path");
                    if (path)
                        path.style.fill = color;
                    background.color = color.replace(/\#/g, "");
                } else if (background.type == "gradFill") {
                    for (let i = 0; i < 2; i++) {
                        if (GRADIENT_STOP === i) {
                            let stop_ = g.querySelector(`g defs stop[offset="${i}"]`);
                            if (stop_) {
                                stop_.style.color = color;
                                stop_.style.stopColor = color;
                            }
                            background.stops[i].color = color.replace(/\#/g, "");
                            break;
                        }
                    }
                }
                slide_.cloneToMiniPrev(true);
            });
            slide(tmpCurrentSlide).display();
            return;
        }
        if (session.SELECTED_ELEMENTS.length < 1) return;
        session.SELECTED_ELEMENTS.forEach(selectedEl => {
            const g = selectedEl.shape;
            const shapeType = getShapeType(g);
            const shapeId = g.getAttribute("shape_id");
            const shape_ = shape(session.CURRENT_SLIDE, shapeId);
            const data = shape_.data();
            if (shapeType == constants.SHAPE_TYPES.TEXTBOX) {
                // if (data.text_theme_color)
                //     delete data.text_theme_color;
                // g.removeAttribute("text_theme_color");

                data.font_color = rgb;
                g.querySelector("table").style.color = color;

            } else if (shapeType == constants.SHAPE_TYPES.ICON) {
                // if (data.icon_theme_color)
                //     delete data.icon_theme_color;
                // g.removeAttribute("icon_theme_color");

                data.rgb = rgb;
                const feFlood = g.ownerSVGElement.querySelector("#color_filter_" + shapeId + " feFlood");
                feFlood.style.floodColor = color;
            } else if (shapeType == constants.SHAPE_TYPES.AUTO_SHAPE) {
                if (FILL_TYPE == constants.FILL_TYPES.SOLID_FILL) {
                    if (data.fill_theme_color)
                        delete data.fill_theme_color;
                    g.removeAttribute("fill_theme_color");

                    const path = g.querySelector("path");
                    if (path)
                        path.style.fill = color;
                    data.fill_rgb = rgb;

                } else if (FILL_TYPE == constants.FILL_TYPES.GRADIENT_FILL) {
                    let stop_;
                    for (let i = 0; i < 2; i++)
                        if (GRADIENT_STOP === i) {
                            data[`fill_gradient_stop_${i}_rgb`] = rgb;
                            stop_ = g.querySelector(`g defs stop[offset="${i}"]`);
                            if (stop_) {
                                stop_.style.color = color;
                                stop_.style.stopColor = color;
                            }
                        }

                }
            }

        });

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