import React from "react";
import SearchBox from "./SearchBox";
import DesignItem from "./DesignItem";
import LayoutItem from "./LayoutItem";
import session from "Editor/js/session";
import apiService from "Editor/js/utils/apiService";

export default function DesignsPanel() {

    const [designs, setDesigns] = React.useState([]);
    const [layouts, setLayouts] = React.useState([]);

    if (designs.length==0)
        apiService({
            "url": "/api/editor/getStyles",
            "data": { "alp": 12 },
            "success": (r) => {
                console.log(r);
                setDesigns(r)
            }
        })

    const designItems = [];
    const layoutItems = [];
    designs.forEach(designData => {
        
    });
    for (let index = 0; index < designs.length; index++) {
        designItems.push(
            <DesignItem key={index} />
        )
        layoutItems.push(
            <LayoutItem key={index} />
        )
    }

    return (
        <>
            <div className="search-section">
                <SearchBox />
            </div>
            <div className="main-section">
                <h6 className="text-light small-top-margin small-bottom-margin centered-contents single-line">All Designs</h6>
                <div className="design-container row m-0 px-1">
                    {designItems}
                </div>
                <div className="control-overlay-layout closed">
                    <h6 className="text-dark small-top-margin small-bottom-margin centered-contents single-line">Design Layouts</h6>
                    <div className="layout-container row m-0 px-1">
                        {layoutItems}
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