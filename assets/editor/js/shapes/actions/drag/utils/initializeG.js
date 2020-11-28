/**
 * 
 * @param {SVGGElement} g 
 */
export default function initializeG(g) {
    if (g)
        if (g.transform.baseVal.length == 0) {
            // initialize the element
            let freshTranslate = g.ownerSVGElement.createSVGTransform();
            freshTranslate.setTranslate(0, 0);
            g.transform.baseVal.appendItem(freshTranslate);

            let freshScale = g.ownerSVGElement.createSVGTransform();
            freshScale.setScale(1, 1);
            g.transform.baseVal.appendItem(freshScale);

            let freshRotate = g.ownerSVGElement.createSVGTransform();
            freshRotate.setRotate(0, null, null);
            g.transform.baseVal.appendItem(freshRotate);
        }
}
