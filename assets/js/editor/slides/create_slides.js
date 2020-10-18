import session from "Editor/session";
import reset_next_slides from "./reset_next_slides";

export default function create_slides() {

    $.ajax({
        method: "POST",
        url: "/editor/create/slides",
        dataType: "json",
        data: {
            "slides": session.NEW_SLIDES
        },
        success: function (result) {
            console.log(result)
        }
    })

    reset_next_slides();
}