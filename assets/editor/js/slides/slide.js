import session from "Editor/js/session";
import refresh_slide_prev_numbers from "./utils/refresh_slide_prev_numbers";
import html_to_element from "Editor/js/utils/html_to_element";
import add_event from "Editor/js/utils/add_event";


class slide {
    constructor(slide_id) {
        this.slide_id = slide_id;
        this.mini_prev_container = `
        <div class="slide-thumbnail" data-slide-id="${this.slide_id}">
          <img src="https://dummyimage.com/1200x800/b30909/000000&text=${this.slide_id}">
          <div class="remove-slide">
            <i class="fas fa-trash-alt text-white"></i>
          </div>
          <span class="slide-sl text-white mr-2"></span>
        </div>
        `;

        // Append to mini prevs

        let container = html_to_element(this.mini_prev_container);
        add_event(container, "click", function () {
            $(".slide-thumbnail").removeClass("active-slide");
            $(this).addClass("active-slide");
            $("#Main_Slide").attr("src", $(this).find("img").attr("src"));
        });
        document.getElementById("slides_preview").appendChild(container);
        delete this.mini_prev_container;

        session.DATA.slide_order.push(this.slide_id);
        session.DATA.slides.push(this);
        refresh_slide_prev_numbers();


        console.log(slide_id, "inited");
    }



    test() {
        console.log(this.slide_id);
    }
}

export default slide;