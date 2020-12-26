import apiService from "Editor/js/utils/apiService";
import add_event from "Editor/js/utils/add_event";
import toastr from "Editor/js/components/toastr";


const thumbnailUploadDiv = document.getElementById("thumbnailUpload");
const thumbnailUploadInput = document.getElementById("thumbnailUploadInput");
const thumbnailUploadButton = document.getElementById("thumbnailUploadButton");
const thumbnail = document.getElementById("thumbnail");
add_event(".profile-update-image", "click", () => {
    // Toggle input
    if (thumbnailUploadDiv.style.display == "none")
        thumbnailUploadDiv.style.display = "";
    else
        thumbnailUploadDiv.style.display = "none";

})

add_event(thumbnailUploadButton, "click", (e) => {
    if (thumbnailUploadInput.files.length == 0) {
        toastr.error("Please select an image file first");
        return;
    }

    const file = thumbnailUploadInput.files[0];
    const formData = new FormData();
    formData.append('image', file, 'image');

    apiService({
        url: "/api/account/change/avatar",
        data: formData,
        success: (r) => {
            if (r.success) {
                thumbnailUploadDiv.style.display = "none";
                thumbnail.setAttribute("src", r.url);
                toastr.success("Your image updated!");
                return;
            }
            toastr.error(r.descr, "Oops, something went wrong");

        },
        processData: false,
        contentType: false
    });
})