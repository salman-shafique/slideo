import add_event from "Editor/js/utils/add_event";

add_event("#entry_clear_content", "click", function () {
    let area = document.getElementById("area");
    if (area) area.innerHTML = "";

    let slideTitle = document.getElementById("slideTitle");
    if (slideTitle) slideTitle.value = "";

})