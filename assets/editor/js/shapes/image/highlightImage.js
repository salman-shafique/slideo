import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import shape from "Editor/js/entity/shape";


/**
 * 
 * @param {{id: number,url:string}} image 
 */

export default function highlightImage(image) {
    $("#sideBarImages *[imageid]").removeClass("active");
    if (!image) return;
    if (!image.id) return;
    if (session.SELECTED_ELEMENTS.length != 1) return;

    // Image is here
    const prevImage = document.querySelector("#sideBarImages *[imageid='" + image.id + "']");
    if (prevImage) {
        prevImage.classList.add("active");
        return;
    }
    // Wait for the image
    let counter = 0;
    const waiter = setInterval(() => {
        const prevImage = document.querySelector("#sideBarImages *[imageid='" + image.id + "']");
        if (prevImage) {
            prevImage.classList.add("active");
            clearInterval(waiter);
            return;
        }
        if (counter > 15) {
            clearInterval(waiter);
            return;
        }
        counter++;
    }, 200)
}


window.addEventListener("shape.allReleased", highlightImage);
window.addEventListener("shape.selected", (event) => {
    if (session.SELECTED_ELEMENTS.length != 1) return;
    const g = session.SELECTED_ELEMENTS[0].shape;
    if (getShapeType(g) != constants.SHAPE_TYPES.IMAGE) return;

    const shape_ = shape(session.CURRENT_SLIDE, g.getAttribute("shape_id"));
    highlightImage(shape_.data().image);
})