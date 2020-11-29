
/**
 * 
 * @param {string} text 
 * @returns {?string}
 */
export default function clear_text(text) {
    if (!text) return null;
    text = text.replace(/[•¡§·]/g, "").trim();
    while (["-", "Ø", " "].includes(text[0]))
        text = text.slice(1, text.length)
    text = text.trim();
    if (text.length > 1)
        return text;
    else
        null;
}