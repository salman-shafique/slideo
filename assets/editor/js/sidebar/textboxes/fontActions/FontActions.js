import React from "react";
import constants from "Editor/js/constants";
import BoldBtn from "./bold";
import ItalicBtn from "./italic";
import UnderlineBtn from "./underline";
import AlignmentBtn from "./alignment";
import FontSize from "./fontSize";
import FontFamily from "./fontFamily";
import ColorCircle from "Editor/js/sidebar/components/ColorCircle/index";

export default function FontActions() {

    return (
        <>
            <div className="wrapper">
                <div className="margin-auto"><FontFamily className="col-12 form-control full-width" style={{marginLeft:"20px"}}/></div>
                <div className="margin-auto"><FontSize className="form-control form-control-lg" /></div>
                <div className="margin-auto"><BoldBtn /><ItalicBtn /><UnderlineBtn /></div>
                <div className="margin-auto"><AlignmentBtn className="col-12 full-width"/></div>
                <div className="margin-auto"><ColorCircle key={"text"} SHAPE_TYPE={constants.SHAPE_TYPES.TEXTBOX}/></div>
            </div>
        </>
    )
}