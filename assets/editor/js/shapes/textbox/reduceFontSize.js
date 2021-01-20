import constants from "Editor/js/constants";

export default function reduceFontSize(foreignObject) {

    let fontSize = parseFloat(foreignObject.querySelector("table").style.fontSize.replace("px", ""));
    while (true) {
        let tableHeight, textBoxHeight;
        if (constants.IS_CHROME) {
            tableHeight = foreignObject.querySelector("table").getBoundingClientRect().height / window.devicePixelRatio;
            textBoxHeight = foreignObject.getBoundingClientRect().height / window.devicePixelRatio;
        } else {
            tableHeight = foreignObject.querySelector("table").getBoundingClientRect().height;
            textBoxHeight = foreignObject.getBoundingClientRect().height;
        }

        if (textBoxHeight + 1 > tableHeight)
            break;

        fontSize--;
        foreignObject.querySelector("table").style.fontSize = fontSize + "px";
    }
    return parseInt(fontSize);
}