import Events from "Editor/js/Events";
import preloader from "Editor/js/components/preloader";
import apiService from "Editor/js/utils/apiService";
import slide from "Editor/js/entity/slide";
import shape from "Editor/js/entity/shape";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import base64 from "Editor/js/utils/base64";

// Save Change Queue 
let queue = []

const save = (event) => {
    if (!session.INITED) return;
    if (!session.PRESENTATION) return;
    if (!session.SAVED && event.type === "saveChange.updated") return
    if (!session.SAVED && event.type === "slide.preview.updateAll") return

    const slides = session.PRESENTATION.slides;

    const q = queue.map(q => q.slideId)
    
    slides.forEach((aSlide, i) => {

            // If the event is only a single shape event, only save the current changed slide
            // If the event is from changes that affecting all slide (e.g change background, change color theme), save each slide

            if(q.includes(aSlide.slideId) != true) return

            const slide_ = slide(aSlide.slideId);
            const svg = slide_.contentDocument().querySelector("svg");
            const SVG_WIDTH = constants.SVG_WIDTH(svg);
            const SVG_HEIGHT = constants.SVG_HEIGHT(svg);

            aSlide.shapes.forEach(aShape => {
                const shape_ = shape(aSlide.slideId, aShape.data.shape_id);
                shape_.saveTransforms(SVG_WIDTH, SVG_HEIGHT);
            });

            // Save the zIndex;
            slide_.saveZIndex();

            const encoded = base64.encode(JSON.stringify(aSlide));
            apiService({
                url: "/api/presentation/save/slide",
                data: {
                    slide: encoded
                },
                // Commented async false to make the call asynchronous 
                // async: false, 
                success: (r) => {
                    if (r.success) {
                        const slideData = slide(r.slideId).slideData();
                        slideData.shapes = [];
                        r.newShapes.forEach(newShape => {
                            slideData.shapes.push(newShape)
                        });
                        Events.saveChange.completed()
                    }
                    if (i == slides.length - 1)
                        if (typeof callback == "function") {
                            preloader.hide();
                            callback();
                        }
                }
            });
        });

        // Save presentation settings
        apiService({
            url: "/api/presentation/save/settings",
            data: {
                settings: session.PRESENTATION.settings,
                history: session.PRESENTATION.history,
                slidesOrder: session.PRESENTATION.slidesOrder
            }
        });
        preloader.hide();

    queue = []
}

// Add queue when there's a change for current slide being made
Events.listen("saveChange.updated", (event) => {

    const actions = constants.ACTION_TYPES
    let action = null
    for (let k in actions) {
        if(event.data.actionType == actions[k]){
            action = k
        }
    }    

    if(!event.data.slideId) return
    
    if(queue.length == 0){
        event.data.actions = [action]
        queue.push(event.data)
    }else {
        const i = queue.findIndex( q => q.slideId == event.data.slideId)
        if(i == -1){
            event.data.actions = [action]
            queue.push(event.data)
        }else if(queue[i].slideId == event.data.slideId) {
            queue[i].actions.push(action)
        }
    }
});

// Save when there's a change that affecting all slides being made
Events.listen("slide.preview.updateAll", () => {
    if (!session.SAVED) return
    queue = session.PRESENTATION.slides
});

// Option 1 - Auto Save periodically every minute
const saveTimer = () => {
    setTimeout(() => {
        if(queue.length){
            save()
        }
        saveTimer()
    }, 60000)
}

// Option 2 - Save changes in local session then save the changes to server database 
// when user refresh the page / closing page / close browser entirely
window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    // e.returnValue = '';
    var start = Date.now(), now = start;
    var delay = 2500;
    queue = session.PRESENTATION.slides
    save()
    while (now - start < delay) {
        now = Date.now();
    }
});


// Option 3 - Save Changes Periodically and
// when user refresh the page / closing page / close browser entirely
// UNCOMMENT OPTION 1 AND 2


// Inital save when the editor is being loaded for the first time
Events.listen("saveChange.inited", () => {
    // save()
    saveTimer()
});

// Call the API if there's a queue
// Events.listen("shape.allReleased", (event) => {
//     if(queue > 1){
//         save(event)
//         queue = -1
//     }
// });

// Events.listen("saveChange.completed", (event) => {
//     queue = true
// });


// Save when a slide has been deleted
// Events.listen("slide.deleted", save);


