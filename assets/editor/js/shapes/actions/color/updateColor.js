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
        const slide_ = slide(slideId);
        const slideData = slide_.slideData();
        const background = slideData.background.data;
        const documentElement = slide_.documentElement();
        const g = documentElement.querySelector("g.SlideGroup g.Page g.Background");
        if (!g) return;


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

