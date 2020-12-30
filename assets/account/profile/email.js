import apiService from "Editor/js/utils/apiService";
import add_event from "Editor/js/utils/add_event";
import toastr from "Editor/js/components/toastr";


const emailDiv = document.getElementById("emailDiv");
const emailInput = document.getElementById("emailInput");
const emailButton = document.getElementById("emailButton");
const UserEmailField = document.getElementById("UserEmailField");
add_event(".profile-update-email", "click", () => {
    // Toggle input
    if (emailDiv.style.display == "none")
        emailDiv.style.display = "";
    else
        emailDiv.style.display = "none";

})

add_event(emailButton, "click", (e) => {
    if (!emailInput.checkValidity()) {
        toastr.error("Please enter a valid email");
        return;
    }

    const newEmail = emailInput.value;

    apiService({
        url: "/api/account/change/email",
        data: {
            new_email: newEmail
        },
        success: (r) => {
            if (r.success) {
                emailDiv.style.display = "none";
                UserEmailField.innerHTML = newEmail;
                toastr.success("Your email updated!");
                return;
            }
            toastr.error(r.descr, "Oops, something went wrong");
        }
    });
})



