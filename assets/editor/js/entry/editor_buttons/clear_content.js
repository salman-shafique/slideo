import add_event from "Editor/js/utils/add_event";

add_event("#entry_clear_content", "click", function () {
    let area = document.getElementById("area");
    if (area) area.innerHTML = "";
    
    let firstContent = document.getElementById("first-area");
    if (firstContent)
        firstContent.innerHTML = "";
})