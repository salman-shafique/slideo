import React from "react";
import session from "Editor/js/session";
import slide from "Editor/js/entity/slide";
import preloader from "Editor/js/components/preloader";
import Events from "Editor/js/Events";

export default function DesignItem({ designData }) {
  const currentSlide = slide(session.CURRENT_SLIDE);
  const slideData = currentSlide.slideData();
  const selectDesign = () => {
    if (designData.id == slideData.style.id) {
      return;
    }
    preloader.show();
    // currentSlide.changeDesign(designData);
    Events.saveChange.style({
      slideId: slideData.id,
      styleId: designData.id,
      shapes: designData.shapes,
      designData: designData,
      border: "2px solid salmon",
    });
    Events.saveChange.background();
    preloader.hide();
  };

  return (
    <img
      onClick={selectDesign}
      keywords={designData.keywords ? designData.keywords.join(",") : ""}
      layoutid={designData.layout.id}
      className={"col-6 design-item"}
      src={designData.prevFile}
      style={{
        border: designData.id === slideData.style.id ? "2px solid salmon" : "",
        paddingLeft: "2px",
        paddingRight: "2px",
        margin: "0px 0px 5px 0px",
      }}
    />
  );
}
