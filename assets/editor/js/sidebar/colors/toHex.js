export default function toHex(color = "") {
    if (!color) return null;

    if (color.split(" ").length == 3)
        // Stored color format
        color = 'rgb(' + color.replace(/ /g, ",") + ")";

    color = color.trim().replace(/ /g, "");
    // Hex already
    if (color[0] == "#")
        return color;

    let r, g, b, a;
    if (color.includes("rgb")) {
        [r, g, b, a] = color.replace(/(rgba\()|(rgb\()|(\))/g, "").split(",");

        if (a) {
            a = parseInt((parseFloat(a) * 255)).toString(16).toUpperCase();
            if (a.length == 1) a = "0" + a;
        }
        r = parseInt(r).toString(16).toUpperCase();
        if (r.length == 1) r = "0" + r;
        g = parseInt(g).toString(16).toUpperCase();
        if (g.length == 1) g = "0" + g;
        b = parseInt(b).toString(16).toUpperCase();
        if (b.length == 1) b = "0" + b;

        return "#" + r + g + b;
    }
}