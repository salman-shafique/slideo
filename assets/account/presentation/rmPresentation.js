import apiService from "Editor/js/utils/apiService";
import add_event from "Editor/js/utils/add_event";
import toastr from "Editor/js/components/toastr";


add_event(".ppt-remove", "click", (e) => {
    const presentationId = e.target.getAttribute("presentation-id");

    apiService({
        url: "/api/presentation/remove/" + presentationId,
        success: () => {
            toastr.success("", "Presentation deleted.")
            e.target.parentElement.remove();
        }
    })

    e.preventDefault();
})
