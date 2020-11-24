import slide from "Editor/js/entity/slide";
import shape from "Editor/js/entity/shape";
import selectH1Image from "Editor/js/shapes/image/selectH1Image";
import apiService from "Editor/js/utils/apiService";



export default function h1Image(slideId, shapeId, keyword) {
    let shapeData = shape(slideId, shapeId).data();
    if (!shapeData.images) {

        apiService({
            url: "/api/editor/image/h1Image",
            data: {
                "slideId": slideId,
                "shapeId": shapeId,
                "keyword": keyword
            },
            success: (response) => {
                let shapeData = shape(slideId, shapeId).data();
                shapeData['image'] = response.serializedShape.data.image;
                shapeData['images'] = response.serializedShape.data.images;
                selectH1Image(response.slideId, response.shapeId);
            }
        });
    } else {
        selectH1Image(slideId, shapeId);
    }

}