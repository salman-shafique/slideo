import apiService from "Editor/js/utils/apiService";
import add_event from "Editor/js/utils/add_event";
import toastr from "Editor/js/components/toastr";
import reactToDOM from "Editor/js/utils/reactToDOM";
import React from "react";

add_event(".ppt-remove", "click", (e) => {
    e.preventDefault();
    const presentationId = e.target.getAttribute("presentation-id");
    const alertBox = reactToDOM(
        <div>
            <p>Do you want to delete this presentation?</p>
            <button className="btn btn-info">Yes, delete it!</button>
        </div>
    );
    
    alertBox.querySelector("button").onclick = () => {
        apiService({
            url: "/api/presentation/remove/" + presentationId,
            success: () => {
                toastr.success("", "Presentation deleted.")
                e.target.parentElement.remove();
            }
        })
    }
    toastr.error(alertBox)
    e.preventDefault();
})
