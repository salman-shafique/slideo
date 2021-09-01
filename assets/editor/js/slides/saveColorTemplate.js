import Events from "Editor/js/Events";
import apiService from "Editor/js/utils/apiService";
import session from "../session";

const saveColorTemplate = (event) => {

    const slides = session.PRESENTATION.slides;

    slides.forEach(slide => {
        const request =  {
            "id": slide.id,
            "colorTemplate": slide.colorTemplate
        }

        const data = JSON.stringify(request)

        // apiService({
        //     url: "/api/presentation/save/color-template",
        //     data: data,
        // });

        // save/color-template
        navigator.sendBeacon("/api/presentation/save/color-template", data);

    })

   

}

Events.listen("saveChange.colorTemplate", saveColorTemplate)