import html_to_element from "Editor/js/utils/html_to_element";

export default function createForeignObject(svg, positionObj = { x: 2000, y: 2000, width: 2000, height: 2000 }) {
    // Generate the foreign object
    let foreignObject = svg.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    foreignObject.setAttribute("x", positionObj.x);
    foreignObject.setAttribute("y", positionObj.y);
    foreignObject.setAttribute("width", positionObj.width);
    foreignObject.setAttribute("height", positionObj.height);

    // Clone the template
    let contentTemplate = html_to_element(`
        <table style="pointer-events:none;width:100%">
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