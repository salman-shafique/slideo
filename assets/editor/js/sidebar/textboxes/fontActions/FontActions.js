import React from "react";
import BoldBtn from "./bold";
import ItalicBtn from "./italic";
import UnderlineBtn from "./underline";
import AlignmentBtn from "./alignment";
import FontSize from "./fontSize";
import FontFamily from "./fontFamily";

export default function FontActions() {

    return (
        <>
            <BoldBtn />
            <ItalicBtn />
            <UnderlineBtn />
            <AlignmentBtn />
            <FontSize />
            <FontFamily />
        </>
    )
}