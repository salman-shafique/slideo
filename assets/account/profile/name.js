import apiService from "Editor/js/utils/apiService";
import add_event from "Editor/js/utils/add_event";
import toastr from "Editor/js/components/toastr";


const fullnameDiv = document.getElementById("fullnameDiv");
const fullnameInput = document.getElementById("fullnameInput");
const fullnameButton = document.getElementById("fullnameButton");
const UserNameField = document.getElementById("UserNameField");
add_event(".profile-update-fullname", "click", () => {
    // Toggle input
    if (fullnameDiv.style.display == "none")
        fullnameDiv.style.display = "";
    else
        fullnameDiv.style.display = "none";

})

add_event(fullnameButton, "click", (e) => {
    if (fullnameInput.value.length <= 2) {
        toastr.error("Please enter a longer name");
        return;
    }

    const newFullname = fullnameInput.value;

    apiService({
        url: "/api/account/change/fullname",
        data: {
            new_fullname: newFullname
        },
        success: (r) => {
            if (r.success) {
                fullnameDiv.style.display = "none";
                UserNameField.innerHTML = newFullname;
                toastr.success("Your full name updated!");
                return;
            }
            toastr.error(r.descr, "Oops, your full name was not updated");
        }
    });
})



