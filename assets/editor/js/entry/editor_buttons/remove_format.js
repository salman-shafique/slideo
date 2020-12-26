
import add_event from "Editor/js/utils/add_event";

add_event("#entry_remove_format", "click", function () {
    let area = document.getElementById("area");

    if (area)
        area.querySelectorAll("*").forEach(e => {
            e.setAttribute("style", "");
            e.setAttribute("class", "");
        });

})
