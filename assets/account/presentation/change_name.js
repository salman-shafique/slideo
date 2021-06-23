import toastr from "Editor/js/components/toastr";
import add_event from "Editor/js/utils/add_event";
import apiService from "Editor/js/utils/apiService";

const input = document.getElementsByClassName('ppt-title');
Array.from(input).forEach(e => {
    e.style.width = (e.value.length - 1) + "ch";
})

add_event(".ppt-title", "change", function (e) {

    if (e.target.style.width < "190px") {
        e.target.style.width = (e.target.value.length - 1) + "ch";
    }

    let presentation_name = e.target.value?.trim();
    let presentation_id = e.target.id;
    if (!presentation_name) return;

    apiService({
        url: `/api/presentation/change_name/${presentation_id}`,
        data: {
            "presentation_name": presentation_name
        },
        success: (response) => {
            response.success
                ? toastr.success("Presentation name updated")
                : toastr.error("Opss... Something went wrong");
        },
    });
})