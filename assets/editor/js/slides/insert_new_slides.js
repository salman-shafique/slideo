import session from "Editor/js/session";
import refresh_slide_prev_numbers from "Editor/js/slides/utils/refresh_slide_prev_numbers";
import html_to_element from "Editor/js/utils/html_to_element";
import add_event from "Editor/js/utils/add_event";


export default function insert_new_slides(slide, init = false) {

    let mini_prev_container = `
        <div class="slide-thumbnail" data-slide-id="${slide.slideId}">
        <img src="https://dummyimage.com/1200x800/b30909/000000&text=${slide.slideId}">
        <div class="remove-slide">
            <i class="fas fa-trash-alt text-white"></i>
        </div>
        <span class="slide-sl text-white mr-2"></span>
        </div>
        `;


    let container = html_to_element(mini_prev_container);

    add_event(container, "click", function () {
        $(".slide-thumbnail").removeClass("active-slide");
        $(this).addClass("active-slide");
        $("#Main_Slide").attr("data", slide.style.svgFile);
    });
    document.getElementById("slides_preview").appendChild(container);

    if (!init) {
        session.PRESENTATION.slidesOrder.push(slide.slideId);
        session.PRESENTATION.slides.push(slide);
    } else {
        container.click();
    }

    refresh_slide_prev_numbers();


    console.log(slide.slideId, "inited");

}
