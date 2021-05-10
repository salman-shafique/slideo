import session from "Editor/js/session";
import slide from "Editor/js/entity/slide";
import create_slide_modal from "Editor/js/entry/create_slide_modal";


export default function presentation() {
    if (!(this instanceof presentation)) return new presentation(...arguments);

    // Entry point
    this.init = function (presentationData) {
        session.PRESENTATION = presentationData;

        session.PRESENTATION.slidesOrder.forEach((slideId) => {
            slide(slideId).insertToPage();
        });

        document.querySelector("#slides_preview .slide-thumbnail").click()

        return this;
    }

    /**
     * @param {string} slideId
     * @returns {object} slideData
     */
    this.getSlideData = function (slideId) {

        let slideData;
        session.PRESENTATION.slides.forEach(slide_ => {
            if (slide_.slideId == slideId)
                slideData = slide_;
        });
        return slideData;
    }

    /**
     * 
     * @param {String} slideId 
     */
    this.nextOf = (slideId) => {
        const index = session.PRESENTATION.slidesOrder.indexOf(slideId);
        for (let i = index; i < session.PRESENTATION.slidesOrder.length; i++) {
            // Show next
            const slide_ = slide(session.PRESENTATION.slidesOrder[i]);
            if (slide_.slideData().isActive) {
                slide_.display();
                return;
            }
        }
        for (let i = index - 1; i >= 0; i--) {
            // Show prev
            const slide_ = slide(session.PRESENTATION.slidesOrder[i]);
            if (slide_.slideData().isActive) {
                slide_.display();
                return;
            }
        }
        create_slide_modal.open();
    }
}

