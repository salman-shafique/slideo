import shape from "Editor/js/entity/shape";
import insertImageUrl from "./insertImageUrl";

/**
 * 
 * @param {string} slideId 
 * @param {string} shapeId 
 * @param {{height:number,width:number,id:number,photographer:string,photographer_url:string,url:string}} image 
 */

export default function selectH1Image(slideId, shapeId, image = null) {
    const shape_ = shape(slideId, shapeId);
    let shapeData = shape_.data();

    if (image)
        shapeData.image = image;
    shape_.setImage(shapeData.image);

    let g = shape_.el();
    insertImageUrl(g, shapeData.image.url);
}