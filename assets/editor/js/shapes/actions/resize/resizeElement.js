import { showResizeCircles } from "./insertResizeCircles";
import shape from "Editor/js/entity/shape";

export default function resizeElement(event) {
    const g = event.target.parentElement;
    showResizeCircles(g);

    // const shapeId = g.getAttribute("shape_id");
    // const shape_ = shape(session.CURRENT_SLIDE, shapeId);
    // const shapeData = shape_.data();
    // addToImagesBar(shapeData.keyword);
}