import stringToDOM from "Editor/js/utils/stringToDOM";

export default function createForeignObject(svg, positionObj = { x: 2000, y: 2000, width: 2000, height: 2000 }) {
    // Generate the foreign object
    let foreignObject = svg.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    foreignObject.setAttribute("x", positionObj.x);
    foreignObject.setAttribute("y", positionObj.y);
    foreignObject.setAttribute("width", positionObj.width);
    foreignObject.setAttribute("height", positionObj.height);
    foreignObject.setAttribute("class", "bounding_box");

    // Clone the template
    let contentTemplate = stringToDOM(`
        <table style="width:100%">
            <tbody style="padding: 0;">
                <tr style="padding: 0;">
                    <td style="padding: 0;line-height: 1.23;">
                    </td>
                </tr>
            </tbody>
        </table>
    `);

    foreignObject.appendChild(contentTemplate);

    return foreignObject;
}