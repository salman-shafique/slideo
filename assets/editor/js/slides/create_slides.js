import session from "Editor/js/session";
import reset_next_slide from "./reset_next_slide";
import create_slide_modal from "Editor/js/entry/create_slide_modal";
import status from "Editor/js/navbar/status";
import slide from "Editor/js/entity/slide";
import apiService from "Editor/js/utils/apiService";
import constants from "Editor/js/constants";
import preloader from "Editor/js/components/preloader";
import sidebar from "Editor/js/entity/sidebar";


const checkMaxCapacity = () => {
    let allSlides = session.NEW_SLIDES.length;

    for (let index = 0; index < allSlides; index++) {

        while (session.NEW_SLIDES[index].sentences.length > constants.MAX_SLIDE_CAPACITY) {

            let tmpSlide = {};
            tmpSlide.direction = session.NEW_SLIDES[index].direction;
            tmpSlide.slideTitle = session.NEW_SLIDES[index].slideTitle;
            tmpSlide.subTitle = session.NEW_SLIDES[index].subTitle;
            tmpSlide.sentences = session.NEW_SLIDES[index].sentences.slice(constants.MAX_SLIDE_CAPACITY);
            session.NEW_SLIDES[index].sentences = session.NEW_SLIDES[index].sentences.slice(0, constants.MAX_SLIDE_CAPACITY);

            session.NEW_SLIDES.splice(index + 1, 0, tmpSlide);

            index++;
            allSlides++;
        }
    }
}


export default function create_slides() {
    create_slide_modal.close();
    checkMaxCapacity();

    status.update("Slides creating...");

    preloader.show();
    apiService({
        url: "/api/editor/create/slides",
        data: {
            "slides": session.NEW_SLIDES
        },
        success: (response) => {
            if (response.presentationId) {
                location.href = "/editor/" + response.presentationId;
                return;
            }
            // Create slides
            response.forEach(slideData => {
                slide().appendToPresentation(slideData).insertToPage();
            });
            status.update("Slides created...");
            
            sidebar.open("Design_Tool");
            preloader.hide();
        }
    });
    reset_next_slide();
    session.NEW_SLIDES = [];
}