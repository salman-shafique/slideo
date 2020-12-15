import slide from "Editor/js/entity/slide";
import select from "Editor/js/utils/selector/select";
import add_event from "Editor/js/utils/add_event";

export default function shape(slideId, shapeId) {
    if (!(this instanceof shape)) return new shape(...arguments);

    this.slideId = slideId;
    this.shapeId = shapeId;

    /**
     * @returns {object} shapeData
     */
    this.data = () => {
        let shapeData;
        slide(this.slideId).slideData().shapes.forEach(shape => {
            if (shape.data.shape_id == this.shapeId)
                shapeData = shape.data;
        });
        return shapeData;
    }

    /**
     * @returns {SVGGElement}
     */
    this.el = () => slide(this.slideId).documentElement().querySelector("g[shape_id='" + this.shapeId + "']");

    this.remove = function () {
        if (this.el()) {
            this.el().remove();
            this.data().active = false;
        }
    }

    /**
     * 
     * @param {Event} event 
     * @param {Function} callback 
     */
    this.addEvent = (event, callback) => {
        let selectable = select(".bounding_box", this.el());
        add_event(selectable, event, callback);
    }

    this.setIcon = (icon) => {
        // Update the analyzed content
        const contentNumber = this.data().alt.split("|").pop();
        const content = slide(this.slideId).slideData().analyzedContent[contentNumber].icon.data;
        content.icon = icon;
    }
    this.setImage = (image) => {
        // Update the analyzed content
        const contentNumber = this.data().alt.split("|").pop();
        const content = slide(this.slideId).slideData().analyzedContent[contentNumber].h1Image.data;
        content.image = image;
    }
    this.setH1 = (h1) => {
        // Update the analyzed content
        const contentNumber = this.data().alt.split("|").pop();
        const content = slide(this.slideId).slideData().analyzedContent[contentNumber].h1.data;
        content.text = h1;
    }
    this.setOriginalSentence = (originalSentence) => {
        // Update the analyzed content
        const contentNumber = this.data().alt.split("|").pop();
        const content = slide(this.slideId).slideData().analyzedContent[contentNumber].originalSentence.data;
        content.text = originalSentence;
    }
}

