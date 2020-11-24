import shape from "Editor/js/entity/shape";

export default function selectH1Image(slideId, shapeId, imageId = null) {
    let shapeData = shape(slideId, shapeId).data();

    if (!imageId)
        imageId = shapeData.image.id;

    let imageUrl;
    shapeData.images.forEach(image => {
        if (image.id == imageId)
            imageUrl = image.url;
    });

    let g = shape(slideId, shapeId).el();
    g.querySelector("image").setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", imageUrl);
}