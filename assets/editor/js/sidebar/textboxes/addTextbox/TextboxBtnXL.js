import React from "react";
import createNewTextbox from "Editor/js/shapes/textbox/createNewTextbox";
import Events from "Editor/js/Events";

export default function TextboxBtnXL() {

    const addTextBox = () => {
        createNewTextbox({
            "xGrid": 1,
            "yGrid": 1,
            "heightGrid": 2,
            "widthGrid": 10,
            "font_size": 2000,
            "font_weight": 700,
            "text": "כותרת ראשית",
            "size":"XL"
        });
    }
    Events.slide.preview.update();
    return (
        <div onClick={addTextBox} className="btn btn-dark col-12 mb-2" style={{ "fontSize": "50px" }}>
            כותרת ראשית
        </div>
    )
}