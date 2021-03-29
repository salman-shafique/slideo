import shape from "Editor/js/entity/shape";
import Events from "../../Events";
import insertImageUrl from "./insertImageUrl";

export const updateImage = (slideId, shapeId, image) => {
    const shape_ = shape(slideId, shapeId);
    const shapeData = shape_.data();

    shapeData.image = image;

    if (image.keyword)
        shapeData.keyword = image.keyword

    shape_.setImage(shapeData.image);

    insertImageUrl(shape_.el(), shapeData.image.url);
}
/**
 * 
 * @param {string} slideId 
 * @param {string} shapeId 
 * @param {{height:number,width:number,id:number,photographer:string,photographer_url:string,url:string}} image 
 */

export default function selectH1Image(slideId, shapeId, image = null) {
    const shape_ = shape(slideId, shapeId);
    let shapeData = shape_.data();

    if (image) {
        Events.shape.image.changed({ oldImage: shapeData.image, newImage: image });
        updateImage(slideId, shapeId, image);
        return;
    }
    updateImage(slideId, shapeId, shapeData.image);
}