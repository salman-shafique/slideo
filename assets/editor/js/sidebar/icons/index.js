import React from "react";
import ReactDOM from "react-dom";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import shape from "Editor/js/entity/shape";
import toggleKeyword from "./toggleKeyword";
import "./searchBox";
import ColorCircle from "Editor/js/sidebar/components/ColorCircle/index";

const showEmptyList = () => {
    $('#Icons_Panel div[data-keyword].search-keyword').removeClass("active");
    $('#Icons_Panel div[data-keyword].search-keyword').css("opacity", "0.5");
    $('#sideBarIcons div[data-keyword].icon-container').hide();
    document.querySelector("#sideBarIconsEmpty").style.display = "";
}

// Show empty icon list when all released
window.addEventListener("shape.allReleased", showEmptyList);
window.addEventListener("shape.selected", () => {
    if (session.SELECTED_ELEMENTS.length != 1) return;
    const g = session.SELECTED_ELEMENTS[0].shape;
    if (getShapeType(g) == constants.SHAPE_TYPES.ICON) {
        const shape_ = shape(session.CURRENT_SLIDE, g.getAttribute("shape_id"));
        const data = shape_.data();
        if (!data) return;
        if (data.keyword)
            toggleKeyword(data.keyword);

        return;
    };

    showEmptyList();
})


ReactDOM.render(<ColorCircle key={"icon"} SHAPE_TYPE={constants.SHAPE_TYPES.ICON} />, document.getElementById("Icon_color"));