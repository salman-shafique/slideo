import disableTextSelect from "./disableTextSelect";

export default function dragPreventDefault(g, clear = null) {
    if (clear) {
        // Do not prevent
        g.ownerDocument.removeEventListener('selectstart', disableTextSelect);
        if (g.ownerDocument.querySelector("svg").classList.contains("dragging"))
            g.ownerDocument.querySelector("svg").classList.remove("dragging");

        return;
    }

    // Prevenet event defaults
    if (!g.ownerDocument.querySelector("svg").classList.contains("dragging"))
        g.ownerDocument.querySelector("svg").classList.add("dragging");
    g.ownerDocument.addEventListener("selectstart", disableTextSelect);


}