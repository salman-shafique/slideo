import Events from "Editor/js/Events";
import apiService from "Editor/js/utils/apiService";
import constants from "Editor/js/constants";
import session from "../session";
import slide from "Editor/js/entity/slide";
import shape from "Editor/js/entity/shape";

const saveStyle = (event) => {
  const request = {
    id: event.data.slideId,
    style: {
      id: event.data.styleId,
    },
    shapes: event.data.shapes,
  };

  const data = JSON.stringify(request);

  // AJAX
  // apiService({
  //   url: "/api/presentation/save/style",
  //   data: data,
  // });

  // sendBeacon
  navigator.sendBeacon("/api/presentation/save/style", data);
};

const setShapes = (event) => {
  const slides = session.PRESENTATION.slides;

  slides.forEach(aSlide => {
    const slide_ = slide(aSlide.slideId);
    const svg = slide_.contentDocument().querySelector("svg");
    const SVG_WIDTH = constants.SVG_WIDTH(svg);
    const SVG_HEIGHT = constants.SVG_HEIGHT(svg);
  
    aSlide.shapes.forEach(aShape => {
        const shape_ = shape(aSlide.slideId, aShape.data.shape_id);
        shape_.saveTransforms(SVG_WIDTH, SVG_HEIGHT);
    });
  
    // Save the zIndex;
    slide_.saveZIndex();

    const data = {
      slideId : aSlide.id,
      styleId : aSlide.style.id,
      shapes : aSlide.shapes
    }
    
    event.data = data
    saveStyle(event)
  })
}

Events.listen("saveChange.style", saveStyle);
Events.listen("saveChange.inited", setShapes);
Events.listen("download.inited", setShapes);

