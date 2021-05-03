import session from "Editor/js/session";
import shape from "Editor/js/entity/shape";
import sidebar from "Editor/js/entity/sidebar";
import { addToImagesBar } from "Editor/js/sidebar/images/searchBox";
import createForeignObject from './createForeignObject';


/**
 * 
 * @param {Event} event 
 */
export default function selectImageElement(event) {
    const g = event.target.parentElement;
    const shapeId = g.getAttribute("shape_id");
    const shape_ = shape(session.CURRENT_SLIDE, shapeId);

    if (!shape_.el().querySelector('foreignObject'))
        createForeignObject(shape_.el());

    const shapeData = shape_.data();
    addToImagesBar(shapeData.keyword);
}