import constants from "Editor/js/constants";
import shape from "Editor/js/entity/shape";

/**
 * 
 * @param {SVGGElement} g 
 * @returns 
 */
export const getMinFontSize = (g) => {
  const foreignObject = g.querySelector("foreignObject");
  if (!foreignObject) return null;

  let fontSize = parseFloat(foreignObject.querySelector("table").style.fontSize.replace("px", ""));

  let tableHeight, foreignObjectHeight;

  constants.IS_CHROME
    ? foreignObjectHeight = foreignObject.getBoundingClientRect().height / window.devicePixelRatio
    : foreignObjectHeight = foreignObject.getBoundingClientRect().height;

  while (true) {
    constants.IS_CHROME
      ? tableHeight = foreignObject.querySelector("table").getBoundingClientRect().height / window.devicePixelRatio
      : tableHeight = foreignObject.querySelector("table").getBoundingClientRect().height;

    if (foreignObjectHeight + 1 > tableHeight)
      break;

    fontSize--;
    foreignObject.querySelector("table").style.fontSize = fontSize + "px";
  }
  return parseInt(fontSize);
}
/**
 * 
 * @param {SVGGElement[]} gs 
 * @returns 
 */
export default function reduceFontSize(gs) {

  let minFontSize = 0;
  gs.forEach(g => {
    const shape_ = shape(g);
    const shapeData = shape_.data();
    if (shapeData.active == "false") return;
    if (shapeData.font_size_optimized) return;

    const fontSize = getMinFontSize(g);
    if (fontSize === null) return;

    if (minFontSize > fontSize)
      minFontSize = fontSize;
  });

  gs.forEach(g => {
    const shape_ = shape(g);
    const shapeData = shape_.data();
    if (shapeData.active == "false") return;
    if (shapeData.font_size_optimized) return;
    if (minFontSize === 0) return;

    shapeData.font_size = minFontSize;
    g.querySelector("table").style.fontSize = minFontSize + "px";
    shapeData.font_size_optimized = "true";
  });
}