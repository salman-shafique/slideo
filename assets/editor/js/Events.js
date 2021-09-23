import extendEvent from "Editor/js/history/extendEvent";

const dispatchEvent = (eventName, data = {}) => {
  const event = new MouseEvent(eventName);
  event.data = data;
  extendEvent(event);
  window.dispatchEvent(event);
};

export const hash = (str) => {
  let hash = 0;
  if (str.length == 0) return hash;
  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return String(hash);
};

const registeredListeners = {};
const Events = {
  presentation: {
    inited: (data = {}) => dispatchEvent("presentation.inited", data),
  },
  slide: {
    display: (data = {}) => dispatchEvent("slide.display", data),
    preview: {
      update: (data = {}) => dispatchEvent("slide.preview.update", data),
      updateAll: (data = {}) => dispatchEvent("slide.preview.updateAll", data),
    },
    deleted: (data = {}) => dispatchEvent("slide.deleted", data),
    restored: (data = {}) => dispatchEvent("slide.restored", data),
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
    allReleasedExcept: (data = {}) =>
      dispatchEvent("shape.allReleasedExcept", data),
    textbox: {
      edit: {
        started: (data = {}) =>
          dispatchEvent("shape.textbox.edit.started", data),
        ended: (data = {}) => dispatchEvent("shape.textbox.edit.ended", data),
      },
      add: (data = {}) => dispatchEvent("shape.textbox.add", data),
    },
    icon: {
      changed: (data = {}) => dispatchEvent("shape.icon.changed", data),
      add: (data = {}) => dispatchEvent("shape.icon.add", data),
    },
    image: {
      changed: (data = {}) => dispatchEvent("shape.image.changed", data),
      add: (data = {}) => dispatchEvent("shape.image.add", data),
      remove: (data = {}) => dispatchEvent("shape.image.remove", data),
    },
    deleted: (data = {}) => dispatchEvent("shape.deleted", data),
  },
  popup: {
    text: {
      open: (data = {}) => dispatchEvent("popup.text.open", data),
      opened: (data = {}) => dispatchEvent("popup.text.opened", data),
    },
    icon: {
      open: (data = {}) => dispatchEvent("popup.icon.open", data),
      opened: (data = {}) => dispatchEvent("popup.icon.opened", data),
    },
    image: {
      open: (data = {}) => dispatchEvent("popup.image.open", data),
      opened: (data = {}) => dispatchEvent("popup.image.opened", data),
      upload: (data = {}) => dispatchEvent("popup.image.upload", data),
      delete: (data = {}) => dispatchEvent("popup.image.delete", data),
    },
    keyword: {
      updated: (data = {}) => dispatchEvent("popup.keyword.updated", data),
    },
  },
  colorCircle: {
    opened: (data = {}) => dispatchEvent("colorCircle.opened", data),
    open: (data = {}) => dispatchEvent("colorCircle.open", data),
  },
  contextMenu: {
    open: (data = {}) => dispatchEvent("contextMenu.open", data),
  },
  saveChange: {
    inited: (data = {}) => dispatchEvent("saveChange.inited", data),
    content: (data = {}) => dispatchEvent("saveChange.content", data),
    colorTemplate: (data = {}) =>
      dispatchEvent("saveChange.colorTemplate", data),
    background: (data = {}) => dispatchEvent("saveChange.background", data),
    style: (data = {}) => dispatchEvent("saveChange.style", data),
    thumbnail: (data = {}) => dispatchEvent("saveChange.thumbnail", data),
    thumbnailReady: (data = {}) =>
      dispatchEvent("saveChange.thumbnailReady", data),
    slidesOrder: (data = {}) => dispatchEvent("saveChange.slidesOrder", data),
  },
  download: {
    inited: (data = {}) => dispatchEvent("download.inited", data),
  },
  /**
   * @param {String} eventName
   * @param {function} listener
   */
  listen: (eventName, listener) => {
    if (!eventName) return;
    if (!listener) return;

    if (!registeredListeners[eventName]) registeredListeners[eventName] = [];

    const hashStr = hash(listener.toString());
    if (!registeredListeners[eventName].includes(hashStr) || true) {
      // Needs identifier
      registeredListeners[eventName].push(hashStr);
      window.addEventListener(eventName, listener);
    }
  },
};

export default Events;
