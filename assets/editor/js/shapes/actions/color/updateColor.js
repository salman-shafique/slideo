import shape from "Editor/js/entity/shape";
import getShapeType from "../drag/utils/getShapeType";
import constants from "Editor/js/constants";
import { getThemeColor, getThemeColorNameOfShape } from "Editor/js/sidebar/colors/utils";
import toHex from "Editor/js/sidebar/colors/toHex";
import hexToRgb from "Editor/js/sidebar/colors/hexToRgb";
import getFillType from "Editor/js/shapes/actions/color/getFillType";

export default function updateColor(g) {
    if (!(this instanceof updateColor)) return new updateColor(...arguments);

    /**
     * @type {SVGGElement} g
     */
    this.g = g;

    this.init = (slideId) => {
        switch (getShapeType(this.g)) {
            case constants.SHAPE_TYPES.AUTO_SHAPE:
                const shapeId = this.g.getAttribute("shape_id");
                const shape_ = shape(slideId, shapeId);
                const data = shape_.data();

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
                    if (!color) return;
                    const path = this.g.querySelector("path");
                    path.style.fill = color;
                } else if (fillType == constants.FILL_TYPES.GRADIENT_FILL) {

                    let fill_gradient_stop_0_rgb;
                    if (data.fill_gradient_stop_0_rgb) {
                        fill_gradient_stop_0_rgb = toHex(data.fill_gradient_stop_0_rgb);
                    } else if (data.fill_gradient_stop_0) {
                        fill_gradient_stop_0_rgb = getThemeColor(data.fill_gradient_stop_0);
                        if (!fill_gradient_stop_0_rgb)
                            fill_gradient_stop_0_rgb = getThemeColor(this.g.getAttribute("fill_gradient_stop_0"));
                    }
                    if (!fill_gradient_stop_0_rgb) return;
                    console.log(fill_gradient_stop_0_rgb);
                }

                break;
            default:
                break;
        }
    }

    /**
     * @param {string} color 
     */
    this.fillThemeColor = function (color) {
        let path = this.g.querySelector("g[id]>path");
        if (!path) return;
        path.style.fill = color;
    }

    /**
     * @param {string} color 
     */
    this.fillGradientStop0 = function (color) {

        let stop = this.g.querySelector('g[id]>g>defs stop[offset="0"]');
        if (stop) {
            stop.style.color = color;
            stop.style.stopColor = color;
            return;
        }
        // Todo
        // const paths = this.g.querySelectorAll("g[clip-path]>path");
        // for (let index = 0; index < Math.round(paths.length / 2); index++) {
        //     const path = paths[index];

        // }
    }

    /**
     * @param {string} color 
     */
    this.fillGradientStop1 = function (color) {
        let stop = this.g.querySelector('g[id]>g>defs stop[offset="1"]');
        if (!stop) return;
        stop.style.color = color;
        stop.style.stopColor = color;
    }

    /**
     * @param {string} colorName 
     * @param {string} color 
     */
    this.background = function (colorName, color) {
        let path, stop;
        if (this.g.getAttribute("fill_theme_color")) {
            // fill_theme_color
            if (this.g.getAttribute("fill_theme_color").split(" ")[0] == colorName) {
                path = this.g.querySelector("path");
                if (path)
                    path.style.fill = color;
            }
        }
        if (this.g.getAttribute("fill_gradient_stop_0")) {
            // fill_gradient_stop_0
            if (this.g.getAttribute("fill_gradient_stop_0").split(" ")[0] == colorName) {
                stop = this.g.querySelector('g defs stop[offset="0"]');
                if (stop) {
                    stop.style.color = color;
                    stop.style.stopColor = color;
                }
            }
        }
        if (this.g.getAttribute("fill_gradient_stop_1")) {
            // fill_gradient_stop_1
            if (this.g.getAttribute("fill_gradient_stop_1").split(" ")[0] == colorName) {
                stop = this.g.querySelector('g defs stop[offset="1"]');
                if (stop) {
                    stop.style.color = color;
                    stop.style.stopColor = color;
                }
            }
        }
    }
    /**
     * @param {string} color 
     */
    this.fillText = function (color) {
        let table = this.g.querySelector('g table');
        if (!table) return;
        table.style.color = color;
    }

    /**
     * @param {string} color 
     */
    this.fillIcon = function (color) {
        const shapeId = this.g.getAttribute("shape_id");
        const colorFilter = this.g.ownerSVGElement.querySelector("#color_filter_" + shapeId);
        const feFlood = colorFilter.querySelector('feFlood');
        feFlood.style.floodColor = color;
    }

}

