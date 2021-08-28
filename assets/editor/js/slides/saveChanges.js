import Events from "Editor/js/Events";
import session from "../session";
import { saveChanges } from "Editor/js/navbar/SaveButton";

const save = (event) => {
    if (!session.INITED) return;
    if (!session.PRESENTATION) return;
    if (!session.SAVED && event.type === "saveChange.updated") return
    if (!session.SAVED && event.type === "slide.preview.updateAll") return

    saveChanges(null, event)    
}

// Inital save when the editor is being loaded for the first time
Events.listen("saveChange.inited", save);

// Save Change Queue 
let queue = session.SAVED

// Add queue when there's a change for current slide being made
Events.listen("saveChange.updated", (event) => {
    queue = queue + 1
});

// Call the API if there's a queue
Events.listen("shape.allReleased", (event) => {
    if(queue > 1){
        save(event)
        queue = -1
    }
});

Events.listen("saveChange.completed", (event) => {
    queue = true
});

// Save when there's a change that affecting all slides being made
Events.listen("slide.preview.updateAll", save);

// Save when a slide has been deleted
Events.listen("slide.deleted", save);

