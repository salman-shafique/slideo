import React from "react";
import createNewTextbox from "Editor/js/shapes/textbox/createNewTextbox";

export default function TextboxBtnSM() {

    const addTextBox = () => {
        createNewTextbox({
            "xGrid": 4,
            "yGrid": 9,
            "heightGrid": 3,
            "widthGrid": 4,
            "fontSize": 900,
            "fontWeight": 400,
            "text": "טקסט פסקה",
            "size":"SM"
        });
    }
    return (
        <div onClick={addTextBox} className="btn btn-dark col-12 mb-2" style={{ "fontSize": "20px" }}>
            טקסט פסקה
        </div>
    )


}