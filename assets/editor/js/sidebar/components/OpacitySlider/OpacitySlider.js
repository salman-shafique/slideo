import React from "react";
import "./style.css";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import { getOpacity } from "Editor/js/sidebar/components/OpacitySlider/utils";
import shape from "Editor/js/entity/shape";
import Events from "Editor/js/Events";


export default function OpacitySlider({ SHAPE_TYPE }) {
  const [opacity, setOpacity] = React.useState(1.0);

  React.useEffect(() => {
    Events.listen("shape.selected", () => {
      if (session.SELECTED_ELEMENTS.length != 1) {
        setOpacity(1);
        return;
      };
      const g = session.SELECTED_ELEMENTS[0].shape;
      if (getShapeType(g) == SHAPE_TYPE)
        setOpacity(getOpacity(g));

    });
    Events.listen("shape.allReleased", () => {
      setOpacity(1);
    });
  }, []);

  const updateOpacity = (event) => {
    const newOpacity = event.target.value;
    session.SELECTED_ELEMENTS.forEach(selectedEl => {
      if (getShapeType(selectedEl.shape) == SHAPE_TYPE) {
        // Opacity will used seen on g element
        selectedEl.shape.style.opacity = newOpacity;
        shape(selectedEl.shape).data().shape_opacity = newOpacity;
        setOpacity(newOpacity);
      }
    });
  }


  return (
    <>
      <div className="opacity-slider">
        <label>Opacity</label>
        <input className="form-range" onChange={updateOpacity} type="range" value={opacity} min="0" max="1" step="0.01" />
        <i className="fas fa-chess-board"></i>
      </div>
    </>
  )
}