import React from "react";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import shape from "Editor/js/entity/shape";
import Events from "Editor/js/Events";

export default function UnderlineBtn(props) {
    const [underlineSelected, setUnderlineSelected] = React.useState(false);

    /**
     * 
     * @param {SVGGElement} g 
     */
    const isUnderlineText = (g) => {
        const shapeId = g.getAttribute("shape_id");
        const data = shape(session.CURRENT_SLIDE, shapeId).data();
        if (data)
            return data.underline?.toLowerCase() == "true";
        return false;
    }

    React.useEffect(() => {
        Events.listen("shape.selected", (event) => {
            if (!session.INITED) return;
            if (session.SELECTED_ELEMENTS.length != 1) {
                setUnderlineSelected(false);
                return;
            };

            const g = event.data.shape;
            if (getShapeType(g) == constants.SHAPE_TYPES.TEXTBOX) 
                setUnderlineSelected(isUnderlineText(g));
            
        });
        Events.listen("shape.allReleased", () => {
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
        <button {...props} onClick={underline} className={"btn btn-" + (!underlineSelected ? "light" : "secondary")}>
            <i className="fas fa-underline"></i>
        </button>
    )
}
