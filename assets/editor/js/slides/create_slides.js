import session from "Editor/js/session";
import reset_next_slide from "./reset_next_slide";
import create_slide_modal from "Editor/js/entry/create_slide_modal";
import status from "Editor/js/navbar/status";
import insert_new_slides from "./insert_new_slides";


export default function create_slides() {
    console.log(session.NEW_SLIDES);
    create_slide_modal.close();
    status.update("Slides creating...");
    $.ajax({
        method: "POST",
        url: "/editor/create/slides",
        dataType: "json",
        data: {
            "slides": session.NEW_SLIDES
        },
        success: function (result) {
            // Create slides
            result.forEach(a_slide => {
                insert_new_slides(a_slide);
            });
            console.log(session);
            status.update("Slides created...");
        }
    })

    reset_next_slide();
    session.NEW_SLIDES = [];
}