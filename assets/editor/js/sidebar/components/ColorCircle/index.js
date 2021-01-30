import React from "react";
import "./style.css";
import SingleColor from "./SingleColor";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import shape from "Editor/js/entity/shape";
import { getThemeColor, getThemeColorNameOfShape } from "Editor/js/sidebar/colors/utils";
import toHex from "Editor/js/sidebar/colors/toHex";

const colorList = [
    "#ff914d",
    "#ffbd59",
    "#ffde59",
    "#c9e265",
    "#c9e265",
    "#008037",
    "#004aad",
    "#5271ff",
    "#38b6ff",
    "#5ce1e6",
    "#00c2cb",
    "#03989e",
    "#5e17eb",
    "#8c52ff",
    "#cb6ce6",
    "#ff66c4",
    "#ff5757",
    "#ff1616",
    "#ffffff",
    "#d9d9d9",
    "#a7a7a7",
    "#737373",
    "#555555",
    "#000000"
];

export default function ColorCircle({ SHAPE_TYPE, FILL_TYPE, GRADIENT_STOP }) {
    const [opened, setOpened] = React.useState(false);
    const [currentColor, setCurrentColor] = React.useState("#ffffff");
    const [colorCircles, setColorCircles] = React.useState([]);

    React.useEffect(() => {
        const colorCircles_ = [];
        colorList.forEach((color, i) => {
            if (i % 6 == 0)
                colorCircles_.push(<br key={"br" + i} />);

            colorCircles_.push(
                <SingleColor
                    key={i}
                    color={color}
                    setCurrentColor={setCurrentColor}
                    SHAPE_TYPE={SHAPE_TYPE}
                    FILL_TYPE={FILL_TYPE}
                    GRADIENT_STOP={GRADIENT_STOP} />
            )
        });
        setColorCircles(colorCircles_);

        window.addEventListener("shape.selected", (event) => {
            if (session.SELECTED_ELEMENTS.length != 1) {
                setCurrentColor("#ffffff");
                return;
            };

            const g = event.data.shape;
            if (getShapeType(g) == SHAPE_TYPE) {
                let color;

                // Static colored
                const shape_ = shape(session.CURRENT_SLIDE, g.getAttribute("shape_id"));
                const data = shape_.data();

                if (SHAPE_TYPE == constants.SHAPE_TYPES.TEXTBOX)
                    color = toHex(data.font_color);
                else if (SHAPE_TYPE == constants.SHAPE_TYPES.ICON)
                    color = toHex(data.rgb);
                else if (SHAPE_TYPE == constants.SHAPE_TYPES.AUTO_SHAPE) {
                    if (FILL_TYPE == constants.FILL_TYPES.SOLID_FILL) {
                        color = toHex(data.fill_rgb);
                    } else if (FILL_TYPE == constants.FILL_TYPES.GRADIENT_FILL) {
                        if (GRADIENT_STOP === 0)
                            data.fill_gradient_stop_0_rgb
                                ? color = toHex(data.fill_gradient_stop_0_rgb)
                                : color = getThemeColor(data.fill_gradient_stop_0)

                        else if (GRADIENT_STOP === 1)
                            data.fill_gradient_stop_1_rgb
                                ? color = toHex(data.fill_gradient_stop_1_rgb)
                                : color = getThemeColor(data.fill_gradient_stop_1)
                    }
                }

                if (!color) {
                    const themeColor = getThemeColorNameOfShape(g);
                    if (themeColor)
                        // theme colored before
                        color = getThemeColor(themeColor.themeColorName);
                }

                color
                    ? setCurrentColor(color.toLowerCase())
                    : setCurrentColor("#ffffff");
            }

        });
        window.addEventListener("shape.allReleased", () => {
            setOpened(false);
            setCurrentColor("#ffffff");
        });
    }, []);

    return (
        <div key={SHAPE_TYPE} className="color-circle-container p-0 col-12 text-center position-static">
            <div
                className="main-circle color-circle-single"
                onClick={() => setOpened(!opened)}
                style={{
                    backgroundColor: currentColor,
                    border: (currentColor == "#ffffff") ? "solid lightgray 1px" : "none"
                }}>
            </div>
            <div className="color-circles" style={{ display: opened ? 'block' : 'none' }}>
                {colorCircles}
            </div>
        </div>
    )
}