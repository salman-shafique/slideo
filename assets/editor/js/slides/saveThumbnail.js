import Events from "Editor/js/Events";
import session from "../session";
import slide from "Editor/js/entity/slide";
import constants from "Editor/js/constants";
import shape from "Editor/js/entity/shape";
import apiService from "Editor/js/utils/apiService";

// Create Image File
function createImageFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

// Convert Slide's Image URL to base64
function imagetoBase64(imgUrl, callback) {
  var img = new Image();

  img.onload = function () {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    callback(dataURL);
  };

  img.setAttribute("crossOrigin", "anonymous");
  img.src = imgUrl;
}

// Convert SVG to JPEG
function svgToJpeg(originalBase64, totalImg, done) {
  const svgImage = document.createElement("img");

  document.body.appendChild(svgImage);
  svgImage.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = svgImage.clientWidth / 2.5;
    canvas.height = svgImage.clientHeight / 2.5;
    const canvasCtx = canvas.getContext("2d");
    canvasCtx.drawImage(svgImage, 0, 0);
    const imageData = canvas.toDataURL("image/jpeg");
    const file = createImageFile(imageData, "slide-thumbnail.jpg");

    if (totalImg == done) {
      Events.saveChange.thumbnail(file);
    }
  };

  svgImage.src = originalBase64;
}

const saveThumbnail = (event) => {
  console.log(event.type);
  const firstSlideId =
    event.type === "saveChange.slidesOrder"
      ? event.data.firstSlide
      : session.PRESENTATION.slidesOrder[0];

  if (
    event.type == "saveChange.content" &&
    session.CURRENT_SLIDE != firstSlideId
  )
    return;

  console.log("thumb firstSlide", firstSlideId);

  const slide_ = slide(firstSlideId);
  const slideData = slide_.slideData();
  const imgShapes = slideData.shapes.filter((shape_) => {
    const Shape = shape(firstSlideId, shape_.data.shape_id);
    const g = Shape.el();
    return g.querySelector("image");
  });

  let done = 0;
  imgShapes.forEach((shape_) => {
    const Shape = shape(firstSlideId, shape_.data.shape_id);
    const g = Shape.el();
    const imageUrl = g.querySelector("image").getAttribute("xlink:href");

    // Convert Slide's Image URL to Base64
    imagetoBase64(imageUrl, (base) => {
      done = done + 1;
      g.querySelector("image").setAttribute("xlink:href", base);
      var xml = new XMLSerializer().serializeToString(g.closest("svg"));
      var svg64 = btoa(unescape(encodeURIComponent(xml)));
      var b64start = "data:image/svg+xml;base64,";
      var image64 = b64start + svg64;
      svgToJpeg(image64, imgShapes.length, done);
    });
  });
};

// Detect Page Close
let closePage = false;

Events.listen("saveChange.thumbnail", (event) => {
  const formData = new FormData();
  formData.append("thumbnail", event.data);

  if (!closePage) {
    // AJAX
    apiService({
      url: "/api/presentation/upload/thumbnail",
      processData: false,
      contentType: false,
      data: formData,
      enctype: "multipart/form-data",
    });
  } else {
    // Beacon
    navigator.sendBeacon("/api/presentation/upload/thumbnail", formData);
  }
});

// Changes Queue
let queue = [];
Events.listen("saveChange.content", (event) => {
  if (session.CURRENT_SLIDE != session.PRESENTATION.slidesOrder[0]) return;
  if (!event.data.shapeId) return;
  if (queue.length == 0) {
    queue.push(event.data.shapeId);
  } else {
    if (queue.includes(event.data.shapeId) == false) {
      queue.push(event.data.shapeId);
    }
  }
});

Events.listen("shape.allReleased", (event) => {
  if (queue.length > 0) {
    saveThumbnail(event);
    queue = [];
  }
});

document.addEventListener("visibilitychange", function logData() {
  if (document.visibilityState === "hidden") {
    closePage = true;
    saveThumbnail();
  }
});

Events.listen("saveChange.inited", saveThumbnail);
Events.listen("saveChange.slidesOrder", saveThumbnail);
