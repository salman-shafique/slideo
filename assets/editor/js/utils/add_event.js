/**
 * 
 * @param {string | HTMLOrSVGElement} selector 
 * @param {Event} type 
 * @param {Function} callback 
 */
export default function add_event(selector, type, callback) {
    let elements;
    if (typeof selector == "string")
        elements = document.querySelectorAll(selector);
    else if (typeof selector == "object")
        elements = [selector];
    elements.forEach(element => {
        if (document.addEventListener) {
            return element.addEventListener(type, callback, false);
        }
        return element.attachEvent('on' + type, callback);
    });
};

