import Events from "Editor/js/Events";
import apiService from "Editor/js/utils/apiService";
import session from "../session";

const saveStyle = (event) => {
    const slides = session.PRESENTATION.slides;
    const Slide = slides.find(slide => slide.slideId == session.CURRENT_SLIDE)

    const request = {
        id : event.data.slideId,
        style : {
            id : event.data.styleId
        },
        shapes : Slide.style.shapes
    }

    const data = JSON.stringify(request)

    // AJAX 
    // apiService({
    //     url: "/api/presentation/save/style",
    //     data: data,
    // });

    // sendBeacon
    navigator.sendBeacon("/api/presentation/save/style", data);
}

Events.listen("saveChange.style", saveStyle)