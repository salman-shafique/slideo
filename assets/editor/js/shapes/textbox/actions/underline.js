import React from "react";
import ReactDOM from "react-dom";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import shape from "Editor/js/entity/shape";


function UnderlineBtn() {
    const [underlineSelected, setUnderlineSelected] = React.useState(false);

    /**
     * 
     * @param {SVGGElement} g 
     */
    const isUnderline = (g) => {
        const shapeId = g.getAttribute("shape_id");
        const shape_ = shape(session.CURRENT_SLIDE, shapeId);
        return shape_.data().underline?.toLowerCase() == "true";
    }

    React.useEffect(() => {
        window.addEventListener("shape.selected", (event) => {
            if (session.SELECTED_ELEMENTS.length != 1) {
                setUnderlineSelected(false);
                return;
            };

            const g = event.data.shape;
            if (getShapeType(g) == constants.SHAPE_TYPES.TEXTBOX) 
                setUnderlineSelected(isUnderline(g));
            
        });
        window.addEventListener("shape.allReleased", () => {
            setUnderlineSelected(false);
        });
    }, []);


    /**
     * 
     * @param {SVGGElement} g 
     * @param {boolean} isUnderline 
     */
    const set = (g, isUnderline) => {
        const shapeId = g.getAttribute("shape_id");
        const shape_ = shape(session.CURRENT_SLIDE, shapeId);

        shape_.data().underline = (isUnderline ? "true" : "false");
        g.querySelector("table").style.textDecoration = (isUnderline ? "underline" : "");

    }

    const underline = () => {
        let changed = false;
        session.SELECTED_ELEMENTS.forEach(selectedEl => {
            if (getShapeType(selectedEl.shape) == constants.SHAPE_TYPES.TEXTBOX) {
                set(selectedEl.shape, !underlineSelected)
                changed = true;
            }
        });

        if (changed)
            setUnderlineSelected(!underlineSelected);
    }
    return (
        <button onClick={underline} className={"btn btn-" + (underlineSelected ? "primary" : "secondary")}>U</button>
    )
}


ReactDOM.render(<UnderlineBtn />, document.getElementById("UnderlineBtn"));