import React from "react";
import "Editor/css/full-screen.css";
import deSelectAll from "Editor/js/shapes/actions/drag/utils/deSelectAll";
import session from "Editor/js/session";
import sidebar from "Editor/js/entity/sidebar";
import slide from "Editor/js/entity/slide";
import constants from "Editor/js/constants"


export default function PreviewButton() {
    const SlideContainer = document.getElementById("SlideContainer");
    let previewControls;

    React.useEffect(() => {
        previewControls = document.querySelector(".preview-controls");
    }, [previewControls]);

    React.useEffect(() => {

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

        window.addEventListener('wheel', (event) => {
            if (session.SHAPE_STATE != "PREVIEW") return;
            (event.deltaY > 0)
                ? prev()
                : next();
        });

        window.addEventListener('mouseup', (event) => {
            if (session.SHAPE_STATE != "PREVIEW") return;
            if (event.target.classList.contains('preview-btn')) return;
            next();
        });
    }, []);

    let status = null;

  // Citra's Code

  // Get slide's objects
  const slidesObj = SlideContainer.getElementsByTagName("OBJECT");

  // Functions to hide and show the slide elements
  const hide = (elements) => elements.map((e) => (e.style.display = "none"));
  const show = (elements) => elements.map((e) => (e.style.display = "block"));

  // Function to hide / show slide's title
  const hideSlideTitle = (args) => {
    // store the slide's objects into an array
    let arr = Array.from(slidesObj);

    // itirate each slide's objects in the array
    arr.map((el, i) => {
      // Get the slide title of each slide
      let slideTitleCell = el.contentDocument
        .querySelector('g[alt="slidetitle"]')
        .querySelector("td");

      // Get the underline of each slide
      let underline = el.contentDocument.querySelector('g[id="id7"]');

      // Condition to check if the slide's title text and placeholder are match
      if (slideTitleCell.innerText === constants.SLIDE_TITLE_PLACEHOLDER) {
        // check if the callback's args is true or false, hide if it's true and show if it's false
        if (args === true) {
          // hide the slide title text and underline
          hide([slideTitleCell, underline]);
        } else {
          // show the slide title text and underline
          show([slideTitleCell, underline]);
        }
      }
    });
  };

  // Function to hide / show subtitle
  const hideSubtitle = (args) => {
    // store the slide's objects into an array
    let arr = Array.from(slidesObj);

    // itirate each slide's objects in the array
    arr.map((el, i) => {
      // Get the slide subtitle of each slide
      let subtitleCell = el.contentDocument
        .querySelector('g[alt="subtitle"]')
        .querySelector("td");

      // Condition to check if the slide's subtitle text and placeholder are match
      if (subtitleCell.innerText === constants.SLIDE_SUBTITLE_PLACEHOLDER) {
        // check if the callback's args is true or false, hide if it's true and show if it's false
        if (args === true) {
          // hide the slide subtitle text
          hide([subtitleCell]);
        } else {
          // show the slide subtitle text
          show([subtitleCell]);
        }
      }
    });
  };

  const preview = () => {
    sidebar.closeAll();
    deSelectAll();
    SlideContainer.classList.add("full-screen");
    previewControls.classList.remove("d-none");
    session.SHAPE_STATE = "PREVIEW";
    // Callbacks to hide slide's title and subtitle
    hideSlideTitle(true);
    hideSubtitle(true);
  };

  const endPreview = () => {
    SlideContainer.classList.remove("full-screen");
    SlideContainer.classList.remove("completed");
    previewControls.classList.add("d-none");
    session.SHAPE_STATE = null;
    status = null;
    // Callbacks to show slide's title and subtitle
    hideSlideTitle(false);
    hideSubtitle(false);
  };

    const next = () => {
        const currentSlideIndex = session.PRESENTATION.slidesOrder.indexOf(session.CURRENT_SLIDE);
        if (currentSlideIndex == (session.PRESENTATION.slidesOrder.length - 1)) {
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
                <span title="Previous Slide" className="preview-btn" onClick={prev}>
                    <i className="fas fa-caret-left fa-lg" style={{ pointerEvents: "none" }}></i>
                </span>
                <span title="End Presentation" className="preview-btn" onClick={endPreview}>
                    <i className="fas fa-stop" style={{ pointerEvents: "none" }}></i>
                </span>
                <span title="Next Slide" className="preview-btn" onClick={next}>
                    <i className="fas fa-caret-right fa-lg" style={{ pointerEvents: "none" }}></i>
                </span>
                <span title="Last Slide" className="d-none" onClick={lastSlide}>
                    <i className="fas fa-fast-forward"></i>
                </span>
            </div>
        </>
    )
}