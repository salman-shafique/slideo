import add_event from "Editor/utils/add_event";

add_event("#entry_clear_content", "click", function () {
    let area = document.getElementById("area");
    let firstContent = document.getElementById("first-area");
    if (area) area.innerHTML = "";
    if (firstContent)
        firstContent.innerHTML = "";
})