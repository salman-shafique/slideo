import Events from "Editor/js/Events";
import apiService from "Editor/js/utils/apiService";

const saveContent = (event) => {
    const slides = session.PRESENTATION.slides;
    const slide = slides.find(slide => slide.slideId == event.data.slideId)
    const shape_ = slide.shapes.find(aShape => aShape.data.shape_id == event.data.shapeId);
    const shapeData = shape_.data    

    let request = () => {
        if(shapeData.alt == "slidetitle"){
            const payload = slide.slideTitle
            const data =  {
                "id": payload.id,
                "keyword": "slideTitle",
                "data": payload.data
            }
            return data   
        }else {

            // icon, h1Image, originalSentence, h1
            const type = shapeData.icon ? "icon" : shapeData.image ? "h1Image" : shapeData.alt == "paragraph|0" ? "originalSentence" : "h1"
            const payload = slide.analyzedContent[0][type]
            payload.data.keyword = payload.data.keywords[0]
           
            const data =  {
                "id": payload.id,
                "keyword": payload.keyword,
                "data": payload.data
            }

            return data  
        }
    }

    const data = JSON.stringify(request())

    // AJAX 
    // apiService({
    //     url: "/api/presentation/save/content",
    //     data: data,
    // });

    // sendBeacon
    navigator.sendBeacon("/api/presentation/save/content", data);

}


Events.listen("saveChange.content", saveContent)