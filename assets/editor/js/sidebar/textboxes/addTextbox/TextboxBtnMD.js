import React from "react";
import createNewTextbox from "Editor/js/shapes/textbox/createNewTextbox";
import Events from "Editor/js/Events";

export default function TextboxBtnMD() {

    const addTextBox = () => {
        createNewTextbox({
            "xGrid": 3,
            "yGrid": 5,
            "heightGrid": 4,
            "widthGrid": 6,
            "font_size": 1200,
            "font_weight": 400,
            "text": "כותרת ראשית",
            "size": "MD"
        });
        Events.slide.preview.update();
    }
    return (
        <div onClick={addTextBox} className="btn btn-dark col-12 mb-2" style={{ "fontSize": "30px" }}>
            כותרת פנימית
        </div>
    )


}