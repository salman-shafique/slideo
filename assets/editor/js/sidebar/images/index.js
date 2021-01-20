import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import shape from "Editor/js/entity/shape";
import toggleKeyword from "./toggleKeyword";
import "./searchBox";
import "./upload";

const showEmptyList = () => {
    $('#Images_Panel div[data-keyword].search-keyword').removeClass("active");
    $('#Images_Panel div[data-keyword].search-keyword').css("opacity", "0.7");
    $('#sideBarImages div[data-keyword].image-container').hide();
    document.querySelector("#sideBarImagesEmpty").style.display = "";
}

// Show empty icon list when all released
window.addEventListener("shape.allReleased", showEmptyList);
window.addEventListener("shape.selected", () => {
    if (session.SELECTED_ELEMENTS.length != 1) return;
    const g = session.SELECTED_ELEMENTS[0].shape;
    if (getShapeType(g) == constants.SHAPE_TYPES.IMAGE) {
        const shape_ = shape(session.CURRENT_SLIDE, g.getAttribute("shape_id"));
        const keyword = shape_.data().keyword;
        if (keyword)
            toggleKeyword(keyword);

        return;
    };

    showEmptyList();
})
