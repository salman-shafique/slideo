import session from "Editor/js/session";
import hideResizeCircles from "./hideResizeCircles";
import showResizeCircles from "./showResizeCircles";

window.addEventListener("shape.drag.started", () => {
    session.SELECTED_ELEMENTS.forEach(selectedEl => {
        hideResizeCircles(selectedEl.shape);
    });
});

window.addEventListener("shape.drag.ended", (event) => {
    session.SELECTED_ELEMENTS.forEach(selectedEl => {
        showResizeCircles(selectedEl.shape);
    });
});

window.addEventListener("shape.released", (event) => {
    hideResizeCircles(event.data.shape);
});

window.addEventListener("shape.selected", (event) => {
    showResizeCircles(event.data.shape);
});
