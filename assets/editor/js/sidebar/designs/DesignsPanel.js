import React from "react";
import SearchBox from "./SearchBox";
import DesignItems from "./DesignItems";
import LayoutItems from "./LayoutItems";



export default function DesignsPanel() {

    return (
        <>
            <div className="search-section">
                <SearchBox />
            </div>
            <div className="main-section">
                <h6 className="text-light small-top-margin small-bottom-margin centered-contents single-line">All Designs</h6>
                <div className="design-container row m-0 px-1">
                    <DesignItems/>
                </div>
                <div className="control-overlay-layout closed">
                    <h6 className="text-dark small-top-margin small-bottom-margin centered-contents single-line">Design Layouts</h6>
                    <div className="layout-container row m-0 px-1">
                      <LayoutItems/>
                    </div>
                </div>
                <div className="backdrop-overlay-layout collapse"></div>
            </div>
            <div className="control-section">
                <button className="btn btn-primary btn-sm btn-full control-button horizontal-text-clip">DESIGN LAYOUTS</button>
                <button className="btn btn-danger btn-sm btn-full control-close-button collapse horizontal-text-clip">CANCEL</button>
            </div>
        </>
    )
}