import Events from "Editor/js/Events";
import apiService from "Editor/js/utils/apiService";
import session from "../session";
import slide from "Editor/js/entity/slide";

let isStyleChanged = false;

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
  const slides = session.PRESENTATION.slides;
  let lastShapeId = 0;
  slides.forEach((slide) =>
    slide.shapes.forEach((shape) => {
      const id = parseInt(shape.id);
      if (id > lastShapeId) {
        lastShapeId = id;
      }
    })
  );

  if (isStyleChanged == true) {
    request.shapes.forEach((shape, i) => {
      shape.id = lastShapeId + i + 1;
      shape.data.isStyleChanged = true;

      if (i == request.shapes.length - 1) {
        lastShapeId = shape.id;
      }
    });
  } else {
    request.shapes.forEach((shape, i) => {
      shape.id = lastShapeId + i + 2;
      shape.data.isStyleChanged = true;

      if (i == request.shapes.length - 1) {
        lastShapeId = shape.id - 1;
      }
    });
  }
  event.data.designData.shapes = request.shapes;
  currentSlide.changeDesign(event.data.designData);
  Events.saveChange.background();

  // AJAX;
  // apiService({
  //   url: "/api/presentation/save/style",
  //   data: data,
  //   success: (r) => {
  //     console.log("RES", r.newShapes);
  //   },
  // });

  // sendBeacon
  navigator.sendBeacon("/api/presentation/save/style", data);

  isStyleChanged = true;
};

const checkIsChanged = (event) => {
  const currentSlide = slide(session.CURRENT_SLIDE);
  const shapes = currentSlide.slideData().shapes;

  shapes.forEach((shape) => {
    if (shape.data.alt == "h1image|0" || shape.data.icon) {
      if (shape.data.isStyleChanged) {
        isStyleChanged = true;
      } else {
        isStyleChanged = false;
      }
    }
  });
};

Events.listen("saveChange.style", saveStyle);
Events.listen("saveChange.inited", checkIsChanged);
Events.listen("slide.display", (event) => {
  if (!session.SAVED) return;
  checkIsChanged(event);
});
