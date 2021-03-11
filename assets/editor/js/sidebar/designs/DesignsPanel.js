import React from "react";
import SearchBox from "./SearchBox";
import DesignItems from "./DesignItems";
import LayoutItems from "./LayoutItems";


import { selectedLayouts, filterDesigns } from "./filterDesigns";

function c(x, y){
    console.log(x, y);
}

export default function DesignsPanel() {

    React.useEffect(() => {
        c('selectedLayoutId in designpanel', selectedLayoutId)
        console.log('getSelectedLayoutId in desingpanel', getSelectedLayoutId())
        console.log('ismenuopen desingspanel', isMenuOpen)
    });
    const [layoutSelected, setLayoutSelected] = React.useState(false);
    const callbackFunction = (childData, trueFalse) => {
        setLayoutSelected(trueFalse);
    }
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const [selectedLayouts, setSelectedLayouts] = React.useState(null);
    const [selectedLayoutId, setSelectedLayoutId] = React.useState(null);
    const getSelectedLayoutId = () => {
        return selectedLayoutId;
    }

    const clearSelectedLayout = () => {
        const returnSelectedLayoutId
        console.log('selected layouts in designspanel before clear', selectedLayouts)
        if (!selected) {
            selectedLayouts.clear();
            filterDesigns();
        }
        console.log('selected layouts in after  clear', selectedLayouts)
    }

    console.log('====================')
    //NEED TO  clear all selected layouts when "Layout Designs " is clicked

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
                                parentCallback={callbackFunction}
                                setSelectedLayouts={setSelectedLayouts}
                                setIsMenuOpen={setIsMenuOpen}
                                setSelectedLayoutId = {setSelectedLayoutId}
                                selectedLayoutId={selectedLayoutId}
                                getSelectedLayoutId={getSelectedLayoutId}
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
                        clearSelectedLayout();
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