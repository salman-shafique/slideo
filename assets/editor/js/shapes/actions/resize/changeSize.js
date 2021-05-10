import session from "Editor/js/session";
import constants from "Editor/js/constants";
import calculateMouseDiff from "Editor/js/shapes/actions/drag/utils/calculateMouseDiff";
import { resizeCircleContainer, relocateResizeCircleContainer } from "./utils/copyTransform";

const ICON_CLASSES = '.edit-textbox-icon, .replace-icon, .image-icon';
const ICON_SIZE = 1600;
const ICON_MAX_PADDING = 180;
const changeShapeIconSize = (shape, newScaleX = null, newScaleY = null) => {

    const icon = Array.from(shape.querySelectorAll(ICON_CLASSES))[0];
    if (!icon) return;

    const parsedScale = shape.getAttribute('transform').split(') ')
        .filter(item => item.includes('scale('))[0]
        .replace('scale(', '').split(' ');

    const shapeBoxSize = Math.min(parseInt(shape.getAttribute('height')) * parsedScale[0], parseInt(shape.getAttribute('width')) * parsedScale[1]);

    if (shapeBoxSize - ICON_MAX_PADDING < ICON_SIZE) {
        const desiredIconSize = (shapeBoxSize - ICON_MAX_PADDING) / ICON_SIZE;
        icon.style.transform = `scale(${desiredIconSize * 1 / parsedScale[0]}, ${desiredIconSize * 1 / parsedScale[1]})`;
    } else if (newScaleX || newScaleY) {
        icon.style.transform = `scale(${1 / newScaleX}, ${1 / newScaleY})`;
    } else {
        icon.style.transform = `scale(${1 / parsedScale[0]}, ${1 / parsedScale[1]})`;
    }
}


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

        let mvX, mvY, diff;


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
                    const newHeight = parseInt(selectedEl.size.height - mouseDiff.y / selectedEl.scale.startingA);
                    if (newHeight < 1000) return;
                    selectedEl.shape.setAttribute("height", newHeight + "px");
                    selectedEl.shape.querySelector("foreignObject").setAttribute("height", newHeight + "px");
                    selectedEl.translate.transform.setTranslate(
                        selectedEl.translate.startingE,
                        selectedEl.translate.startingF + mouseDiff.y
                    );

                    changeShapeIconSize(selectedEl.shape);

                    relocateResizeCircleContainer(selectedEl.shape);
                    break;
                }
                // Image crop
                if (selectedEl.shapeType == constants.SHAPE_TYPES.IMAGE) {
                    diff = parseInt((mouseDiff.y) / selectedEl.scale.startingA / selectedEl.size.height * 100);

                    // 10% safe zone
                    if (selectedEl.crop.lb.startingY - (selectedEl.crop.lt.startingY + diff) <= 10) return;
                    // Limits
                    if (selectedEl.crop.lt.startingY + diff < 0) return;

                    selectedEl.shape.querySelector("image").style.clipPath = `polygon(
                        ${selectedEl.crop.lt.startingX}% ${selectedEl.crop.lt.startingY + diff}%, 
                        ${selectedEl.crop.rt.startingX}% ${selectedEl.crop.rt.startingY + diff}%, 
                        ${selectedEl.crop.rb.startingX}% ${selectedEl.crop.rb.startingY}%, 
                        ${selectedEl.crop.lb.startingX}% ${selectedEl.crop.lb.startingY}%
                    )`;

                    changeShapeIconSize(selectedEl.shape);

                    relocateResizeCircleContainer(selectedEl.shape);
                    break;
                }

                break;
            case "r":
                if (selectedEl.shapeType == constants.SHAPE_TYPES.TEXTBOX) {
                    const newWidth = parseInt(selectedEl.size.width + mouseDiff.x / selectedEl.scale.startingA);
                    if (newWidth < 2000) return;
                    selectedEl.shape.setAttribute("width", newWidth + "px");
                    selectedEl.shape.querySelector("foreignObject").setAttribute("width", newWidth + "px");

                    changeShapeIconSize(selectedEl.shape);
                    relocateResizeCircleContainer(selectedEl.shape);
                    break;
                }
                // Image crop
                if (selectedEl.shapeType == constants.SHAPE_TYPES.IMAGE) {
                    diff = parseInt((mouseDiff.x) / selectedEl.scale.startingA / selectedEl.size.width * 100);

                    // 10% safe zone
                    if (selectedEl.crop.rt.startingX + diff - selectedEl.crop.lt.startingX <= 10) return;
                    // Limits
                    if (selectedEl.crop.rt.startingX + diff > 100) return;

                    selectedEl.shape.querySelector("image").style.clipPath = `polygon(
                        ${selectedEl.crop.lt.startingX}% ${selectedEl.crop.lt.startingY}%, 
                        ${selectedEl.crop.rt.startingX + diff}% ${selectedEl.crop.rt.startingY}%, 
                        ${selectedEl.crop.rb.startingX + diff}% ${selectedEl.crop.rb.startingY}%, 
                        ${selectedEl.crop.lb.startingX}% ${selectedEl.crop.lb.startingY}%
                    )`;

                    changeShapeIconSize(selectedEl.shape);
                    relocateResizeCircleContainer(selectedEl.shape);
                    break;
                }
                break;
            case "b":
                if (selectedEl.shapeType == constants.SHAPE_TYPES.TEXTBOX) {
                    const newHeight = parseInt(selectedEl.size.height + mouseDiff.y / selectedEl.scale.startingA);
                    if (newHeight < 1000) return;
                    selectedEl.shape.setAttribute("height", newHeight + "px");
                    selectedEl.shape.querySelector("foreignObject").setAttribute("height", newHeight + "px");

                    changeShapeIconSize(selectedEl.shape);
                    relocateResizeCircleContainer(selectedEl.shape);
                    break;
                }
                // Image crop
                if (selectedEl.shapeType == constants.SHAPE_TYPES.IMAGE) {
                    diff = parseInt((mouseDiff.y) / selectedEl.scale.startingA / selectedEl.size.height * 100);

                    // 10% safe zone
                    if (selectedEl.crop.rb.startingY + diff - selectedEl.crop.rt.startingY <= 10) return;
                    // Limits
                    if (selectedEl.crop.rb.startingY + diff > 100) return;

                    selectedEl.shape.querySelector("image").style.clipPath = `polygon(
                        ${selectedEl.crop.lt.startingX}% ${selectedEl.crop.lt.startingY}%, 
                        ${selectedEl.crop.rt.startingX}% ${selectedEl.crop.rt.startingY}%, 
                        ${selectedEl.crop.rb.startingX}% ${selectedEl.crop.rb.startingY + diff}%, 
                        ${selectedEl.crop.lb.startingX}% ${selectedEl.crop.lb.startingY + diff}%
                    )`;

                    changeShapeIconSize(selectedEl.shape);
                    relocateResizeCircleContainer(selectedEl.shape);
                    break;
                }
                break;
            case "l":
                if (selectedEl.shapeType == constants.SHAPE_TYPES.TEXTBOX) {
                    const newWidth = parseInt(selectedEl.size.width - mouseDiff.x / selectedEl.scale.startingA);
                    if (newWidth < 2000) return;
                    selectedEl.shape.setAttribute("width", newWidth + "px");
                    selectedEl.shape.querySelector("foreignObject").setAttribute("width", newWidth + "px");
                    selectedEl.translate.transform.setTranslate(
                        selectedEl.translate.startingE + mouseDiff.x,
                        selectedEl.translate.startingF
                    );

                    changeShapeIconSize(selectedEl.shape);
                    relocateResizeCircleContainer(selectedEl.shape);
                    break;
                }
                // Image crop
                if (selectedEl.shapeType == constants.SHAPE_TYPES.IMAGE) {
                    diff = parseInt((mouseDiff.x) / selectedEl.scale.startingA / selectedEl.size.width * 100);

                    // 10% safe zone
                    if (selectedEl.crop.rt.startingX - (selectedEl.crop.lt.startingX + diff) <= 10) return;
                    // Limits
                    if (selectedEl.crop.lt.startingX + diff < 0) return;

                    selectedEl.shape.querySelector("image").style.clipPath = `polygon(
                        ${selectedEl.crop.lt.startingX + diff}% ${selectedEl.crop.lt.startingY}%, 
                        ${selectedEl.crop.rt.startingX}% ${selectedEl.crop.rt.startingY}%, 
                        ${selectedEl.crop.rb.startingX}% ${selectedEl.crop.rb.startingY}%, 
                        ${selectedEl.crop.lb.startingX + diff}% ${selectedEl.crop.lb.startingY}%
                    )`;

                    changeShapeIconSize(selectedEl.shape);
                    relocateResizeCircleContainer(selectedEl.shape);
                    break;
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

                    changeShapeIconSize(selectedEl.shape, newScale, newScale);

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

                    changeShapeIconSize(selectedEl.shape, newScale, newScale);

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

                    changeShapeIconSize(selectedEl.shape, newScale, newScale);

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

                    changeShapeIconSize(selectedEl.shape, newScale, newScale);

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