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

export default function LayoutItem({ layoutData, sendData, setSelectedLayouts, setIsMenuOpen }) {

    const [selected, setSelected] = React.useState(false);

    React.useEffect(() => {
        console.log('selected layouts', selectedLayouts)
    })


    const selectLayout = () => {
        if (!selected) {
            selectedLayouts.clear();
            console.log('selected layouts after clear', selectedLayouts)
            selectedLayouts.add(layoutData.id);
            filterDesigns();
            setSelected(true);
            setIsMenuOpen(false);
            sendData(true);
            setSelectedLayouts(
                <div
                    onClick={selectLayout}
                    className={"col-6 my-2"}
                    style={{
                        margin: selected && "auto"
                    }}
                >
                    {selected &&
                        <div
                            className={"btn btn-danger"}
                            style={{
                                height: "fit-content",
                                borderRadius: "100px",
                                position: "absolute",
                                zIndex: 1,
                                left: "-7px",
                                top: "-15px",
                            }}
                        >
                            X
                        </div>
                    }
                    <img
                        className={"w-100 layout-item " + (selected ? "selected" : "")}
                        src={layoutData.prevFile}
                    />
                </div>
            );
            //Add layout to a new div at bottom of layout area.
            
        } else {
            selectedLayouts.delete(layoutData.id);
            selectedLayouts.clear();
            filterDesigns();
            setSelected(false);
            sendData(false);
            setSelectedLayouts(null);
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
                {selected &&
                    <div
                        className={"btn btn-danger"}
                        style={{
                            height: "fit-content",
                            borderRadius: "100px",
                            position: "absolute",
                            zIndex: 1,
                            left: "-7px",
                            top: "-15px",
                        }}
                    >
                        X
                    </div>
                }
                <img
                    className={"w-100 layout-item " + (selected ? "selected" : "")}
                    src={layoutData.prevFile}
                />
            </div>
        </>
    )

}