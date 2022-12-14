import Events from "Editor/js/Events";
import apiService from "Editor/js/utils/apiService";
import session from "../session";

export const saveSlidesOrder = () => {
  const request = {
    slidesOrder: session.PRESENTATION.slidesOrder,
  };

  // AJAX
  apiService({
    url: "/api/presentation/save/settings",
    data: request,
  });

  Events.saveChange.slidesOrder({
    firstSlide: session.PRESENTATION.slidesOrder[0],
  });
};
