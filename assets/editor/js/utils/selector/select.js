/**
 * 
 * @param {string} selector 
 * @param {Element} parent 
 * @returns {HTMLElement}
 */
export default function select(selector, parent = null) {
    if (!parent) parent = window.document;

    return parent.querySelector(selector);
}