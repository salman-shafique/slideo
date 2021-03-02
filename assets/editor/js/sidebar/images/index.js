import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import shape from "Editor/js/entity/shape";
import toggleKeyword from "./toggleKeyword";
import "./searchBox";
import "./upload";
import Events from "Editor/js/Events";

const showEmptyList = () => {
    $('#Images_Panel div[data-keyword].search-keyword').removeClass("active");
    $('#Images_Panel div[data-keyword].search-keyword').css("opacity", "0.5");
    $('#sideBarImages div[data-keyword].image-container').hide();
    document.querySelector("#sideBarImagesEmpty").style.display = "";
}

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
