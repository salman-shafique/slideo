import React from "react";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import shape from "Editor/js/entity/shape";
import ColorCircle from "Editor/js/sidebar/components/ColorCircle/index";
import getFillType from "Editor/js/shapes/actions/color/getFillType";


export default function ShapeOptions() {
    const [allSame, setAllSame] = React.useState(false);
    const [fillType, setFillType] = React.useState(null);


    React.useEffect(() => {
        window.addEventListener("shape.selected", () => {
            let storedFillType = null;
            let allSame_ = true;
            session.SELECTED_ELEMENTS.forEach(selectedEl => {
                if (getShapeType(selectedEl.shape) == constants.SHAPE_TYPES.AUTO_SHAPE) {
                    const fillType_ = getFillType(selectedEl.shape);
                    if (storedFillType == null)
                        storedFillType = fillType_;

                    if (storedFillType != fillType_)
                        allSame_ = false;
                }
            });

            allSame_
                ? setFillType(storedFillType)
                : setFillType(null)

            setAllSame(allSame_);
            console.log(
                "storedFillType", storedFillType,
                "allSame_", allSame_);
        });
    }, []);

    let attributes;

    if (allSame) {
        if (fillType == constants.FILL_TYPES.SOLID_FILL) {
            attributes =
                <>
                    <div className="col-9 d-flex align-items-center">
                        Fill color:
                    </div>
                    <div className="col-3 position-static pt-1">
                        <ColorCircle
                            key="solidFill"
                            SHAPE_TYPE={constants.SHAPE_TYPES.AUTO_SHAPE}
                            FILL_TYPE={constants.FILL_TYPES.SOLID_FILL}
                        />
                    </div>
                    <div className="col-9 d-flex align-items-center">
                        Opacity:
                    </div>
                    <div className="col-3 position-static pt-1">
                        Opacity slider
                    </div>
                </>

        } else if (fillType == constants.FILL_TYPES.GRADIENT_FILL) {
            attributes =
                <>
                    <div className="col-9 d-flex align-items-center">
                        Stop 0:
                    </div>
                    <div className="col-3 position-static pt-1">
                        <ColorCircle
                            key="gradFill0"
                            SHAPE_TYPE={constants.SHAPE_TYPES.AUTO_SHAPE}
                            FILL_TYPE={constants.FILL_TYPES.GRADIENT_FILL}
                            GRADIENT_STOP={0} />
                    </div>
                    <div className="col-9 d-flex align-items-center">
                        Stop 1:
                    </div>
                    <div className="col-3 position-static pt-1">
                        <ColorCircle
                            key="gradFill1"
                            SHAPE_TYPE={constants.SHAPE_TYPES.AUTO_SHAPE}
                            FILL_TYPE={constants.FILL_TYPES.GRADIENT_FILL}
                            GRADIENT_STOP={1} />
                    </div>
                </>
        }
    }
    else
        attributes = "Multiple shapes with different fill types selected";


    return (
        <div className="row mx-0 mt-3 bg-white rounded">
            {attributes}
        </div>
    )
}