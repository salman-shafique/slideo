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

            // originalSentence, h1
            const type = shapeData.icon ? "icon" : shapeData.image ? "h1Image" : shapeData.alt == "paragraph|0" ? "originalSentence" : "h1"
            const payload = slide.analyzedContent[0][type]
            // payload.data.keyword = payload.data.keywords[0]

            // payload.x = event.data.newX
            // payload.y = event.data.newY

            console.log(payload);

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


// Events.listen("saveChange.updated", saveContent)