import session from "Editor/js/session";

export default function switch_direction(dir) {
    let inline_editors = document.querySelectorAll(".inline-editor");
    let area = document.getElementById("area");
    let slide_title = document.getElementById("slideTitle");
    let first_area = document.getElementById("first-area");
    let first_slide_title = document.getElementById("first-slideTitle");

    if (area)
        area.style.direction = dir;
    if (first_area)
        first_area.style.direction = dir;
    if (first_slide_title)
        first_slide_title.style.direction = dir;
    if (inline_editors)
        inline_editors.forEach(inline_editor => {
            inline_editor.style.direction = dir;
        });
    if (slide_title)
        slide_title.style.direction = dir;

    session.DIRECTION = dir;
}