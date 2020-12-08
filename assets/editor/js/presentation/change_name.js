import add_event from "Editor/js/utils/add_event";
import apiService from "Editor/js/utils/apiService";

add_event("#presentation_name", "change", function () {
    let presentation_name = document.getElementById("presentation_name").value;
    if (!presentation_name) return;

    apiService({
        url: "/api/presentation/change_name",
        data: {
            "presentation_name": presentation_name
        },
        success: (response) => {
        },
    });
})