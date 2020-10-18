import clear_text from "Editor/utils/clear_text";
import session from "Editor/session";
import add_event from "Editor/utils/add_event";
import toastr from "toastr";
import create_slides from "Editor/slides/create_slides";


add_event("#entry_analyze", "click", function () {
    let slideContent = false;
    let slideTitle = false;

    if (clear_text(session.EDITOR.innerText))
        slideContent = true;
    if (clear_text(document.getElementById("slideTitle").value))
        slideTitle = true;

    if (!slideContent && !slideTitle) {
        toastr.error("no content");
        return;
    }

    if (slideTitle && !slideContent) {
        session.NEXT_SLIDE.direction = session.DIRECTION;
        session.NEXT_SLIDE.sentences = [document.getElementById("slideTitle").value];
        session.NEW_SLIDES.push(session.NEXT_SLIDE);
        create_slides();
        return;
    }
    return;
    session.DIRECTION == "ltr" ? marginAlignment = "marginLeft" : marginAlignment = "marginRight";

    let lines = [];
    let div;
    session.EDITOR.childNodes.forEach(node => {
        clear_mso_specials(node);
        if (clear_text(node.innerText))
            switch (node.tagName) {
                case "UL":
                case "OL":
                    node.childNodes.forEach(li => {
                        if (clear_text(li.innerText))
                            lines.push(li);
                    });
                    break;
                case "DIV":
                    // Can be pasted element
                    if (node.classList.length == 0 && !node.getAttribute("style")) {
                        if (node.querySelector("*[style]")) {
                            // Pasted element
                            for (i = 0; i < node.childNodes.length; i++) {
                                let inner_node = node.childNodes[i];
                                if (clear_text(inner_node.innerText))
                                    lines.push(inner_node);
                                else {
                                    // Check tab spaces indent 
                                    if (node.childNodes.length == 2)
                                        if (node.querySelector("[style='white-space:pre']")) {
                                            let spaces = inner_node.innerText.length;
                                            node.style[marginAlignment] = (spaces * 10) + "px";
                                            lines.push(node);
                                            break;
                                        }
                                }
                            }
                            break;
                        }
                        if (node.childNodes.length == 1) {
                            // Typed text
                            div = document.createElement("div");
                            div.innerText = node.childNodes[0].wholeText;
                            lines.push(div);
                            break;
                        }
                        if (node.querySelector("br")) {
                            // Shift+Enter behaivor
                            node_texts = node.innerHTML.split("<br>");
                            if (node_texts)
                                node_texts.forEach(node_text => {
                                    if (clear_text(node_text)) {
                                        div = document.createElement("div");
                                        div.innerText = node_text;
                                        lines.push(div);
                                    }
                                });
                            break;
                        }
                    } else
                        lines.push(node);
                    break;
                default:
                    lines.push(node);
                    break;
            }
        else {
            // text node
            if (typeof (node) == "object")
                if (!node.tagName)
                    if (clear_text(node.wholeText)) {
                        div = document.createElement("div");
                        div.innerText = node.wholeText;
                        lines.push(div);
                    }
        }
    });

    let k = 0;
    let not_classified = [];
    let root = document.createElement("root");

    root.setAttribute("id", "id-" + k + "-0");
    root.setAttribute("level", "-1");

    not_classified.push(root)
    let levels = {};
    // Give them ids
    let id = 1;

    lines.forEach(line => {
        if (clear_text(line.innerText)) {
            switch (line.tagName) {
                case "LI":
                    line.id = "id-" + k + "-" + id;
                    not_classified.push(line);
                    margin = line.style[marginAlignment];
                    if (!margin)
                        margin = "40";
                    else {
                        margin = parseInt(margin.replace(/(em)|(px)|(in)|(ex)|(ch)|(rem)|(vw)|(vh)|(vmin)|(vmax)|(%)/g, "")) + 40;
                    }
                    if (!levels[margin])
                        levels[margin] = [];
                    levels[margin].push(line.id);
                    id++;
                    break;
                default:
                    line.id = "id-" + k + "-" + id;
                    not_classified.push(line);
                    margin = line.style[marginAlignment].replace(/(em)|(px)|(in)|(ex)|(ch)|(rem)|(vw)|(vh)|(vmin)|(vmax)|(%)/g, "")
                    if (!margin)
                        margin = "0";
                    if (!levels[margin])
                        levels[margin] = [];
                    levels[margin].push(line.id);
                    id++;
                    break;
            }
        }
    });

    // sort them according to margins
    let margins = [];
    Object.keys(levels).forEach(function (key) {
        margins.push(parseFloat(key));
    });
    margins.sort();

    // find levels
    let level = 0;
    margins.forEach(function (margin) {
        levels[String(margin)].forEach(function (id) {
            lines.forEach(line => {
                if (line.getAttribute('id') == id)
                    line.setAttribute("level", level)
            });
        });
        level++;
    });

    let max = not_classified.length;
    for (let i = max - 1; i > 0; i--) {
        line_bottom = not_classified[i];
        level_bottom = parseInt(line_bottom.getAttribute("level"));
        siblings = [];
        for (j = i - 1; j >= 0; j--) {
            line_up = not_classified[j];
            level_up = parseInt(line_up.getAttribute("level"));
            if (level_up < level_bottom) {
                siblings.push(line_bottom)
                siblings.forEach(element => {
                    element.setAttribute("parent", line_up.getAttribute("id"));
                });
                siblings = [];
                break;
            }
            if (i == 1 && j == 0) {
                siblings.push(line_bottom);
                siblings.push(line_up);
                siblings.forEach(element => {
                    element.setAttribute("parent", "id-" + k + "-0");
                });
            }
            if (level_up == level_bottom) {
                siblings.push(line_up);
                continue;
            }
        }
        if (siblings.length > 1) {
            siblings.push(line_bottom);
            siblings.forEach(element => {
                element.setAttribute("parent", "id-" + k + "-0");
            });
        }
    }
    let tmp_slides = []
    // Start from 0 and link them
    margins.forEach(function (margin) {
        // copy elements ids
        elements_at_this_level = [];

        levels[String(margin)].forEach(function (id) {
            lines.forEach(line => {
                if (line.getAttribute("id") == id)
                    elements_at_this_level.push(line);
            })
        });

        level = elements_at_this_level[0].getAttribute("level");

        let children = [];
        lines.forEach(line => {
            if (line.getAttribute("parent") == 'id-' + k + '-0')
                if (line.getAttribute("level") == level)
                    children.push(line);
        });
        tmp_slide = create_slide(root, children);

        if (tmp_slide)
            tmp_slides.push(tmp_slide);
        for (i = 0; i < elements_at_this_level.length; i++) {
            current_element = elements_at_this_level[i];
            id = current_element.id;
            children = [];
            lines.forEach(line => {
                if (line.getAttribute("parent") == id)
                    children.push(line);
            });
            tmp_slide = create_slide(current_element, children);
            if (tmp_slide)
                tmp_slides.push(tmp_slide);
        }
    });

    create_slides(tmp_slides);
    fast_prev();
});