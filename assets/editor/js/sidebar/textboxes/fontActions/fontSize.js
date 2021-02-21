import React from "react";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import shape from "Editor/js/entity/shape";
import autosizeForeignObject from "Editor/js/shapes/textbox/autosizeForeignObject";
import { relocateResizeCircleContainer } from "Editor/js/shapes/actions/resize/utils/copyTransform";
import getTransform from "Editor/js/shapes/actions/drag/utils/getTransform";

export default function FontSize(props) {
    const [selectedFontsize, setSelectedFontsize] = React.useState(null); // In pixels - integer

    /**
     * 
     * @param {SVGGElement} g 
     */
    const getFontSize = (g) => {
        const shapeId = g.getAttribute("shape_id");
        const data = shape(session.CURRENT_SLIDE, shapeId).data();
        if (data) {
            const startingA = getTransform(g).scale.startingA;
            return parseInt(parseInt(data.font_size) * startingA);
        }
        return 494;
    }

    const updateDropdown = () => {
        if (!session.INITED) return;
        if (session.SELECTED_ELEMENTS.length != 1) {
            setSelectedFontsize(null);
            return;
        };
        const g = session.SELECTED_ELEMENTS[0].shape;
        if (getShapeType(g) == constants.SHAPE_TYPES.TEXTBOX)
            setSelectedFontsize(getFontSize(g));
    }


    React.useEffect(() => {
        window.addEventListener("shape.selected", updateDropdown);
        window.addEventListener("shape.resize.ended", updateDropdown);
        window.addEventListener("shape.drag.ended", updateDropdown);
        window.addEventListener("shape.allReleased", () => {
            setSelectedFontsize(null);
        });
    }, []);


    /**
     * 
     * @param {SVGGElement} g 
     * @param {string} newValue 
     */
    const set = (g, newValue) => {
        const shapeId = g.getAttribute("shape_id");
        const shape_ = shape(session.CURRENT_SLIDE, shapeId);

        const data = shape_.data();
        data.font_size = newValue;

        const startingA = getTransform(g).scale.startingA;

        g.querySelector("table").style.fontSize = parseInt(newValue / startingA) + "px";
        autosizeForeignObject(g.querySelector("foreignObject"));
        relocateResizeCircleContainer(g);
    }

    const fontsize = (e) => {
        const newValue = e.target.value;

        let changed = false;
        session.SELECTED_ELEMENTS.forEach(selectedEl => {
            if (getShapeType(selectedEl.shape) == constants.SHAPE_TYPES.TEXTBOX) {
                set(selectedEl.shape, newValue)
                changed = true;
            }
        });

        if (changed)
            setSelectedFontsize(newValue);
    }

    const defaultFontSizes = [8, 9, 10, 11, 12, 13, 14, 16, 18, 20, 24, 28, 30, 32, 36, 40, 44, 48, 54, 60, 66, 72, 80, 88, 96];
    const options = [];
    let selectedFontSizeAdded = false;
    defaultFontSizes.forEach(pt => {
        const ptInPixel = parseInt(pt * constants.PT_TO_PIXEL);
        if (ptInPixel == selectedFontsize)
            selectedFontSizeAdded = true;
        options.push(
            <option
                key={pt}
                value={ptInPixel}>
                {pt}
            </option>
        )
    });
    if (!selectedFontSizeAdded && selectedFontsize && selectedFontsize != "nothingSelected")
        options.push(
            <option
                key={0}
                value={selectedFontsize}>
                {parseInt(selectedFontsize * constants.PIXEL_TO_PT)}
            </option>
        )

    if (!selectedFontSizeAdded && !selectedFontsize)
        setSelectedFontsize("nothingSelected")

    options.push(
        <option
            key={"nothingSelected"}
            value={"nothingSelected"}
            disabled>
        </option>
    );

    return (
        <select {...props} key={selectedFontsize} defaultValue={selectedFontsize} onChange={fontsize}>
            {options}
        </select>
    )
}
