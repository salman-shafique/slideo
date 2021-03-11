import React from "react";
import session from "Editor/js/session";
import apiService from "Editor/js/utils/apiService";
import slide from "Editor/js/entity/slide";
import select from "Editor/js/utils/selector/select";
import selectAll from "Editor/js/utils/selector/selectAll";
import { selectedLayouts, filterDesigns } from "./filterDesigns";

//SEND SELECTED LAYOUT UP TO DESIGNSPANEL.JS

export default function LayoutItem({ layoutData, sendData, setSelectedLayouts, setIsMenuOpen, setSelectedLayoutId,  getSelectedLayoutId, selectedLayoutId, isMenuOpen, clearSelectedLayout}) {

    const [selected, setSelected] = React.useState(false);

    const selectLayout = () => {
        selectedLayouts.clear();
        selectedLayouts.add(layoutData.id);
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