import session from "Editor/session";
import reset_next_slide from "./reset_next_slide";

export default function create_slides() {
    console.log(session.NEW_SLIDES);
    $.ajax({
        method: "POST",
        url: "/editor/create/slides",
        dataType: "json",
        data: {
            "slides": session.NEW_SLIDES
        },
        success: function (result) {
            console.log(result);
            document.getElementById("entry_result").innerHTML = JSON.stringify(result,null,3);
            document.getElementById("entry_clear_content").click();
        }
    })

    reset_next_slide();
    session.NEW_SLIDES = [];
}