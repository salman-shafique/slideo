export default function add_event(selector, type, callback) {
    let elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        if (document.addEventListener) {
            return element.addEventListener(type, callback, false);
        }
        return element.attachEvent('on' + type, callback);
    });
};

