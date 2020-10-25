import session from "Editor/js/session";
import reset_next_slide from "./reset_next_slide";
import create_slide_modal from "Editor/js/entry/create_slide_modal";


export default function create_slides() {
    console.log(session.NEW_SLIDES);
    create_slide_modal.close();
    $.ajax({
        method: "POST",
        url: "/editor/create/slides",
        dataType: "json",
        data: {
            "slides": session.NEW_SLIDES
        },
        success: function (result) {
            // Push them into the session slides
            result.forEach(slide => {
                session.DATA.slides.push(slide)
                session.DATA.slide_order.push(slide.slide_id)
            });
            console.log(session);
            document.getElementById("entry_result").innerHTML = JSON.stringify(result, null, 3);
        }
    })

    reset_next_slide();
    session.NEW_SLIDES = [];
}