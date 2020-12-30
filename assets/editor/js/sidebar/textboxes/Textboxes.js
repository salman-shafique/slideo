import React from "react";
import TextboxBtnXL from "./TextboxBtnXL";
import TextboxBtnL from "./TextboxBtnL";
import TextboxBtMDn from "./TextboxBtnMD";
import TextboxBtnSM from "./TextboxBtnSM";

export default function Textboxes() {

    const addTextBox = () => {

    }

    return (
        <div className="main-section mt-4">
            <h6 className="text-light small-top-margin small-bottom-margin centered-contents single-line">Add textbox</h6>
            <div className="row col-12 m-0 px-1">
                <TextboxBtnXL />
                <TextboxBtnL />
                <TextboxBtMDn />
                <TextboxBtnSM />
            </div>
        </div>
    )
}