import slide from "Editor/js/entity/slide";
import select from "Editor/js/utils/selector/select";
import add_event from "Editor/js/utils/add_event";
import autosizeForeignObject from "Editor/js/shapes/textbox/autosizeForeignObject";
import { relocateResizeCircleContainer } from "Editor/js/shapes/actions/resize/utils/copyTransform";

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
        const selectable = select(".bounding_box", this.el());
        add_event(selectable, event, callback);
    }

    this.setIcon = (icon) => {
        // Update the analyzed content
        const alt = this.data().alt;
        if (alt.includes("icon|")) {
            const contentNumber = this.data().alt.split("|").pop();
            const content = slide(this.slideId).slideData().analyzedContent[contentNumber].icon.data;
            content.icon = icon;
        }
    }
    this.setImage = (image) => {
        // Update the analyzed content
        const alt = this.data().alt;
        if (alt == "slidetitleimage") {
            const content = slide(this.slideId).slideData().slideTitleImage.data;
            content.image = image;
        } else if (alt.includes("h1image|")) {
            const contentNumber = alt.split("|").pop();
            const content = slide(this.slideId).slideData().analyzedContent[contentNumber].h1Image.data;
            content.image = image;
        }
    }
    /**
     * 
     * @param {String} newText 
     */
    this.setH1 = (newText) => {
        // Update the analyzed content
        const contentNumber = this.data().alt.split("|").pop();
        const content = slide(this.slideId).slideData().analyzedContent[contentNumber].h1.data;
        if (content.text != newText) {
            content.text = newText;
            autosizeForeignObject(this.el().querySelector("foreignObject"));
            relocateResizeCircleContainer(this.el());
        }
    }
    /**
     * 
     * @param {String} newText 
     */
    this.setOriginalSentence = (newText) => {
        // Update the analyzed content
        const contentNumber = this.data().alt.split("|").pop();
        const content = slide(this.slideId).slideData().analyzedContent[contentNumber].originalSentence.data;
        if (content.text != newText) {
            content.text = newText;
            autosizeForeignObject(this.el().querySelector("foreignObject"));
            relocateResizeCircleContainer(this.el());
        }
    }
    /**
     * 
     * @param {String} newText 
     */
    this.setSlideTitle = (newText) => {
        // Update the slide title
        const content = slide(this.slideId).slideData().slideTitle.data;
        if (content.text != newText) {
            content.text = newText;
            autosizeForeignObject(this.el().querySelector("foreignObject"));
            relocateResizeCircleContainer(this.el());
        }
    }
    /**
     * 
     * @param {String} newText 
     */
    this.setSubTitle = (newText) => {
        // Update the slide title
        const content = slide(this.slideId).slideData().subTitle.data;
        if (content.text != newText) {
            content.text = newText;
            autosizeForeignObject(this.el().querySelector("foreignObject"));
            relocateResizeCircleContainer(this.el());
        }
    }
    /**
     * 
     * @param {String} newText 
     */
    this.setText = (newText) => {
        // Update the custom textbox
        const content = this.data();
        if (content.text != newText) {
            content.text = newText;
            autosizeForeignObject(this.el().querySelector("foreignObject"));
            relocateResizeCircleContainer(this.el());
        }
    }
}

