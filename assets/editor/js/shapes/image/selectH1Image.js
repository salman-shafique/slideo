import shape from "Editor/js/entity/shape";
import insertImageUrl from "./insertImageUrl";

/**
 * 
 * @param {string} slideId 
 * @param {string} shapeId 
 * @param {{height:number,width:number,id:number,photographer:string,photographer_url:string,url:string}} image 
 */

export default function selectH1Image(slideId, shapeId, image = null) {
    let shapeData = shape(slideId, shapeId).data();

    if(image)
        shapeData.image = image;
        
    let g = shape(slideId, shapeId).el();
    insertImageUrl(g, shapeData.image.url);
}