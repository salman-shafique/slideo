import React from "react";
import TextboxBtnXL from "./TextboxBtnXL";
import TextboxBtnL from "./TextboxBtnL";
import TextboxBtMDn from "./TextboxBtnMD";
import TextboxBtnSM from "./TextboxBtnSM";

export default function Textboxes() {

    return (
        <div className="main-section">
            <div className="row col-12 m-0 px-1">
                <TextboxBtnXL />
                <TextboxBtnL />
                <TextboxBtMDn />
                <TextboxBtnSM />
            </div>
        </div>
    )
}