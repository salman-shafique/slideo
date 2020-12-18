
const dispatchEvent = (eventName, data = null) => {
    const event = new Event(eventName);
    event.data = data;
    window.dispatchEvent(event);
}

const Events = {
    slide: {
        display: (data = null) => dispatchEvent("slide.display", data)
    },
    shape: {
        drag: {
            started: (data = null) => dispatchEvent("shape.drag.started", data),
            ended: (data = null) => dispatchEvent("shape.drag.ended", data),

        },
        selected: (data = null) => dispatchEvent("shape.selected", data),
        released: (data = null) => dispatchEvent("shape.released", data),
    }
}
export default Events;


