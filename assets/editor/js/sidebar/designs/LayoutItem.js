import React from "react";
import session from "Editor/js/session";
import apiService from "Editor/js/utils/apiService";
import slide from "Editor/js/entity/slide";
import select from "Editor/js/utils/selector/select";
import selectAll from "Editor/js/utils/selector/selectAll";
import { selectedLayouts, filterDesigns } from "./filterDesigns";

export default function LayoutItem({ layoutData, setSelectedLayouts, setIsMenuOpen, isMenuOpen }) {
    const [selected, setSelected] = React.useState(false);

    const selectLayout = () => {
        selectedLayouts.clear();
        selectedLayouts.add(layoutData.id);
        filterDesigns();
        setSelected(true);
        setIsMenuOpen(false);
        setSelectedLayouts(
            <div className={"col-6 my-2"}>
                {!isMenuOpen &&
                    <div
                        onClick={() => {
                            setIsMenuOpen(true);
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
                <img className={"w-100 layout-item "} src={layoutData.prevFile} />
            </div>
        );
    }

    return (
        <>
            <div
                onClick={selectLayout}
                className={"col-6 my-2"}
                style={{margin: selected && "auto"}}
            >
                <img className={"w-100 layout-item"} src={layoutData.prevFile} />
            </div>
        </>
    )

}