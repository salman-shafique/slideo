import React from "react";
import createNewTextbox from "Editor/js/shapes/textbox/createNewTextbox";

export default function TextboxBtnXL() {

    const addTextBox = () => {
        createNewTextbox({
            "xGrid": 1,
            "yGrid": 1,
            "heightGrid": 2,
            "widthGrid": 10,
            "fontSize": 2000,
            "fontWeight": 700,
            "text": "כותרת ראשית",
            "size":"XL"
        });
    }

    return (
        <div onClick={addTextBox} className="btn btn-dark col-12 mb-2" style={{ "fontSize": "50px" }}>
            כותרת ראשית
        </div>
    )
}