import React from "react";
import session from "Editor/js/session";
import apiService from "Editor/js/utils/apiService";
import slide from "Editor/js/entity/slide";
import select from "Editor/js/utils/selector/select";
import selectAll from "Editor/js/utils/selector/selectAll";
import { selectedLayouts, filterDesigns } from "./filterDesigns";

//SEND SELECTED LAYOUT UP TO DESIGNSPANEL.JS

function c(x, y){
    console.log(x, y);
}

export default function LayoutItem({ layoutData, sendData, setSelectedLayouts, setIsMenuOpen, setSelectedLayoutId,  getSelectedLayoutId, selectedLayoutId, isMenuOpen, clearSelectedLayout}) {

    const [selected, setSelected] = React.useState(false);

    //ADD LAYOUT ID TO PARENT STATE. Parent will check if the current item is selected, and give "selected" class accordingly
    React.useEffect(() => {
        console.log('selected layouts', selectedLayouts)
        console.log('layout data', layoutData)
        console.log('selectedLayoutId in layoutitem', selectedLayoutId)
        console.log('setSelectedLayoutId function in layoutitem', setSelectedLayoutId)
        console.log('selected layout id getSelectedLayoutId', getSelectedLayoutId())
        console.log('setismenuopen layoutitem', setIsMenuOpen);
        console.log('ismenuopen layoutitem' ,isMenuOpen)
        if (selectedLayouts){

            console.log('Set.prototype.values()', selectedLayouts.values())
            console.log('Set.prototype.values()', selectedLayouts.values()[0])
            console.log('selected values 0', selectedLayouts[0])
        }
    })

    const returnSelectedLayoutId = () => {
        for (let item of selectedLayouts.values()) console.log(item);
        for (let item of selectedLayouts.values()) return item;
    }

    const selectLayout = () => {
        if (true) {
            console.log('selectedLayoutId in selectLayout function in layoutitme', selectedLayoutId)
            selectedLayouts.clear();
            console.log('selected layouts after clear', selectedLayouts)
            selectedLayouts.add(layoutData.id);
            console.log('layoutdata.id in Layoutitem', layoutData.id);
            console.log('setting selectedLayoutId')
            setSelectedLayoutId(layoutData.id);
            filterDesigns();
            setSelected(true);
            setIsMenuOpen(false);
            sendData(true);
            setSelectedLayouts(
                <div
                    className={"col-6 my-2"}
                >
                    {!isMenuOpen &&
                        <div
                            onClick={() => {
                                console.log('danger clicked');
                                setIsMenuOpen(true);
                                clearSelectedLayout();
                            }}
                            className={"btn btn-danger"}
                            style={{
                                height: "fit-content",
                                borderRadius: "100px",
                                position: "absolute",
                                zIndex: 1,
                                left: "3px",
                                top: "-6px",
                                fontSize: "0.8em"
                            }}
                        >
                            X
                        </div>
                    }
                    <img
                        className={"w-100 layout-item "}
                        src={layoutData.prevFile}
                    />
                </div>
            );
            
        } 
    }

    return (
        <>
            <div
                onClick={selectLayout}
                className={"col-6 my-2"}
                style={{
                    margin: selected && "auto"
                }}
            >
                <img
                    className={"w-100 layout-item"}
                    src={layoutData.prevFile}
                />
            </div>
        </>
    )

}