import React from "react";
import session from "Editor/js/session";
import apiService from "Editor/js/utils/apiService";
import slide from "Editor/js/entity/slide";
import select from "Editor/js/utils/selector/select";
import selectAll from "Editor/js/utils/selector/selectAll";
import { selectedLayouts, filterDesigns } from "./filterDesigns";


export default function LayoutItem({ layoutData, sendData }) {

    const [selected, setSelected] = React.useState(false);


    const selectLayout = () => {
        if (!selected) {
            selectedLayouts.add(layoutData.id);
            filterDesigns();
            setSelected(true);

            console.log('sending true');
            sendData(true);
            //Add layout to a new div at bottom of layout area.
            
        } else {
            selectedLayouts.delete(layoutData.id);
            filterDesigns();
            setSelected(false);
            console.log('sending false');
            sendData(false);
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