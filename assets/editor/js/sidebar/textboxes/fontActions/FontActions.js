import React from "react";
import BoldBtn from "./bold";
import ItalicBtn from "./italic";
import UnderlineBtn from "./underline";
import AlignmentBtn from "./alignment";
import FontSize from "./fontSize";
import FontFamily from "./fontFamily";

export default function FontActions() {

    return (
        <div className="row m-0 p-3 mt-3 bg-white rounded">
            <FontFamily className="col-12 form-control my-2" />
            <div className="col-8 row m-0">
                <div className="col-4 p-0 text-center">
                    <BoldBtn />
                </div>
                <div className="col-4 p-0 text-center">
                    <ItalicBtn />
                </div>
                <div className="col-4 p-0 text-center">
                    <UnderlineBtn />
                </div>
                <div className="col-12 my-2"></div>
                <AlignmentBtn />
            </div>
            <div className="col-4">

                <FontSize />
            </div>
        </div>
    )
}