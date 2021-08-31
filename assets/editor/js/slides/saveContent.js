import Events from "Editor/js/Events";
import apiService from "Editor/js/utils/apiService";
import slide from "Editor/js/entity/slide";
import shape from "Editor/js/entity/shape";



// Json Body:

// {
//     "id": 2392,
//     "keyword": "slideTitle",
//     "data": {
//         "lang": "he",
//         "text": "זה זה ",
//         "title": "זה זה",
//         "keyword": "It",
//         "keywords": [
//             "It"
//         ],
//         "direction": "rtl",
//         "inEnglish": "It"
//     }
// }


// {
//     "id":3997,
//     "keyword":"slideTitle",
//         "data": {
//         "lang": "en",
//         "text": "Test API",
//         "title": "Do Eiusmod Tempor Incididunt",
//         "keyword": "tempor",
//         "keywords": [
//             "tempor",
//             "incididunt"
//         ],
//         "direction": "ltr",
//         "inEnglish": "do eiusmod tempor incididunt"
//     }
// }


const saveContent = (event) => {
   

    const slides = session.PRESENTATION.slides;
    const slide = slides.find(slide => slide.slideId == event.data.slideId)
    const shape_ = slide.shapes.find(aShape => aShape.data.shape_id == event.data.shapeId);
    const shapeData = shape_.data


    let request = {}

    if(shapeData.icon){
        console.log("ICON", shapeData.icon);
    }else{
        if(shapeData.alt == "slidetitle"){
            const payload = slide.slideTitle
            request = 
                {
                    "id": payload.id,
                    "keyword": "slideTitle",
                    "data": {
                        "lang": payload.data.lang,
                        "text": payload.data.text,
                        "title": payload.data.title,
                        "keyword": payload.data.keyword,
                        "keywords": payload.data.keywords,
                        "direction": payload.data.direction,
                        "inEnglish": payload.data.inEnglish
                    }
                }
        }
    }

    // AJAX 
    apiService({
        url: "/api/presentation/save/content",
        data: JSON.stringify(request),
    });

    // sendBeacon
    // var formData = new FormData()
    // formData.append(JSON.stringify(request))       
    // const res = navigator.sendBeacon("/api/presentation/save/content", data);
}


Events.listen("saveChange.updated", saveContent)