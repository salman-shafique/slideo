import session from "Editor/js/session";
import hideResizeCircles from "./hideResizeCircles";
import showResizeCircles from "./showResizeCircles";
import Events from "Editor/js/Events";

Events.listen("shape.drag.started", () => {
    session.SELECTED_ELEMENTS.forEach(selectedEl => {
        hideResizeCircles(selectedEl.shape);
    });
});

Events.listen("shape.drag.ended", (event) => {
    session.SELECTED_ELEMENTS.forEach(selectedEl => {
        showResizeCircles(selectedEl.shape);
    });
});

Events.listen("shape.released", (event) => {
    hideResizeCircles(event.data.shape);
});

Events.listen("shape.selected", (event) => {
    showResizeCircles(event.data.shape);
});
