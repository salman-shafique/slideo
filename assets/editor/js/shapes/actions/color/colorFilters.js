import React from "react";
import ReactDOM from "react-dom";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";

/**
 * 
 * @param {SVGGElement} g 
 */
export default function colorFilters(g) {
    if (!(this instanceof colorFilters)) return new colorFilters(...arguments);

    this.g = g;

    this.init = () => {
        if (getShapeType(this.g) == constants.SHAPE_TYPES.TEXTBOX) return;

        const shapeId = g.getAttribute("shape_id");
        const alt = g.getAttribute("alt");

        const filterContainer = g.ownerSVGElement.querySelector("#filterContainer");
        const shapeFilterContainer = g.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "g");
        filterContainer.appendChild(shapeFilterContainer);

        let filter;
        if (alt.includes("icon|") || alt == "newicon") {
            let floodColor = "#fff";
            if (!g.getAttribute("icon_theme_color")) {
                let rgb = g.getAttribute("rgb");
                if (rgb) floodColor = "rgb(" + rgb.replace(/ /g, ",") + ")";
            }

            filter =
                <defs>
                    <filter id={"color_filter_" + shapeId}>
                        <feFlood floodColor={floodColor} result="flood" />
                        <feComposite in="SourceGraphic" in2="flood" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" />
                    </filter>
                </defs>;
            g.querySelector("image").setAttribute("filter", "url(#color_filter_" + shapeId + ")");
        } else {
            let brightness = g.getAttribute("shape_brightness");
            if (brightness) {
                brightness = parseFloat(brightness);
                brightness = brightness ** constants.GOLDEN_RATIO;
            } else brightness = 1;

            filter =
                <defs key={"brightness_filter_" + shapeId}>
                    <filter id={"brightness_filter_" + shapeId}>
                        <feComponentTransfer>
                            <feFuncR type="linear" slope={brightness} />
                            <feFuncG type="linear" slope={brightness} />
                            <feFuncB type="linear" slope={brightness} />
                        </feComponentTransfer>
                    </filter>
                </defs>;
            g.setAttribute("filter", "url(#brightness_filter_" + shapeId + ")");
        }

        ReactDOM.render(filter, shapeFilterContainer);
    }

}

