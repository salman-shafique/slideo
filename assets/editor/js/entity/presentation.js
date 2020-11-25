import session from "Editor/js/session";
import slide from "Editor/js/entity/slide";
import colorTemplate from "Editor/js/entity/colorTemplate";

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

        colorTemplate(presentationData.colorTemplateId).select();
        return this;
    }

    this.getSlideData = function (slideId) {

        let slideData;
        session.PRESENTATION.slides.forEach(slide_ => {
            if (slide_.slideId == slideId)
                slideData = slide_;
        });
        return slideData;
    }
}

