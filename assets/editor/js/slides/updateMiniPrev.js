import Events from "Editor/js/Events";
import slide from "../entity/slide";
import session from "../session";



const updateMiniPrev = (event) => {
    
    slide(session.CURRENT_SLIDE).cloneToMiniPrev();
}

Events.listen("slide.preview.update", updateMiniPrev);
Events.listen("shape.drag.ended", updateMiniPrev);
