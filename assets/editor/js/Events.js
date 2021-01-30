
const dispatchEvent = (eventName, data = null) => {
    const event = new MouseEvent(eventName);
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
        resize: {
            started: (data = null) => dispatchEvent("shape.resize.started", data),
            ended: (data = null) => dispatchEvent("shape.resize.ended", data),
        },
        selected: (data = null) => dispatchEvent("shape.selected", data),
        released: (data = null) => dispatchEvent("shape.released", data),
        allReleased: (data = null) => dispatchEvent("shape.allReleased", data),
    },
    colorCircle: {
        opened: (data = null) => dispatchEvent("colorCircle.opened", data)
    },

}
export default Events;


