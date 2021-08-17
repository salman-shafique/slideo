import Events from "Editor/js/Events";
import session from "../session";
import { saveChanges } from "Editor/js/navbar/SaveButton";

const save = () => {
    if (!session.INITED) return;
    if (!session.PRESENTATION) return;
    saveChanges()
    
}

Events.listen("slide.display", save);
Events.listen("slide.delete", save);
Events.listen("shape.drag.ended", save);
Events.listen("shape.resize.ended", save);
Events.listen("shape.released", save);
Events.listen("shape.allReleased", save);
Events.listen("slide.preview.updateAll", save);
