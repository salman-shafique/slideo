import session from "Editor/js/session";
import slide from "Editor/js/entity/slide";

export default function presentation() {
    if (!(this instanceof presentation)) return new presentation(...arguments);

    // Entry point
    this.init = function (presentationData) {
        session.PRESENTATION = presentationData;

        session.PRESENTATION.slidesOrder.forEach((slideId) => {
            slide(slideId).insertToPage();
        });

        document.querySelector("#slides_preview .slide-thumbnail[is-active='true']")?.click()

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
}

