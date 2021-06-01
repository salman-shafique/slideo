import shape from "Editor/js/entity/shape";
import selectH1Image from "Editor/js/shapes/image/selectH1Image";
import apiService from "Editor/js/utils/apiService";
import appendImages from "Editor/js/sidebar/images/appendImages";


export default function h1Image(slideId, shapeId, keyword) {
    let shapeData = shape(slideId, shapeId).data();
    if (!shapeData.image) {
        apiService({
            url: "/api/editor/image/h1Image",
            data: {
                "slideId": slideId,
                "shapeId": shapeId,
                "keyword": keyword
            },
            success: (response) => {
                if (response.success) {
                    const shapeData = shape(response.slideId, response.shapeId).data();
                    if (!shapeData) return;
                    shapeData.image = response.images[0];
                    shapeData.keyword = response.keyword;
                    selectH1Image(response.slideId, response.shapeId, response.images[0]);
                    appendImages(response.images, response.keyword);
                }
            }
        });
    } else {
        selectH1Image(slideId, shapeId, shapeData.image);
    }

}