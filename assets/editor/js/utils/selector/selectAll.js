
export default function selectAll(selector, parent = null) {
    if (!parent) parent = window.document;
    return parent.querySelectorAll(selector);
}