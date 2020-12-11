import React from "react";
import session from "Editor/js/session";
import apiService from "Editor/js/utils/apiService";
import slide from "Editor/js/entity/slide";



export default function DesignItem({ designData }) {

    const selectDesign = () => {
        let currentSlide = slide(session.CURRENT_SLIDE);
        let slideData = currentSlide.slideData();
        if (designData.id == slideData.style.id) {
            console.log("same design");
            return;
        }

        currentSlide.changeDesign(designData);
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