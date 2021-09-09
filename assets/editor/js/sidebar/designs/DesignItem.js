import React from "react";
import session from "Editor/js/session";
import slide from "Editor/js/entity/slide";
import preloader from "Editor/js/components/preloader";
import Events from "Editor/js/Events";

export default function DesignItem({ designData }) {
  const selectDesign = () => {
    const currentSlide = slide(session.CURRENT_SLIDE);
    const slideData = currentSlide.slideData();
    if (designData.id == slideData.style.id) {
      return;
    }
    preloader.show();

    designData.shapes.forEach((shape) => {
      const slideShapes = slide(session.CURRENT_SLIDE).slideData().shapes;
      slideShapes.forEach((sShape) => {
        if (shape.data.alt.includes("icon|")) {
          if (!sShape.data.alt.includes("icon|")) return;
          shape.id = sShape.id;
        } else if (shape.data.alt == sShape.data.alt) {
          shape.id = sShape.id;
        }
      });
    });

    currentSlide.changeDesign(designData);
    Events.saveChange.style({ slideId: slideData.id, styleId: designData.id });
    Events.saveChange.background();
    preloader.hide();
  };

  return (
    <img
      onClick={selectDesign}
      keywords={designData.keywords ? designData.keywords.join(",") : ""}
      layoutid={designData.layout.id}
      className={"col-6 px-1 mb-2 design-item"}
      src={designData.prevFile}
    />
  );
}
