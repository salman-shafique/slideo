import Events from "Editor/js/Events";
import session from "../session";
import preloader from "Editor/js/components/preloader";
import { saveChanges } from "Editor/js/navbar/SaveButton";

const save = (event) => {
    if (!session.INITED) return;
    if (!session.PRESENTATION) return;
    if (!session.SAVED && event.type === "saveChange.updated") return
    saveChanges()
}

Events.listen("saveChange.inited", save);
Events.listen("saveChange.updated", save);
Events.listen("slide.deleted", save);

