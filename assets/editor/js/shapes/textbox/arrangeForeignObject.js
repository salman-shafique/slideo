import constants from "Editor/js/constants";
import reduceFontSize from "./reduceFontSize";

export default function arrangeForeignObject(foreignObject, shape, text, direction) {
    let table = foreignObject.querySelector("table");

    // Vertical alignment
    if (shape.vertical_anchor == "1") {
        table.style.top = "0";
        table.querySelector("td").setAttribute("valign", "top");
    }
    if (shape.vertical_anchor == "4") {
        table.style.bottom = "0";
        table.querySelector("td").setAttribute("valign", "bottom");
    }
    
    // Default h-alignment 2 - center - from python
    table.style.textAlign = constants.ALIGNMENTS[shape.alignment];

    let margin_bottom_content = Math.round(parseFloat(shape.margin_bottom_ratio) * constants.SVG_HEIGHT);
    let margin_top_content = Math.round(parseFloat(shape.margin_top_ratio) * constants.SVG_HEIGHT);
    let margin_left_content = Math.round(parseFloat(shape.margin_left_ratio) * constants.SVG_WIDTH);
    let margin_right_content = Math.round(parseFloat(shape.margin_right_ratio) * constants.SVG_WIDTH);
    table.querySelector("td").style.paddingBottom = margin_bottom_content + "px";
    table.querySelector("td").style.paddingTop = margin_top_content + "px";
    table.querySelector("td").style.paddingLeft = Math.round(margin_left_content) + "px";
    table.querySelector("td").style.paddingRight = Math.round(margin_right_content) + "px";

    // Underline
    let text_decoration;
    shape.underline == "True" ? text_decoration = "underline" : text_decoration = '';
    table.style.textDecoration = text_decoration;

    // Italic
    let font_style;
    shape.italic == "True" ? font_style = "italic" : font_style = '';
    table.style.fontStyle = font_style;

    // Why?
    //table.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");

    // Font family
    table.style.fontFamily = shape.font_family;

    // Direction
    table.style.direction = direction;

    if (!shape.sizeRatio)
        shape.sizeRatio = reduceFontSize(foreignObject);

    table.style.fontSize = shape.font_size + "px";
    //font_size = shape.sizeRatio * constants.SVG_HEIGHT / parseFloat(shape.scale);

    // bold
    table.style.fontWeight = shape.font_weight;

    //if()
    if (!shape.text_theme_color)
        table.style.color = '#' + shape.text_hex;

    table.querySelector("tr").style.height = Math.round(shape.height) + "px";

    // Add content text            
    table.querySelector("td").innerText = text;

    // change content handlers
    table.querySelector("td").setAttribute("contenteditable", "true");
}