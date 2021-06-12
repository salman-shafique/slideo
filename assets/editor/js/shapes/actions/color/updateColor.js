import React from "react";
import shape from "Editor/js/entity/shape";
import slide from "Editor/js/entity/slide";
import getShapeType from "../drag/utils/getShapeType";
import constants from "Editor/js/constants";
import { getThemeColor, getThemeColorNameOfShape } from "Editor/js/sidebar/colors/utils";
import toHex from "Editor/js/sidebar/colors/toHex";
import hexToRgb from "Editor/js/sidebar/colors/hexToRgb";
import getFillType from "Editor/js/shapes/actions/color/getFillType";
import reactToDOM from "Editor/js/utils/reactToDOM";

export default function updateColor(g) {
    if (!(this instanceof updateColor)) return new updateColor(...arguments);

    /**
     * @type {SVGGElement} g
     */
    this.g = g;

    this.init = (slideId) => {

        const shapeId = this.g.getAttribute("shape_id");
        const shape_ = shape(slideId, shapeId);
        const data = shape_.data();
        switch (getShapeType(this.g)) {
            case constants.SHAPE_TYPES.AUTO_SHAPE:
                const fillType = getFillType(this.g)
                if (fillType == constants.FILL_TYPES.SOLID_FILL) {
                    let color;
                    if (data.fill_rgb) {
                        color = toHex(data.fill_rgb);
                    } else if (data.fill_theme_color) {
                        color = getThemeColor(data.fill_theme_color);
                        if (!color)
                            color = getThemeColor(this.g.getAttribute("fill_theme_color"));
                    }
                    if (color) {
                        const path = this.g.querySelector("path");
                        if (path)
                            path.style.fill = color;
                    }
                } else if (fillType == constants.FILL_TYPES.GRADIENT_FILL) {

                    let hex_, stop_;
                    for (let i = 0; i < 2; i++) {

                        if (data[`fill_gradient_stop_${i}_rgb`]) {
                            hex_ = toHex(data[`fill_gradient_stop_${i}_rgb`]);
                        } else if (data[`fill_gradient_stop_${i}`]) {
                            hex_ = getThemeColor(data[`fill_gradient_stop_${i}`]);
                            if (!hex_)
                                hex_ = getThemeColor(this.g.getAttribute(`fill_gradient_stop_${i}`));

                            // Theme colors to RGB
                            if (hex_)
                                data[`fill_gradient_stop_${i}_rgb`] = hexToRgb(hex_)
                        }

                        // Rm if they exists
                        if (data[`fill_gradient_stop_${i}`])
                            delete data[`fill_gradient_stop_${i}`];
                        this.g.removeAttribute(`fill_gradient_stop_${i}`);

                        stop_ = this.g.querySelector(`g defs stop[offset="${i}"]`);
                        if (stop_) {
                            stop_.style.color = hex_;
                            stop_.style.stopColor = hex_;
                        }
                    }
                }

                // Opacity
                // Set before - Rm them
                const paths = this.g.querySelectorAll("path[fill-opacity]");
                let tmpOpacity = 1;
                if (paths)
                    paths.forEach(path => {
                        if (tmpOpacity === 1) {
                            tmpOpacity = parseFloat(path.getAttribute("fill-opacity"));
                            this.g.style.opacity = tmpOpacity;
                        }
                        path.removeAttribute("fill-opacity");
                    });

                if (data.shape_opacity != undefined)
                    this.g.style.opacity = data.shape_opacity;
                else if (g.getAttribute("shape_opacity") && g.getAttribute("shape_opacity") != "0.0") {
                    data.shape_opacity =
                        this.g.style.opacity =
                        parseFloat(g.getAttribute("shape_opacity"));
                }
                else data.shape_opacity = tmpOpacity;

                break;

            case constants.SHAPE_TYPES.IMAGE:

                if (data.shape_opacity != undefined)
                    this.g.style.opacity = data.shape_opacity;
                else if (g.getAttribute("shape_opacity") && g.getAttribute("shape_opacity") != "0.0") {
                    data.shape_opacity =
                        this.g.style.opacity =
                        parseFloat(g.getAttribute("shape_opacity"));
                }
                else data.shape_opacity = 1;
                break;
            default:
                break;
        }
    }

    /**
     */
    this.background = (slideId) => {
        const slide_ = slide(slideId);
        const slideData = slide_.slideData();
        const background = slideData.background.data;
        const documentElement = slide_.documentElement();
        let g = documentElement.querySelector("g.SlideGroup g.Page g.Background");

        if (!g) {
            const page = slide_.page();
            g = reactToDOM(
                <g xmlns="http://www.w3.org/2000/svg" alt="Background" className="Background" fill_theme_color="NOT_THEME_COLOR (0)" fill_type="SOLID (1)">
                    <path d="M 16933,19049 L 0,19049 0,0 33866,0 33866,19049 16933,19049 Z" stroke="none" />
                </g>,
                null,
                "http://www.w3.org/2000/svg"
            );
            page.prepend(g);
        };
        if (background.type == "false") {
            background.type = "solidFill";
            background.color = "ffffff";
        }

        let color;
        if (background.type == "solidFill") {
            color = getThemeColor(background.color);
            if (!color)
                color = toHex("#" + background.color);

            let path = g.querySelector("path");
            if (path && color)
                path.style.fill = color;

        } else if (background.type == "gradFill") {
            for (let i = 0; i < 2; i++) {
                color = getThemeColor(background.stops[i].color);
                if (!color)
                    color = toHex("#" + background.stops[i].color);

                let stop_ = g.querySelector(`g defs stop[offset="${i}"]`);
                if (stop_ && color) {
                    stop_.style.color = color;
                    stop_.style.stopColor = color;
                }
            }
        }

    }
}

