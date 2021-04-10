import React from "react";
import Textboxes from "./addTextbox/Textboxes";
import FontActions from "./fontActions/FontActions";


export default function TextboxPanel() {

    return (
        <>
            <div className="search-section p-3 m-0 text-center text-white h3">
                טקסט
            </div>
            <div className="main-section">
                <div id="sideBarText" className="custom-scrollbar vertical-scroll" style={{ display: "initial" }}>
                    <div id="addTextboxArea" style={{ width: "100%", position: "relative" }}>
                        <Textboxes />
                    </div>
                </div>
                <div className="control-overlay-layout closed" style={{ backgroundColor: "#484848" }}>
                </div>
                <div className="backdrop-overlay-layout collapse"></div>
            </div>
        </>
    )
}