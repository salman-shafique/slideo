import constants from "Editor/js/constants";
import session from "Editor/js/session";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import shape from "Editor/js/entity/shape";
/**
 * 
 * @param {SVGGElement} g 
 */
export default function getClipPath(g) {
    let clipPath = {
        lt: {
            startingX: 0,
            startingY: 0
        },
        rt: {
            startingX: 100,
            startingY: 0
        },
        rb: {
            startingX: 100,
            startingY: 100
        },
        lb: {
            startingX: 0,
            startingY: 100
        }
    };
    if (getShapeType(g) != constants.SHAPE_TYPES.IMAGE) return clipPath;

    let clipPathOfShape = g.querySelector("image").style.clipPath;
    if (clipPathOfShape) {
        clipPathOfShape = clipPathOfShape.replace(/(polygon\()|(%)|(\))/g, "").split(",");
        clipPath.lt.startingX = parseFloat(clipPathOfShape[0].trim().split(" ")[0]);
        clipPath.lt.startingY = parseFloat(clipPathOfShape[0].trim().split(" ")[1]);
        clipPath.rt.startingX = parseFloat(clipPathOfShape[1].trim().split(" ")[0]);
        clipPath.rt.startingY = parseFloat(clipPathOfShape[1].trim().split(" ")[1]);
        clipPath.rb.startingX = parseFloat(clipPathOfShape[2].trim().split(" ")[0]);
        clipPath.rb.startingY = parseFloat(clipPathOfShape[2].trim().split(" ")[1]);
        clipPath.lb.startingX = parseFloat(clipPathOfShape[3].trim().split(" ")[0]);
        clipPath.lb.startingY = parseFloat(clipPathOfShape[3].trim().split(" ")[1]);
    } else {
        // try to get from data
        const shape_ = shape(session.CURRENT_SLIDE, g.getAttribute("shape_id"));
        const data = shape_.data();
        if (data.allTransforms && data.allTransforms.crop) 
            clipPath = data.allTransforms.crop;
        
    }
    return clipPath;
}