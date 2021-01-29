import React from "react";
import "Editor/css/full-screen.css";
import deSelectAll from "Editor/js/shapes/actions/drag/utils/deSelectAll";
import session from "Editor/js/session";
import sidebar from "Editor/js/entity/sidebar";
import slide from "Editor/js/entity/slide";


export default function DownloadButton() {
    const SlideContainer = document.getElementById("SlideContainer");
    let status = null;
    const preview = () => {
        sidebar.closeAll();
        deSelectAll();
        SlideContainer.classList.add("full-screen");

        session.SHAPE_STATE = "PREVIEW";
    }
    const endPreview = () => {
        SlideContainer.classList.remove("full-screen");
        SlideContainer.classList.remove("completed");
        session.SHAPE_STATE = null;
        status = null;
    }

    const next = () => {
        const currentSlideIndex = session.PRESENTATION.slidesOrder.indexOf(session.CURRENT_SLIDE);

        if (currentSlideIndex == session.PRESENTATION.slidesOrder.length - 1) {

            if (!status) {
                // Last slide
                status = "END";
                SlideContainer.classList.add("completed");
                return;
            }
            if (status == "END") {
                endPreview();
                return;
            }
        }

        slide(session.PRESENTATION.slidesOrder[currentSlideIndex + 1]).display();
    }
    const prev = () => {
        const currentSlideIndex = session.PRESENTATION.slidesOrder.indexOf(session.CURRENT_SLIDE);

        if (currentSlideIndex == session.PRESENTATION.slidesOrder.length - 1)
            if (status == "END") {
                slide(session.PRESENTATION.slidesOrder[currentSlideIndex]).display();
                SlideContainer.classList.remove("completed");
                status = null;
                return;
            }

        if (currentSlideIndex - 1 >= 0)
            slide(session.PRESENTATION.slidesOrder[currentSlideIndex - 1]).display();

    }

    window.addEventListener('keyup', (event) => {
        if (session.SHAPE_STATE != "PREVIEW") return;
        const key = event.key;
        switch (key) {
            case "Escape":
                endPreview()
                break;
            case "ArrowRight":
            case "ArrowUp":
                next();
                break;
            case "ArrowDown":
            case "ArrowLeft":
                prev();
                break;
            default:
                break;
        }
    });

    return (
        <button onClick={preview} className="btn btn-secondary bevel-btn horizontal-text-clip m-0">
            <i className="fas fa-play mr-2"></i>
            תצוגה מקדימה
        </button>
    )
}