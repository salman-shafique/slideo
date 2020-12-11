import React from "react";
import session from "Editor/js/session";
import apiService from "Editor/js/utils/apiService";
import slide from "Editor/js/entity/slide";



export default function LayoutItem({ layoutData }) {

    return (
        <img className="col-6 px-1 mb-1" src={layoutData.prevFile} />
    )

}