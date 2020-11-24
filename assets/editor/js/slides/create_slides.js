import session from "Editor/js/session";
import reset_next_slide from "./reset_next_slide";
import create_slide_modal from "Editor/js/entry/create_slide_modal";
import status from "Editor/js/navbar/status";
import slide from "Editor/js/entity/slide";
import apiService from "Editor/js/utils/apiService";


export default function create_slides() {
    create_slide_modal.close();
    status.update("Slides creating...");

    apiService({
        url: "/api/editor/create/slides",
        data: {
            "slides": session.NEW_SLIDES
        },
        success: (response) => {
            // Create slides
            response.forEach(slideData => {
                slide().appendToPresentation(slideData).insertToPage();
            });
            status.update("Slides created...");
        }
    });
    reset_next_slide();
    session.NEW_SLIDES = [];
}