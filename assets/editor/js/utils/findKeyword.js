import clear_text from "Editor/js/utils/clear_text";
import shape from "Editor/js/entity/shape";


export default function findKeyword(text) {
    text = clear_text(text);
    if (!text) return;

    $.ajax({
        method: "POST",
        url: "/api/call/NLP/extract_keyword",
        dataType: "json",
        data: {
            "text": text
        },
        success: function (result) {
            console.log(result);
            return;
            let shapeData = shape(result.slideId, result.shapeId).data();
            shapeData['image'] = result.serializedShape.data.image;
            shapeData['images'] = result.serializedShape.data.images;
            selectH1Image(result.slideId, result.shapeId);
        }
    })
    // callback();
}