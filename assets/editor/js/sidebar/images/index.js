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

const showEmptyList = () => {
    $('#Images_Panel div[data-keyword].search-keyword').removeClass("active");
    $('#Images_Panel div[data-keyword].search-keyword').css("opacity", "0.5");
    $('#sideBarImages div[data-keyword].image-container').hide();
    document.querySelector("#sideBarImagesEmpty").style.display = "";
} 

Events.listen("presentation.inited", () => {
    const slide = session.PRESENTATION.slides.map(e => e.analyzedContent)
    const analizedc = slide.map(e => e.map(d => d))
    const d = analizedc.map(k=> k[0])
   
    d.map(k => {
        for (const p in k) {
        if(k[p]){
            k[p].data.keyword ? addToImagesBar(k[p].data.keyword) : null;
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



