import Events from "Editor/js/Events";
import apiService from "Editor/js/utils/apiService";
import session from "../session";

const saveBackground = () => {
    const slides = session.PRESENTATION.slides;

    slides.forEach(slide => {
        const request =  {
            "id": slide.id,
            "background": {
                "data": slide.background.data  
            }
        }
        
        const data = JSON.stringify(request)
    
        // AJAX 
        // apiService({
        //     url: "/api/presentation/save/background",
        //     data: data,
        // });

        // save/background
        navigator.sendBeacon("/api/presentation/save/background", data);
    })
}

Events.listen("saveChange.background", saveBackground)