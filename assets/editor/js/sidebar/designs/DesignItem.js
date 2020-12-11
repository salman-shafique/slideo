import React from "react";
import session from "Editor/js/session";
import apiService from "Editor/js/utils/apiService";
import slide from "Editor/js/entity/slide";



export default function DesignItem({ designData }) {

    const selectDesign = () => {
        console.log("design from ", slide(session.CURRENT_SLIDE).slideData().style.id,
            "  to ", designData.id
        );
    }

    return (
        <img onClick={selectDesign} keywords={designData.keywords ? designData.keywords.join(",") : ""} layoutid={designData.layout.id} className="col-6 px-1 mb-1" src={designData.prevFile} />
    )

}