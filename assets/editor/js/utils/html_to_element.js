/**
 * 
 * @param {string} html_string 
 * @returns {HTMLElement}
 */
export default function html_to_element(html_string) {
    let template = document.createElement('template');
    template.innerHTML = html_string.trim();
    return template.content.firstChild;
}