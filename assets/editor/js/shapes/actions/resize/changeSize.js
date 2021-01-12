import session from "Editor/js/session";
import constants from "Editor/js/constants";
import calculateMouseDiff from "Editor/js/shapes/actions/drag/utils/calculateMouseDiff";
import { resizeCircleContainer, relocateResizeCircleContainer } from "./utils/copyTransform";


/**
 * 
 * @param {MouseEvent} event 
 */
export default function changeSize(event) {
    if (session.SHAPE_STATE != "RESIZING") return;
    if (!session.SCALING_DIRECTION) return;
    if (!session.SAVED_MOUSE_POS) return;
    if (session.SELECTED_ELEMENTS.length == 0) return;

    const mouseDiff = calculateMouseDiff(event);
    const area = getMouseDiffArea(mouseDiff);

    session.SELECTED_ELEMENTS.forEach(selectedEl => {
        // Ignore line
        if (selectedEl.shape.classList.contains("com.sun.star.drawing.LineShape"))
            return;

        let mvX;
        let mvY;

        if (Math.abs(mouseDiff.y / mouseDiff.x) > selectedEl.size.slope) {
            mvX = mouseDiff.x * 1;
            mvY = Math.sign(mouseDiff.y) * ((Math.abs(mouseDiff.x) * selectedEl.size.slope));
        }
        else {
            mvX = Math.sign(mouseDiff.x) * ((Math.abs(mouseDiff.y) / selectedEl.size.slope));
            mvY = mouseDiff.y * 1;
        }
        const diffRatio = mvX / selectedEl.size.width;
        let newScale = selectedEl.scale.startingA + diffRatio;

        const firstRelatedX = selectedEl.scale.startingA * selectedEl.size.x;
        const firstRelatedY = selectedEl.scale.startingA * selectedEl.size.y;
        const newRelatedX = newScale * selectedEl.size.x;
        const newRelatedY = newScale * selectedEl.size.y;

        switch (session.SCALING_DIRECTION) {
            case "t":
                if (selectedEl.shapeType == constants.SHAPE_TYPES.TEXTBOX) {
                    const newHeight = parseInt(selectedEl.size.height - mouseDiff.y);
                    if (newHeight < 1000) return;
                    selectedEl.shape.setAttribute("height", newHeight + "px");
                    selectedEl.shape.querySelector("foreignObject").setAttribute("height", newHeight + "px");

                    selectedEl.translate.transform.setTranslate(
                        selectedEl.translate.startingE,
                        selectedEl.translate.startingF + mouseDiff.y
                    );

                    relocateResizeCircleContainer(selectedEl.shape);
                }
                break;
            case "r":
                if (selectedEl.shapeType == constants.SHAPE_TYPES.TEXTBOX) {
                    const newWidth = parseInt(selectedEl.size.width + mouseDiff.x);
                    if (newWidth < 2000) return;
                    selectedEl.shape.setAttribute("width", newWidth + "px");
                    selectedEl.shape.querySelector("foreignObject").setAttribute("width", newWidth + "px");
                    relocateResizeCircleContainer(selectedEl.shape);

                }
                break;
            case "b":
                if (selectedEl.shapeType == constants.SHAPE_TYPES.TEXTBOX) {
                    const newHeight = parseInt(selectedEl.size.height + mouseDiff.y);
                    if (newHeight < 1000) return;
                    selectedEl.shape.setAttribute("height", newHeight + "px");
                    selectedEl.shape.querySelector("foreignObject").setAttribute("height", newHeight + "px");
                    relocateResizeCircleContainer(selectedEl.shape);
                }
                break;
            case "l":
                if (selectedEl.shapeType == constants.SHAPE_TYPES.TEXTBOX) {
                    const newWidth = parseInt(selectedEl.size.width - mouseDiff.x);
                    if (newWidth < 2000) return;
                    selectedEl.shape.setAttribute("width", newWidth + "px");
                    selectedEl.shape.querySelector("foreignObject").setAttribute("width", newWidth + "px");

                    selectedEl.translate.transform.setTranslate(
                        selectedEl.translate.startingE + mouseDiff.x,
                        selectedEl.translate.startingF
                    );

                    relocateResizeCircleContainer(selectedEl.shape);
                }
                break;
            case "lt":
                if ([constants.TRIGONOMETRY_AREAS.SECOND, constants.TRIGONOMETRY_AREAS.FOURTH].includes(area)) {
                    newScale = selectedEl.scale.startingA - diffRatio;
                    if (newScale < 0.14) return;

                    selectedEl.scale.transform.setScale(
                        newScale,
                        newScale
                    );

                    selectedEl.translate.transform.setTranslate(
                        selectedEl.translate.startingE + (newRelatedX - firstRelatedX + mvX),
                        selectedEl.translate.startingF + ((newRelatedY - firstRelatedY) + mvY),
                    );

                    resizeCircleContainer(selectedEl.shape, newScale);
                }
                break;
            case "rt":
                if ([constants.TRIGONOMETRY_AREAS.FIRST, constants.TRIGONOMETRY_AREAS.THIRD].includes(area)) {
                    if (newScale < 0.14) return;
                    selectedEl.scale.transform.setScale(
                        newScale,
                        newScale
                    );

                    selectedEl.translate.transform.setTranslate(
                        selectedEl.translate.startingE - (newRelatedX - firstRelatedX),
                        selectedEl.translate.startingF - ((newRelatedY - firstRelatedY) - mvY),
                    );
                    resizeCircleContainer(selectedEl.shape, newScale);
                }
                break;
            case "rb":
                if ([constants.TRIGONOMETRY_AREAS.FOURTH, constants.TRIGONOMETRY_AREAS.SECOND].includes(area)) {
                    if (newScale < 0.14) return;
                    selectedEl.scale.transform.setScale(
                        newScale,
                        newScale
                    );
                    selectedEl.translate.transform.setTranslate(
                        selectedEl.translate.startingE - (newRelatedX - firstRelatedX),
                        selectedEl.translate.startingF - (newRelatedY - firstRelatedY),
                    );
                    resizeCircleContainer(selectedEl.shape, newScale);
                }
                break;
            case "lb":

                if ([constants.TRIGONOMETRY_AREAS.FIRST, constants.TRIGONOMETRY_AREAS.THIRD].includes(area)) {
                    newScale = selectedEl.scale.startingA - diffRatio;
                    if (newScale < 0.14) return;
                    selectedEl.scale.transform.setScale(
                        newScale,
                        newScale
                    );
                    selectedEl.translate.transform.setTranslate(
                        selectedEl.translate.startingE + ((newRelatedX - firstRelatedX) + mvX),
                        selectedEl.translate.startingF + ((newRelatedY - firstRelatedY)),
                    );

                    resizeCircleContainer(selectedEl.shape, newScale);
                }
                break;
            default: break;

        }

    });

    return;
    switch (direction) {
        case "lt":

            break;
        case "t":
            break;
        case "rt":
            break;
        case "r":
            break;
        case "rb":
            break;
        case "b":
            break;
        case "lb":
            break;
        case "l":
            break;
        default:
            break;
    }
    session.SELECTED_ELEMENTS.forEach(selectedEl => {

    });



}

/**
 * 
 * @param {{x:number,y:number}} mouseDiff 
 * @returns {TRIGONOMETRY_AREA} area
 */
const getMouseDiffArea = (mouseDiff) => {
    let area;
    if (mouseDiff.x >= 0 && mouseDiff.y <= 0)
        area = constants.TRIGONOMETRY_AREAS.FIRST;
    else if (mouseDiff.x <= 0 && mouseDiff.y <= 0)
        area = constants.TRIGONOMETRY_AREAS.SECOND;
    else if (mouseDiff.x <= 0 && mouseDiff.y >= 0)
        area = constants.TRIGONOMETRY_AREAS.THIRD;
    else if (mouseDiff.x >= 0 && mouseDiff.y >= 0)
        area = constants.TRIGONOMETRY_AREAS.FOURTH;
    return area;
}