import React from "react";
import SearchBox from "./SearchBox";
import DesignItems from "./DesignItems";
import LayoutItems from "./LayoutItems";
import {  filterDesigns } from "./filterDesigns";

export default function DesignsPanel() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [selectedLayouts, setSelectedLayouts] = React.useState(null);

    return (
        <>
            <div className="search-section d-none">
                <SearchBox />
            </div>
            <div className="main-section mt-4">
                <h6 className="text-light small-top-margin small-bottom-margin centered-contents single-line">All Designs</h6>
                <div className="design-container row m-0 px-1">
                    <DesignItems/>
                </div>
                <div 
                    style={{
                        width: "100%",
                        background: "grey",
                        position: "absolute",
                        bottom: 0,
                        display: "flex",
                        justifyContent: "center"
                    }}    
                >
                    {selectedLayouts}
                </div>
                <div className={`control-overlay-layout ${!isMenuOpen && "closed"}`}>
                    <h6 className="text-dark small-top-margin small-bottom-margin centered-contents single-line">Design Layouts</h6>
                        <div className="layout-container row m-0 px-1">
                            <LayoutItems
                                setSelectedLayouts={setSelectedLayouts}
                                setIsMenuOpen={setIsMenuOpen}
                                isMenuOpen={isMenuOpen}
                            />
                        </div>
                </div>
                <div 
                    className={`backdrop-overlay-layout collapse  ${!isMenuOpen  && "closed"}`}
                >
                </div>
            </div>
            <div className="control-section">
                <button 
                    onClick={() => {
                        setIsMenuOpen(true)
                    }} 
                    className="btn btn-primary btn-sm btn-full control-button horizontal-text-clip"
                    style={{display: isMenuOpen ? "none" : "block"}}
                >
                    DESIGN LAYOUTS
                </button>
                <button 
                    onClick={() => {setIsMenuOpen(false)}} 
                    className={`btn btn-danger btn-sm btn-full control-close-button collapse horizontal-text-clip`}
                    style={{display: isMenuOpen ? "block" : "none"}}
                >
                    CANCEL
                </button>
            </div>
        </>
    )
}