import React from "react";
import BrandingOptions from "./BrandingOptions";
import "Editor/css/branding.css";


export default function BrandingPanel() {

    return (
        <>
            <div className="search-section p-3 m-0 text-center text-white h3">
                Branding
            </div>
            <div className="main-section" style={{
                overflowY: "scroll",
                height: "calc(100% - 55px)"
            }}>
                <div id="sideBarBranding" className="custom-scrollbar vertical-scroll" style={{ display: "initial" }}>
                    <div id="sideBarBrandingOptions" style={{ width: "100%", position: "relative" }}>
                        <BrandingOptions />
                    </div>
                </div>
            </div>
        </>
    )
}