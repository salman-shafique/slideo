import shape from "Editor/js/entity/shape";
import changeIconColor from "./changeIconColor";

/**
 * 
 * @param {string} slideId 
 * @param {string} shapeId 
 * @param {string} iconId 
 */
export default function selectIcon(slideId, shapeId, iconId = null) {
    let shape_ = shape(slideId, shapeId);
    let shapeData = shape_.data();

    if (!iconId)
        iconId = shapeData.icon.id;

    let icon;
    shapeData.icons.forEach(icon_ => {
        if (icon_.id == iconId)
            icon = icon_;
    });

    if (icon.rgb != shapeData.rgb)
        changeIconColor(slideId, shapeId, iconId, shapeData.rgb)

    let image = shape_.el().querySelector("image");
    image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", icon.url);
}