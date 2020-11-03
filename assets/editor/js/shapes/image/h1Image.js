import slide from "Editor/js/entity/slide";

export default function h1Image(slideId, shapeId, keyword) {


    console.log("find h1 image for", slideId, shapeId);
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
            console.log(result);
        }
    })

}