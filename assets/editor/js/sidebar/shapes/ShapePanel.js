import React from "react";
import ShapeOptions from "./ShapeOptions";

export default function ShapePanel() {

    return (
        <>
            <div className="search-section p-3 m-0 text-center text-white h3">
                Shapes
            </div>
            <div className="main-section">
                <div id="sideBarShape" className="custom-scrollbar vertical-scroll" style={{ display: "initial" }}>
                    <div id="sideBarShapeOptions" style={{ width: "100%", display: "none", position: "relative" }}>
                        <ShapeOptions />
                    </div>
                    <div id="sideBarShapeEmpty">
                        <i>No shape selected...</i>
                    </div>
                </div>
                <div className="control-overlay-layout closed" style={{ backgroundColor: "#484848" }}>
                    <div className="vertically-centered no-image-display centered-contents">
                        add shape
                    </div>
                </div>
                <div className="backdrop-overlay-layout collapse"></div>
            </div>
            <div className="control-section d-none">
                <button className="btn btn-primary btn-sm btn-full control-button horizontal-text-clip">
                    <i className="fas fa-plus mr-2"></i>
                    Add new shape
                </button>
                <button className="btn btn-danger btn-sm btn-full control-close-button collapse horizontal-text-clip">
                    Cancel
                </button>
            </div>
        </>
    )
}