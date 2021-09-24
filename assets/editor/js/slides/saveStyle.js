import Events from "Editor/js/Events";
import apiService from "Editor/js/utils/apiService";
import session from "../session";
import slide from "Editor/js/entity/slide";

const saveStyle = (event) => {
  const currentSlide = slide(session.CURRENT_SLIDE);

  const request = {
    id: event.data.slideId,
    style: {
      id: event.data.styleId,
    },
    shapes: event.data.shapes,
  };

  const data = JSON.stringify(request);

  const currentShapes = currentSlide.slideData().shapes;
  const lastShapeId = currentShapes[currentShapes.length - 1].id;
  request.shapes.forEach((shape, i) => {
    shape.id = lastShapeId + i + 1;
  });

  event.data.designData.shapes = request.shapes;
  currentSlide.changeDesign(event.data.designData);

  // AJAX
  // apiService({
  //   url: "/api/presentation/save/style",
  //   data: data,
  //   success: (r) => {
  //     console.log("NEW SHAPES", r.newShapes);
  //   },
  // });

  // sendBeacon
  navigator.sendBeacon("/api/presentation/save/style", data);
};

Events.listen("saveChange.style", saveStyle);
