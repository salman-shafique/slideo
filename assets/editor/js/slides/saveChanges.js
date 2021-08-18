import Events from "Editor/js/Events";
import session from "../session";
import { saveChanges } from "Editor/js/navbar/SaveButton";


const save = (event) => {
    // console.log(event.type);
    if (!session.INITED) return;
    if (!session.PRESENTATION) return;
    saveChanges()
}

Events.listen("shape.released", save);
Events.listen("slide.preview.updateAll", save);