/**
 * 
 * @param {string} html_string 
 * @returns {HTMLElement}
 */
export default function html_to_element(html_string, document = null, NS = null) {
    if (!document) document = window.top.document;

    let template;
    if (NS) {
        // Xml maybe later
        template = document.createElementNS(NS, 'g');
        template.innerHTML = html_string.trim();
        return template.firstChild;
    }
    else {
        template = document.createElement('template');
        template.innerHTML = html_string.trim();
        return template.content.firstChild;
    }

}