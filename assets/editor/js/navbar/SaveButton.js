import React from "react";
import preloader from "Editor/js/components/preloader";
import apiService from "Editor/js/utils/apiService";
import slide from "Editor/js/entity/slide";
import session from "Editor/js/session";


const preloader_ = preloader();

export function saveChanges() {
    preloader_.show();
    console.log("I am saving the changes");

    apiService({
        url: "/api/presentation/download",
        success: () => {
            preloader_.hide();
            console.log("saved");
        }
    })
}


export default function SaveButton() {
    return (
        <button onClick={saveChanges} className="btn btn-info bevel-btn horizontal-text-clip">
            לשמור
        </button>
    )
}