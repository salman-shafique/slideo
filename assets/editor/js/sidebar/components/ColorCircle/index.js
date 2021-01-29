import React from "react";
import "./style.css";
import SingleColor from "./SingleColor";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import shape from "Editor/js/entity/shape";


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

export default function ColorCirle(SHAPE_TYPE) {
    const [opened, setOpened] = React.useState(false);
    const [currentColor, setCurrentColor] = React.useState("#fff");
    const [colorCirles, setColorCirles] = React.useState([]);

    React.useEffect(() => {
        const colorCircles_ = [];
        colorList.forEach((color, i) => {
            if (i % 6 == 0)
                colorCircles_.push(<br key={"br"+i} />);

            colorCircles_.push(
                <SingleColor key={i} color={color} setCurrentColor={setCurrentColor} />
            )
        });
        setColorCirles(colorCircles_);
        // window.addEventListener("shape.selected", (event) => {
        //     if (session.SELECTED_ELEMENTS.length != 1) {
        //         setAlignmentSelected(null);
        //         return;
        //     };

        //     const g = event.data.shape;
        //     if (getShapeType(g) == SHAPE_TYPE)
        //         setAlignmentSelected(getAlignment(g));

        // });
        // window.addEventListener("shape.allReleased", () => {
        //     setAlignmentSelected(null);
        // });
    }, []);

    return (
        <div key={SHAPE_TYPE} className="color-circle-container col-12 text-center position-static">
            <div
                className="main-circle color-circle-single"
                onClick={() => setOpened(!opened)}
                style={{ backgroundColor: currentColor }}
            >
            </div>
            <div className="color-circles" style={{ display: opened ? 'block' : 'none' }}>
                {colorCirles}
            </div>
        </div>
    )
}