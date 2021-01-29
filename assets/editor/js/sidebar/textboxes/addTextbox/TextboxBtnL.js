import React from "react";
import createNewTextbox from "Editor/js/shapes/textbox/createNewTextbox";

export default function TextboxBtnL() {


    const addTextBox = () => {
        createNewTextbox({
            "xGrid": 2,
            "yGrid": 3,
            "heightGrid": 2,
            "widthGrid": 8,
            "font_size": 1700,
            "font_weight": 700,
            "text": "כותרת משנה",
            "size":"L"
        });
    }

    return (
        <div onClick={addTextBox} className="btn btn-dark col-12 mb-2" style={{ "fontSize": "40px" }}>
            כותרת משנה
        </div>
    )


}