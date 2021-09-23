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

  // AJAX
  apiService({
    url: "/api/presentation/save/style",
    data: data,
    success: (r) => {
      event.data.designData.shapes = r.newShapes;
      currentSlide.changeDesign(event.data.designData);
    },
  });

  // sendBeacon
  // navigator.sendBeacon("/api/presentation/save/style", data);
};

Events.listen("saveChange.style", saveStyle);
