import insert_new_slides from "Editor/js/slides/insert_new_slides";
import session from "Editor/js/session";

jQuery(function () {
    $.ajax({
        method: "POST",
        url: "/editor/presentation/init",
        dataType: "json",
        success: function (presentation) {
            session.PRESENTATION = presentation;
            presentation.slides.forEach(a_slide => {
                insert_new_slides(a_slide, true);
            });
            document.getElementById("slides_preview").children[0].click();
            console.log(presentation);
            console.log(session);
        }
    })
})
