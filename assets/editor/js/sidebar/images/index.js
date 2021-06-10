import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import shape from "Editor/js/entity/shape";
import toggleKeyword from "./toggleKeyword";
import "./searchBox";
import "./upload";
import Events from "Editor/js/Events";
import {addToImagesBar} from "./searchBox"
import React from "react"
import slide from "../../entity/slide";

const showEmptyList = () => {
    $('#Images_Panel div[data-keyword].search-keyword').removeClass("active");
    $('#Images_Panel div[data-keyword].search-keyword').css("opacity", "0.5");
    $('#sideBarImages div[data-keyword].image-container').hide();
    document.querySelector("#sideBarImagesEmpty").style.display = "";
} 

Events.listen("presentation.inited", () => {
    const slides = session.PRESENTATION.slides.map(slide => slide.analyzedContent)
    const analyzedContents = slides.map(a => a.map(ac => ac))
    const analyzedData = analyzedContents.map(e => e[0])
   
    analyzedData.map(d => {
        for (const property in analyzedData) {
        if(d[property]){
            d[property].data.keyword ? addToImagesBar(d[property].data.keyword) : null;
        }
      }
    })
})


// Show empty image list when all released
Events.listen("shape.allReleased", showEmptyList);

Events.listen("shape.selected", () => {
    if (session.SELECTED_ELEMENTS.length != 1) return;
    const g = session.SELECTED_ELEMENTS[0].shape;
    if (getShapeType(g) == constants.SHAPE_TYPES.IMAGE) {
        const shape_ = shape(session.CURRENT_SLIDE, g.getAttribute("shape_id"));
        const data = shape_.data();
        if(!data) return;
        if (data.keyword)
            toggleKeyword(data.keyword);


        return;
    };

    showEmptyList();
})



