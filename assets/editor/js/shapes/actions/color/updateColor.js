import shape from "Editor/js/entity/shape";
import slide from "Editor/js/entity/slide";
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
                        g.removeAttribute(`fill_gradient_stop_${i}`);

                        stop_ = this.g.querySelector(`g defs stop[offset="${i}"]`);
                        if (stop_) {
                            stop_.style.color = hex_;
                            stop_.style.stopColor = hex_;
                        }
                    }
                }

                break;
            default:
                break;
        }
    }

    /**
     */
    this.background = (slideId) => {
        
        const documentElement = slide_.documentElement();
        let background = select("g.SlideGroup g.Page g.Background", documentElement);



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
}

