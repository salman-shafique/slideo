import React from "react";
import BackgroundOptions from "./BackgroundOptions";

export default function BackgroundPanel() {

    return (
        <>
            <div className="search-section p-3 m-0 text-center text-white h3">
                Background
            </div>
            <div className="main-section">
                <div id="sideBarbackground" className="custom-scrollbar vertical-scroll" style={{ display: "initial" }}>
                    <div id="sideBarbackgroundOptions" style={{ width: "100%", position: "relative" }}>
                        <BackgroundOptions />
                    </div>
                </div>
                <div className="control-overlay-layout closed" style={{ backgroundColor: "#484848" }}>
                    <div className="vertically-centered no-image-display centered-contents">

                    </div>
                </div>
                <div className="backdrop-overlay-layout collapse"></div>
            </div>
            <div className="control-section d-none">
                <button className="btn btn-primary btn-sm btn-full control-button horizontal-text-clip">
                    <i className="fas fa-plus mr-2"></i>
                    Add new bg
                </button>
                <button className="btn btn-danger btn-sm btn-full control-close-button collapse horizontal-text-clip">
                    Cancel
                </button>
            </div>
        </>
    )
}