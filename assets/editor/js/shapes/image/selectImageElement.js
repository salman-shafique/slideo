import session from "Editor/js/session";
import shape from "Editor/js/entity/shape";
import sidebar from "Editor/js/entity/sidebar";
import { addToImagesBar } from "Editor/js/sidebar/images/searchBox";


/**
 * 
 * @param {Event} event 
 */
export default function selectImageElement(event) {
    const g = event.target.parentElement;
    const shapeId = g.getAttribute("shape_id");
    const shape_ = shape(session.CURRENT_SLIDE, shapeId);
    const shapeData = shape_.data();
    sidebar.open("Images_Tool");
    addToImagesBar(shapeData.keyword);
}