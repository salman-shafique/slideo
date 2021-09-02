import Events from "Editor/js/Events";
import apiService from "Editor/js/utils/apiService";
import slide from "Editor/js/entity/slide";
import shape from "Editor/js/entity/shape";
import constants from "Editor/js/constants";


const saveTransform = (event) => {
    const slides = session.PRESENTATION.slides;
    const Slide = slides.find(slide => slide.slideId == event.data.slideId)
    const shapeData = Slide.shapes.find(shape => shape.data.shape_id == event.data.shapeId)

    const slide_ = slide(event.data.slideId);
    const svg = slide_.contentDocument().querySelector("svg");
    const SVG_WIDTH = constants.SVG_WIDTH(svg);
    const SVG_HEIGHT = constants.SVG_HEIGHT(svg);

    const shape_ = shape(Slide.slideId, event.data.shapeId)
    shape_.saveTransforms(SVG_WIDTH, SVG_HEIGHT);

    const request = {
        id : shapeData.id,
        data : shape_.data()
    }

    const data = JSON.stringify(request)

    // AJAX 
    // apiService({
    //     url: "/api/presentation/save/content",
    //     data: data,
    // });

    // sendBeacon
    navigator.sendBeacon("/api/presentation/save/content", data);
}

Events.listen("saveChange.content", saveTransform)