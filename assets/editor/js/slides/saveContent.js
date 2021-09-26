import Events from "Editor/js/Events";
import apiService from "Editor/js/utils/apiService";
import constants from "Editor/js/constants";
import slide from "Editor/js/entity/slide";
import shape from "Editor/js/entity/shape";

const saveContent = (event) => {
  const slides = session.PRESENTATION.slides;
  const slide = slides.find((slide) => slide.slideId == event.data.slideId);
  const shape_ = slide.shapes.find(
    (aShape) => aShape.data.shape_id == event.data.shapeId
  );
  const shapeData = shape_.data;

  let request = () => {
    if (shapeData.alt == "slidetitle") {
      const payload = slide.slideTitle;
      const data = [];
      const shape = {
        id: payload.id,
        keyword: "slideTitle",
        data: payload.data,
      };
      data.push(shape);
      return data;
    } else {
      // icon, h1Image, originalSentence, h1
      const type = shapeData.icon
        ? "icon"
        : shapeData.image
        ? "h1Image"
        : shapeData.alt == "paragraph|0"
        ? "originalSentence"
        : "h1";
      const payload = slide.analyzedContent[0][type];
      payload.data.keyword = payload.data.keywords[0];

      const data = [];
      const shape = {
        id: payload.id,
        keyword: payload.keyword,
        data: payload.data,
      };

      data.push(shape);
      return data;
    }
  };

  const data = JSON.stringify(request());

  // AJAX
  // apiService({
  //     url: "/api/presentation/save/content",
  //     data: data,
  // });

  // sendBeacon
  navigator.sendBeacon("/api/presentation/save/content", data);
};

const saveAllContent = (event) => {
  const slides = session.PRESENTATION.slides;

  slides.forEach((aSlide) => {
    const request = [];
    const slide_ = slide(aSlide.slideId);
    const svg = slide_.contentDocument().querySelector("svg");
    const SVG_WIDTH = constants.SVG_WIDTH(svg);
    const SVG_HEIGHT = constants.SVG_HEIGHT(svg);

    aSlide.shapes.forEach((aShape) => {
      const shape_ = shape(aSlide.slideId, aShape.data.shape_id);
      shape_.saveTransforms(SVG_WIDTH, SVG_HEIGHT);
      const payload = {
        id: aShape.id,
        keyword: aShape.keyword,
        data: aShape.data,
      };
      request.push(payload);
    });

    // Save the zIndex;
    slide_.saveZIndex();

    const data = JSON.stringify(request);
    // AJAX
    // apiService({
    //   url: "/api/presentation/save/content",
    //   data: data,
    // });

    // sendBeacon
    navigator.sendBeacon("/api/presentation/save/content", data);
  });
};

const saveDefaultContent = (event) => {
  const request = [];

  const shape = {
    id: event.data.id,
    data: event.data.data,
  };

  request.push(shape);

  const data = JSON.stringify(request);

  // AJAX
  // apiService({
  //   url: "/api/presentation/save/content",
  //   data: data,
  // });

  // sendBeacon
  navigator.sendBeacon("/api/presentation/save/content", data);
};

Events.listen("saveChange.inited", saveAllContent);
Events.listen("download.inited", saveAllContent);
Events.listen("saveChange.resetContent", saveDefaultContent);
Events.listen("saveChange.content", saveContent);
