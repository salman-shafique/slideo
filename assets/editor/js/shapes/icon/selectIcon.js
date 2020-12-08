import shape from "Editor/js/entity/shape";
import getWhiteIcon from "./getWhiteIcon";

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

    if (shapeData.icon.rgb != "255 255 255")
        getWhiteIcon(slideId, shapeId)

    let image = shape_.el().querySelector("image");
    image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", shapeData.icon.url);
}