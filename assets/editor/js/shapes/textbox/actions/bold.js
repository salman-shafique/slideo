import React from "react";
import ReactDOM from "react-dom";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import shape from "Editor/js/entity/shape";
import slide from "Editor/js/entity/slide";

function BoldBtn() {
    const [boldSelected, setBoldSelected] = React.useState(false);

    /**
     * 
     * @param {SVGGElement} g 
     */
    const isBoldText = (g) => {
        const shapeId = g.getAttribute("shape_id");
        const shape_ = shape(session.CURRENT_SLIDE, shapeId);
        return shape_.data().font_weight == "700";
    }

    React.useEffect(() => {
        window.addEventListener("shape.selected", (event) => {
            if (session.SELECTED_ELEMENTS.length != 1) {
                setBoldSelected(false);
                return;
            };

            const g = event.data.shape;
            if (getShapeType(g) == constants.SHAPE_TYPES.TEXTBOX) 
                setBoldSelected(isBoldText(g));
            
        });
        window.addEventListener("shape.allReleased", () => {
            setBoldSelected(false);
        });
    }, []);


    /**
     * 
     * @param {SVGGElement} g 
     * @param {boolean} isBold 
     */
    const set = (g, isBold) => {
        const shapeId = g.getAttribute("shape_id");
        const shape_ = shape(session.CURRENT_SLIDE, shapeId);

        shape_.data().font_weight = (isBold ? "700" : "400");
        g.querySelector("table").style.fontWeight = (isBold ? "700" : "400");

    }

    const bold = () => {
        let changed = false;
        session.SELECTED_ELEMENTS.forEach(selectedEl => {
            if (getShapeType(selectedEl.shape) == constants.SHAPE_TYPES.TEXTBOX) {
                set(selectedEl.shape, !boldSelected)
                changed = true;
            }
        });

        if (changed)
            setBoldSelected(!boldSelected);
    }
    return (
        <button onClick={bold} className={"btn btn-" + (boldSelected ? "primary" : "secondary")}>B</button>
    )
}


ReactDOM.render(<BoldBtn />, document.getElementById("BoldBtn"));