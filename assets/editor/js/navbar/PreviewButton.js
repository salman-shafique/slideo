import React from "react";
import "Editor/css/full-screen.css";
import deSelectAll from "Editor/js/shapes/actions/drag/utils/deSelectAll";
import session from "Editor/js/session";
import sidebar from "Editor/js/entity/sidebar";
import slide from "Editor/js/entity/slide";


export default function PreviewButton() {
    const SlideContainer = document.getElementById("SlideContainer");
    let previewControls;

    React.useEffect(() => {
        previewControls = document.querySelector(".preview-controls");
    }, [previewControls]);

    let status = null;
    const preview = () => {
        sidebar.closeAll();
        deSelectAll();
        SlideContainer.classList.add("full-screen");
        previewControls.classList.remove("d-none");

        session.SHAPE_STATE = "PREVIEW";
    }
    const endPreview = () => {
        SlideContainer.classList.remove("full-screen");
        SlideContainer.classList.remove("completed");
        previewControls.classList.add("d-none");
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
    const firstSlide = () => {
        if (status == "END") {
            SlideContainer.classList.remove("completed");
            status = null;
        }
        slide(session.PRESENTATION.slidesOrder[0]).display();
    }
    const lastSlide = () => {
        if (status == "END") {
            SlideContainer.classList.remove("completed");
            status = null;
        }
        slide(session.PRESENTATION.slidesOrder.slice(-1)[0]).display();
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
        <>
            <button onClick={preview} className="btn btn-secondary bevel-btn horizontal-text-clip m-0">
                <i className="fas fa-play mr-2"></i>
                הצג שקפים
            </button>
            <div className="preview-controls d-none">
                <span title="First Slide" className="d-none" onClick={firstSlide}>
                    <i className="fas fa-fast-backward"></i>
                </span>
                <span title="Previous Slide" onClick={prev}>
                    <i className="fas fa-caret-left fa-lg"></i>
                </span>
                <span title="End Presentation" onClick={endPreview}>
                    <i className="fas fa-stop"></i>
                </span>
                <span title="Next Slide" onClick={next}>
                    <i className="fas fa-caret-right fa-lg"></i>
                </span>
                <span title="Last Slide" className="d-none" onClick={lastSlide}>
                    <i className="fas fa-fast-forward"></i>
                </span>
            </div>

        </>






    )
}