import shape from "Editor/js/entity/shape";
import changeIconColor from "./changeIconColor";

/**
 * 
 * @param {string} slideId 
 * @param {string} shapeId 
 * @param {{id:string,url:string,uploader_id:string}} icon
 */
export default function selectIcon(slideId, shapeId, icon = null) {
    let shape_ = shape(slideId, shapeId);
    let shapeData = shape_.data();

    if (icon)
        shapeData.icon = icon;

    if (shapeData.icon.rgb != shapeData.rgb)
        changeIconColor(slideId, shapeId, shapeData.icon, shapeData.rgb)

    let image = shape_.el().querySelector("image");
    image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", shapeData.icon.url);
}