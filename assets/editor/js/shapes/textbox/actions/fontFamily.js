import React from "react";
import ReactDOM from "react-dom";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import shape from "Editor/js/entity/shape";

function FontFamily() {
    const [selectedFontFamily, setSelectedFontFamily] = React.useState(null);

    /**
     * 
     * @param {SVGGElement} g 
     */
    const getFontFamily = (g) => {
        const shapeId = g.getAttribute("shape_id");
        const shape_ = shape(session.CURRENT_SLIDE, shapeId);
        return shape_.data().font_family.replace(/(Bold)|(bold)/g, "");
    }

    const updateDropdown = () => {
        if (session.SELECTED_ELEMENTS.length != 1) {
            setSelectedFontFamily(null);
            return;
        };
        const g = session.SELECTED_ELEMENTS[0].shape;
        if (getShapeType(g) == constants.SHAPE_TYPES.TEXTBOX)
            setSelectedFontFamily(getFontFamily(g));
    }


    React.useEffect(() => {
        window.addEventListener("shape.selected", updateDropdown);
        window.addEventListener("shape.drag.ended", updateDropdown); // Check if needed
        window.addEventListener("shape.allReleased", () => {
            setSelectedFontFamily(null);
        });
    }, []);


    /**
     * 
     * @param {SVGGElement} g 
     * @param {string} newFontFamily 
     */
    const set = (g, newFontFamily) => {
        const shapeId = g.getAttribute("shape_id");
        const shape_ = shape(session.CURRENT_SLIDE, shapeId);

        const data = shape_.data();
        data.font_family = newFontFamily;

        g.querySelector("table").style.fontFamily = newFontFamily;
    }

    const fontfamily = (e) => {
        const newFontFamily = e.target.value;

        let changed = false;
        session.SELECTED_ELEMENTS.forEach(selectedEl => {
            if (getShapeType(selectedEl.shape) == constants.SHAPE_TYPES.TEXTBOX) {
                set(selectedEl.shape, newFontFamily)
                changed = true;
            }
        });

        if (changed)
            setSelectedFontFamily(newFontFamily);
    }

    const defaultFontFamilies = [
        "Arial",
        "Arial Black",
        "Arial, sans-serif",
        "Assistant",
        "Bookman",
        "Candara",
        "Comic Sans MS",
        "Courier",
        "Courier New",
        "DejaVu Sans, sans-serif",
        "DM Sans, sans-serif",
        "Impact",
        "Garamond",
        "Georgia",
        "Palatino",
        "Tahoma",
        "Times",
        "Times New Roman",
        "Varela Round",
        "Verdana"
    ];

    const options = [];
    let selectedFontFamilyAdded = false;
    defaultFontFamilies.forEach((fontFamily, i) => {
        if (fontFamily.toLocaleLowerCase().replace(/ /g, "") == selectedFontFamily?.toLocaleLowerCase().replace(/ /g, ""))
            selectedFontFamilyAdded = true;
        options.push(
            <option
                key={i}
                value={fontFamily}
                style={{ fontFamily: fontFamily }}>
                {fontFamily}
            </option>
        )
    });
    if (!selectedFontFamilyAdded && selectedFontFamily)
        options.push(
            <option
                key={0}
                value={selectedFontFamily}>
                {selectedFontFamily}
            </option>
        )

    return (
        <select key={selectedFontFamily} defaultValue={selectedFontFamily} onChange={fontfamily}>
            {options}
        </select>
    )
}


ReactDOM.render(<FontFamily />, document.getElementById("FontFamily"));