import Events from "Editor/js/Events";
import constants from "Editor/js/constants";
import session from "Editor/js/session";

// Drag
Events.listen('shape.drag.started', (event) => {
    console.log("start", event);
});
Events.listen('shape.drag.ended', (event) => {
    console.log(event.history);
});