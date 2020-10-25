import add_event from "Editor/js/utils/add_event";


add_event("#presentation_name", "change", function () {
    console.log("change");
    let presentation_name = document.getElementById("presentation_name").value;
    if (!presentation_name) return;
    $.ajax({
        method: "POST",
        url: "/editor/presentation/change_name",
        dataType: "json",
        data: {
            "presentation_name": presentation_name
        },
        success: function (result) {
            console.log(result);
        }
    })
})