import React from "react";
import session from "Editor/js/session";
import apiService from "Editor/js/utils/apiService";
import slide from "Editor/js/entity/slide";
import select from "Editor/js/utils/selector/select";
import selectAll from "Editor/js/utils/selector/selectAll";
import { selectedLayouts, filterDesigns } from "./filterDesigns";


export default function LayoutItem({ layoutData }) {

    const [selected, setSelected] = React.useState(false);


    const selectLayout = () => {
        if (!selected) {
            selectedLayouts.add(layoutData.id);
            filterDesigns();
            setSelected(true);
        } else {
            selectedLayouts.delete(layoutData.id);
            filterDesigns();
            setSelected(false);
        }
    }

    return (
        <div
            onClick={selectLayout}
            className={"col-6 my-2"}>
            <img
                className={"w-100 layout-item " + (selected ? "selected" : "")}
                src={layoutData.prevFile}
            />
        </div>
    )

}