import React from "react";
import SearchBox from "./SearchBox";
import DesignItems from "./DesignItems";
import LayoutItems from "./LayoutItems";


export default function DesignsPanel() {

    React.useEffect(() => {
        console.log('selectedLayouts', selectedLayouts)
        console.log('layout selected? ', layoutSelected)

    });
    const [layoutSelected, setLayoutSelected] = React.useState(false);
    const callbackFunction = (childData, trueFalse) => {
        setLayoutSelected(trueFalse);
    }

    const [selectedLayouts, setSelectedLayouts] = React.useState(null);


    //NEED TO ADD STATE FOR LAYOUT ITEMS, SO THAT REACT SENDS SAME DATA TO BOTH LAYOUT ITEMS
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
                <div className={`control-overlay-layout closed ${layoutSelected && "closed"}`}>
                    <h6 className="text-dark small-top-margin small-bottom-margin centered-contents single-line">Design Layouts</h6>
                        <div className="layout-container row m-0 px-1">
                            <LayoutItems
                                parentCallback = {callbackFunction}
                                setSelectedLayouts = {setSelectedLayouts}
                            />
                        </div>
                </div>
                <div className={`backdrop-overlay-layout collapse  ${layoutSelected && "closed"}`}></div>
            </div>
            <div className="control-section">
                <button className="btn btn-primary btn-sm btn-full control-button horizontal-text-clip">DESIGN LAYOUTS</button>
                <button onClick={() => {setLayoutSelected(false)}}className="btn btn-danger btn-sm btn-full control-close-button collapse horizontal-text-clip">CANCEL</button>
            </div>
        </>
    )
}