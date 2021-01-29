import React from "react";
import Textboxes from "./addTextbox/Textboxes";
import FontActions from "./fontActions/FontActions";


export default function TextboxPanel() {

    return (
        <>
            <div className="search-section p-3 m-0 text-center text-white h3">
                Text
            </div>
            <div className="main-section">
                <div id="sideBarText" className="custom-scrollbar vertical-scroll" style={{display:"initial"}}>
                    <div id="sideBarTextOptions" style={{ width: "100%", display: "none",position:"relative" }}>
                        <FontActions />
                    </div>
                    <div id="sideBarTextEmpty">
                        <i>No text box selected...</i>
                    </div>
                </div>
                <div className="control-overlay-layout closed" style={{ backgroundColor: "#484848" }}>
                    <div id="addTextboxArea" className="vertically-centered no-image-display centered-contents">
                        <Textboxes />
                    </div>
                </div>
                <div className="backdrop-overlay-layout collapse"></div>
            </div>
            <div className="control-section">
                <button className="btn btn-primary btn-sm btn-full control-button horizontal-text-clip">
                    <i className="fas fa-plus mr-2"></i>
                    Add new text box
                </button>
                <button className="btn btn-danger btn-sm btn-full control-close-button collapse horizontal-text-clip">
                    Cancel
                </button>
            </div>
        </>
    )
}