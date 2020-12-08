import add_event from "Editor/js/utils/add_event";
import apiService from "Editor/js/utils/apiService";

add_event('.download-pptx,.download-pdf', 'click', function () {
    let type = 'pdf';
    if (this.classList.contains('download-pptx'))
        type = 'pptx'

    apiService({
        url: "/api/presentation/download",
        data: {
            "type": type
        },
        success: (response) => {
        }
    });

})