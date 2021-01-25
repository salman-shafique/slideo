import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import shape from "Editor/js/entity/shape";


/**
 * 
 * @param {{id: number,url:string}} icon 
 */

export default function highlightIcon(icon) {
    $("#sideBarIcons *[iconid]").removeClass("active");
    if (!icon) return;
    if (!icon.id) return;
    if (session.SELECTED_ELEMENTS.length != 1) return;

    // Icon is here
    const prevIcon = document.querySelector("#sideBarIcons *[iconid='" + icon.id + "']");
    if (prevIcon) {
        prevIcon.classList.add("active");
        return;
    }
    // Wait for the icon
    let counter = 0;
    const waiter = setInterval(() => {
        const prevIcon = document.querySelector("#sideBarIcons *[iconid='" + icon.id + "']");
        if (prevIcon) {
            prevIcon.classList.add("active");
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


window.addEventListener("shape.allReleased", highlightIcon);
window.addEventListener("shape.selected", () => {
    if (session.SELECTED_ELEMENTS.length != 1) return;
    const g = session.SELECTED_ELEMENTS[0].shape;
    if (getShapeType(g) != constants.SHAPE_TYPES.ICON) return;

    const shape_ = shape(session.CURRENT_SLIDE, g.getAttribute("shape_id"));
    const data = shape_.data();
    if (data)
        highlightIcon(data.icon);
})