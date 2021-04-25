import Events from "Editor/js/Events";
import slide from "../entity/slide";
import session from "../session";

const updateMiniPrev = (event) => {
    slide(session.CURRENT_SLIDE).cloneToMiniPrev();
}

Events.listen("shape.drag.ended", updateMiniPrev);
Events.listen("shape.resize.ended", updateMiniPrev);
Events.listen("shape.textbox.edit.ended", updateMiniPrev);
Events.listen("shape.icon.changed", updateMiniPrev);
Events.listen("shape.image.changed", updateMiniPrev);
Events.listen("slide.preview.update", updateMiniPrev);