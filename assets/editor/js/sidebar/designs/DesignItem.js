import React from "react";
import session from "Editor/js/session";
import apiService from "Editor/js/utils/apiService";
import slide from "Editor/js/entity/slide";



export default function DesignItem({ designData }) {

    const selectDesign = () => {
        let currentStyeId = slide(session.CURRENT_SLIDE).slideData().style.id;
        if (designData.id == currentStyeId) {
            console.log("same design");
            return;
        }

        console.log("design from ", currentStyeId,
            "  to ", designData.id
        );
    }

    return (
        <img
            onClick={selectDesign}
            keywords={designData.keywords ? designData.keywords.join(",") : ""}
            layoutid={designData.layout.id}
            className={"col-6 px-1 mb-2 design-item"}
            src={designData.prevFile}
        />
    )

}