export default function clear_mso_specials(node) {
    // text node
    if (node.nodeType == 3) return;

    // Bullet points etc.
    let mso_specials = node.querySelectorAll("*[style*='mso-special-format:']");
    if (mso_specials)
        mso_specials.forEach(e => {
            if (e.childElementCount == 0)
                e.remove();
        });

    // Remove the table from the content. We will create the actual tables later.
    if (node.tagName == "TABLE")
        node.innerHTML = "";
}