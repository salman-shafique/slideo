
import add_event from "Editor/utils/add_event";

add_event("#entry_remove_format", "click", function () {
    let area = document.getElementById("area");
    let firstContent = document.getElementById("first-area");
    [area, firstContent].forEach(input => {
        if (input)
            input.querySelectorAll("*").forEach(e => {
                e.setAttribute("style", "");
                e.setAttribute("class", "");
            });
    });
})
