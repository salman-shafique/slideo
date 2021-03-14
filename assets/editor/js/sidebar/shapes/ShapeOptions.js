import React from "react";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import ColorCircle from "Editor/js/sidebar/components/ColorCircle/index";
import OpacitySlider from "Editor/js/sidebar/components/OpacitySlider/OpacitySlider";
import getFillType from "Editor/js/shapes/actions/color/getFillType";
import Events from "Editor/js/Events";
import "./Options.css"

export default function ShapeOptions() {
  const [fillType, setFillType] = React.useState(null);

  React.useEffect(() => {
    Events.listen("shape.selected", () => {
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
    });
  }, []);

  return (
    <>
      <div className={"row mx-0 mt-3 bg-white rounded "}>
        <div className={"row col-12 m-0 p-0 " + (fillType === constants.FILL_TYPES.SOLID_FILL ? "" : "d-none")}>
          <div className="col-9 d-flex align-items-center">
            Shape Color
          </div>
          <div className="col-3 position-static pt-1 main">
            <ColorCircle
              key="solidFill"
              SHAPE_TYPE={constants.SHAPE_TYPES.AUTO_SHAPE}
              FILL_TYPE={constants.FILL_TYPES.SOLID_FILL}
            />
          </div>
        </div>
        <div className={"row col-12 m-0 p-0  " + (fillType === constants.FILL_TYPES.GRADIENT_FILL ? "" : "d-none")}>
          <div className="row col-12 m-0 p-0 ShapeColor1 ">
            <div className="col-9 d-flex align-items-center Shape1  ">
              Shape Color - 1
             </div>
            <div className="col-3  position-static pt-1    ">
              <ColorCircle
                key="gradFill0"
                SHAPE_TYPE={constants.SHAPE_TYPES.AUTO_SHAPE}
                FILL_TYPE={constants.FILL_TYPES.GRADIENT_FILL}
                GRADIENT_STOP={0} />
            </div>
          </div>
          <div className="row col-12 m-0 p-0">
            <div className="col-9 d-flex align-items-center">
              Shape Color - 2
            </div>
            <div className="col-3 position-static pt-1">
              <ColorCircle
                key="gradFill1"
                SHAPE_TYPE={constants.SHAPE_TYPES.AUTO_SHAPE}
                FILL_TYPE={constants.FILL_TYPES.GRADIENT_FILL}
                GRADIENT_STOP={1} />
            </div>
          </div>
        </div>
        <div className="row col-12 align-items-center">
          <OpacitySlider
            key="shapeOpacity"
            SHAPE_TYPE={constants.SHAPE_TYPES.AUTO_SHAPE}
          />
        </div>
      </div>
    </>
  )
}