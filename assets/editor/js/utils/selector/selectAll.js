/**
 * 
 * @param {string} selector 
 * @param {Element} parent 
 * @returns {HTMLElement[]}
 */
export default function selectAll(selector, parent = null) {
    if (!parent) parent = window.document;
    return parent.querySelectorAll(selector);
}