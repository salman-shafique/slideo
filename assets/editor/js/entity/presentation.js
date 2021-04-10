import session from "Editor/js/session";
import slide from "Editor/js/entity/slide";

export default function presentation() {
    if (!(this instanceof presentation)) return new presentation(...arguments);

    // Entry point
    this.init = function (presentationData) {
        session.PRESENTATION = presentationData;
        session.PRESENTATION.slides.forEach(slide_ => {
            slide(slide_.slideId).insertToPage();
        });
        if (document.getElementById("slides_preview").children[0])
            document.getElementById("slides_preview").children[0].click();

        if (!session.PRESENTATION.settings || session.PRESENTATION.settings == [])
            session.PRESENTATION.settings = {
                fontFamily: "",
                logo: {
                    url: "",
                    isActive: false
                }
            }

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

