import shape from "Editor/js/entity/shape";
import Events from "../../Events";
import getWhiteIcon from "./getWhiteIcon";
import createForeignObject from './createForeignObject';

export const updateIcon = (slideId, shapeId, icon, changed) => {
    const shape_ = shape(slideId, shapeId);
    const shapeData = shape_.data();

    shapeData.icon = icon;
    shapeData.isIconChanged = changed;

    if (icon.keyword)
        shapeData.keyword = icon.keyword

    shape_.setIcon(shapeData.icon); 

    const image = shape_.el().querySelector("image");
    image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", shapeData.icon.url);

    if (shapeData.icon.rgb != "255 255 255")
        getWhiteIcon(slideId, shapeId)
}



/**
 * 
 * @param {string} slideId 
 * @param {string} shapeId 
 * @param {{id:string,url:string,uploader_id:string}} icon
 */
export default function selectIcon(slideId, shapeId, icon = null) {
    const shape_ = shape(slideId, shapeId);
    const shapeData = shape_.data();
    let changed = false;

    if (!shape_.el()?.querySelector('foreignObject'))
        createForeignObject(shape_.el());

    if (icon) {
        Events.shape.icon.changed({ oldIcon: shapeData.icon, newIcon: icon });
        changed = true;
        updateIcon(slideId, shapeId, icon, changed);
        return;
    }
    updateIcon(slideId, shapeId, shapeData.icon, changed);
}

