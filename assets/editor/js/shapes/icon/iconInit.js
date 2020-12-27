import shape from "Editor/js/entity/shape";
import apiService from "Editor/js/utils/apiService";
import appendIcons from "Editor/js/sidebar/icons/appendIcons";
import selectIcon from "./selectIcon";

export default function iconInit(slideId, shapeId, keyword) {
    let shapeData = shape(slideId, shapeId).data();
    if (!shapeData.icon || !shapeData.icon.url) {
        apiService({
            url: "/api/editor/icon/find",
            data: {
                "slideId": slideId,
                "shapeId": shapeId,
                "keyword": keyword
            },
            success: (response) => {
                if (response.success) {
                    let shapeData = shape(response.slideId, response.shapeId).data();
                    shapeData.icon = response.icons[0];
                    shapeData.keyword = response.keyword;
                    selectIcon(response.slideId, response.shapeId);
                    appendIcons(response.icons, response.keyword);
                }
            }
        });
    } else {
        selectIcon(slideId, shapeId);
    }

}