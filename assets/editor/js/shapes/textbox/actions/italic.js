import React from "react";
import ReactDOM from "react-dom";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import shape from "Editor/js/entity/shape";


function ItalicBtn() {
    const [italicSelected, setItalicSelected] = React.useState(false);

    /**
     * 
     * @param {SVGGElement} g 
     */
    const isItalicText = (g) => {
        const shapeId = g.getAttribute("shape_id");
        const data = shape(session.CURRENT_SLIDE, shapeId).data();
        if (data)
            return data.italic?.toLowerCase() == "true";
        return false;
    }

    React.useEffect(() => {
        window.addEventListener("shape.selected", (event) => {
            if (session.SELECTED_ELEMENTS.length != 1) {
                setItalicSelected(false);
                return;
            };

            const g = event.data.shape;
            if (getShapeType(g) == constants.SHAPE_TYPES.TEXTBOX) 
                setItalicSelected(isItalicText(g));
            
        });
        window.addEventListener("shape.allReleased", () => {
            setItalicSelected(false);
        });
    }, []);


    /**
     * 
     * @param {SVGGElement} g 
     * @param {boolean} isItalic 
     */
    const set = (g, isItalic) => {
        const shapeId = g.getAttribute("shape_id");
        const shape_ = shape(session.CURRENT_SLIDE, shapeId);

        shape_.data().italic = (isItalic ? "true" : "false");
        g.querySelector("table").style.fontStyle = (isItalic ? "italic" : "");

    }

    const italic = () => {
        let changed = false;
        session.SELECTED_ELEMENTS.forEach(selectedEl => {
            if (getShapeType(selectedEl.shape) == constants.SHAPE_TYPES.TEXTBOX) {
                set(selectedEl.shape, !italicSelected)
                changed = true;
            }
        });

        if (changed)
            setItalicSelected(!italicSelected);
    }
    return (
        <button onClick={italic} className={"btn btn-" + (italicSelected ? "primary" : "secondary")}><i>I</i></button>
    )
}


ReactDOM.render(<ItalicBtn />, document.getElementById("ItalicBtn"));