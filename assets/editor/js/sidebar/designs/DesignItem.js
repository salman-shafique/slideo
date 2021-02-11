import React from "react";
import session from "Editor/js/session";
import slide from "Editor/js/entity/slide";
import preloader from "Editor/js/components/preloader";

export default function DesignItem({ designData }) {

    const selectDesign = () => {
        const currentSlide = slide(session.CURRENT_SLIDE);
        const slideData = currentSlide.slideData();
        if (designData.id == slideData.style.id) {
            return;
        }
        preloader.show();
        currentSlide.changeDesign(designData);
        preloader.hide();
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