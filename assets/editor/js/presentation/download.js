import add_event from "Editor/js/utils/add_event";

add_event('.download-pptx,.download-pdf', 'click', function () {
    let type = 'pdf';
    if (this.classList.contains('download-pptx'))
        type = 'pptx'

    $.ajax({
        method: "POST",
        url: "/editor/presentation/download",
        dataType: "json",
        data: {
            "type": type
        },
        success: function (result) {
            console.log(result);
        }
    })

})