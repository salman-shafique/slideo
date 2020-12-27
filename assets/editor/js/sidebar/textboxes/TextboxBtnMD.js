import React from "react";
import createNewTextbox from "Editor/js/shapes/textbox/createNewTextbox";

export default function TextboxBtnMD() {

    const addTextBox = () => {
        createNewTextbox({
            "xGrid": 3,
            "yGrid": 5,
            "heightGrid": 4,
            "widthGrid": 6,
            "fontSize": 1200,
            "fontWeight": 400,
            "text": "כותרת ראשית",
            "size":"MD"
        });
    }
    return (
        <div onClick={addTextBox} className="btn btn-dark col-12 mb-2" style={{ "fontSize": "30px" }}>
            כותרת פנימית
        </div>
    )


}