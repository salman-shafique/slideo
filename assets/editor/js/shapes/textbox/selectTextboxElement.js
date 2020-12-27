/**
 * 
 * @param {Event} event 
 */
export default function selectTextboxElement(event) {
    /**
      * @type {SVGGElement} g
      */
    const g = event.target.parentElement;
    if (!g.querySelector("foreignObject")) return;

    if (!g.classList.contains("text_editing"))
        g.classList.add("text_editing");

    g.querySelector("td").focus();
}