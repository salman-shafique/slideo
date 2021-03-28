import extendEvent from "Editor/js/history/extendEvent";

const dispatchEvent = (eventName, data = {}) => {
    const event = new MouseEvent(eventName);
    event.data = data;
    extendEvent(event);
    window.dispatchEvent(event);
}

export const hash = (str) => {
    let hash = 0;
    if (str.length == 0) return hash;
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return String(hash);
}

const registeredListeners = {};
const Events = {
    slide: {
        display: (data = {}) => dispatchEvent("slide.display", data)
    },
    shape: {
        drag: {
            started: (data = {}) => dispatchEvent("shape.drag.started", data),
            ended: (data = {}) => dispatchEvent("shape.drag.ended", data),
        },
        resize: {
            started: (data = {}) => dispatchEvent("shape.resize.started", data),
            ended: (data = {}) => dispatchEvent("shape.resize.ended", data),
        },
        selected: (data = {}) => dispatchEvent("shape.selected", data),
        released: (data = {}) => dispatchEvent("shape.released", data),
        allReleased: (data = {}) => dispatchEvent("shape.allReleased", data),
        allReleasedExcept: (data = {}) => dispatchEvent("shape.allReleasedExcept", data),
        textbox: {
            edit: {
                started: (data = {}) => dispatchEvent("shape.textbox.edit.started", data),
                ended: (data = {}) => dispatchEvent("shape.textbox.edit.ended", data),
            }
        },

    },
    colorCircle: {
        opened: (data = {}) => dispatchEvent("colorCircle.opened", data),
        open: (data = {}) => dispatchEvent("colorCircle.open", data),
    },
    contextMenu: {
        open: (data = {}) => dispatchEvent("contextMenu.open", data)
    },
    /**
     * @param {String} eventName 
     * @param {function} listener
     */
    listen: (eventName, listener) => {
        if (!eventName) return;
        if (!listener) return;

        if (!registeredListeners[eventName])
            registeredListeners[eventName] = [];

        const hashStr = hash(listener.toString());
        if (!registeredListeners[eventName].includes(hashStr) || true) { // Needs identifier
            registeredListeners[eventName].push(hashStr);
            window.addEventListener(eventName, listener);
        }
    }
}

export default Events;


