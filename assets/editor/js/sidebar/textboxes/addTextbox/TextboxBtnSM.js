import React from "react";
import createNewTextbox from "Editor/js/shapes/textbox/createNewTextbox";
import Events from "Editor/js/Events";

export default function TextboxBtnSM() {

    const addTextBox = () => {
        createNewTextbox({
            "xGrid": 4,
            "yGrid": 9,
            "heightGrid": 3,
            "widthGrid": 4,
            "font_size": 900,
            "font_weight": 400,
            "text": "טקסט פסקה",
            "size":"SM"
        });
    }
    Events.slide.preview.update();
    return (
        <div onClick={addTextBox} className="btn btn-dark col-12 mb-2" style={{ "fontSize": "20px" }}>
            טקסט פסקה
        </div>
    )


}