import shape from "Editor/js/entity/shape";
import insertImageUrl from "./insertImageUrl";

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
    insertImageUrl(g, imageUrl);
}