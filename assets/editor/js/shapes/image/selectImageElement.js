import session from "Editor/js/session";
import shape from "Editor/js/entity/shape";
import sidebar from "Editor/js/entity/sidebar";
import { addToImagesBar } from "Editor/js/sidebar/images/searchBox";

/**
 * 
 * @param {Event} event 
 */
export default function selectImageElement(event) {
    let g = event.target.parentElement;
    let shapeId = g.getAttribute("shape_id");
    let shape_ = shape(session.CURRENT_SLIDE, shapeId);
    let shapeData = shape_.data();
    sidebar().open("Images_Tool");
    addToImagesBar(shapeData.keyword);
}