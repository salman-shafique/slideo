
/**
 * @param {SVGGElement} g
 */

export default function getSizeAttributes(g) {
    const width = parseFloat(g.getAttribute("width"));
    const height = parseFloat(g.getAttribute("height"));
    const x = parseFloat(g.getAttribute("x"));
    const y = parseFloat(g.getAttribute("y"));
    return {
        slope: height / width,
        width: width,
        height: height,
        x: x,
        y: y
    }
}