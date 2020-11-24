import slide from "Editor/js/entity/slide";
import shape from "Editor/js/entity/shape";
import selectH1Image from "Editor/js/shapes/image/selectH1Image";



export default function h1Image(slideId, shapeId, keyword) {
    let shapeData = shape(slideId, shapeId).data();
    if (!shapeData.images) {
        $.ajax({
            method: "POST",
            url: "/api/editor/image/h1Image",
            dataType: "json",
            data: {
                "slideId": slideId,
                "shapeId": shapeId,
                "keyword": keyword
            },
            success: function (result) {
                let shapeData = shape(slideId, shapeId).data();
                shapeData['image'] = result.serializedShape.data.image;
                shapeData['images'] = result.serializedShape.data.images;
                selectH1Image(result.slideId, result.shapeId);
            }
        })
    } else {
        selectH1Image(slideId, shapeId);
    }

}