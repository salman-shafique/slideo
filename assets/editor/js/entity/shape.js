import slide from "Editor/js/entity/slide";
import select from "Editor/js/utils/selector/select";
import add_event from "Editor/js/utils/add_event";
import autosizeForeignObject from "Editor/js/shapes/textbox/autosizeForeignObject";
import { relocateResizeCircleContainer } from "Editor/js/shapes/actions/resize/utils/copyTransform";
import iconInit from "Editor/js/shapes/icon/iconInit";
import findKeyword from "../utils/findKeyword";
import h1Image from "Editor/js/shapes/image/h1Image";
import constants from "Editor/js/constants";


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
        const slide_ = slide(this.slideId);
        const content = slide_.slideData().analyzedContent[contentNumber].h1.data;
        if (content.text != newText) {
            content.text = newText;

            const iconG = slide_.page().querySelector("g[alt$='icon|" + contentNumber + "']");
            if (iconG) {
                // page has an icon, update it
                const iconShapeId = iconG.getAttribute("shape_id");
                const iconShape = shape(this.slideId, iconShapeId);
                iconShape.data().icon = null;

                findKeyword(newText, (slideId, shapeId, keyword) => {
                    iconInit(slideId, shapeId, keyword);
                }, [this.slideId, iconShapeId]);
            }

            const h1ImageG = slide_.page().querySelector("g[alt='h1image|" + contentNumber + "']");
            if (h1ImageG) {
                // page has an h1 image update it
                const imageShapeId = h1ImageG.getAttribute("shape_id");
                const imageShape = shape(this.slideId, imageShapeId);
                imageShape.data().image = null;

                findKeyword(newText, (slideId, shapeId, keyword) => {
                    h1Image(slideId, shapeId, keyword);
                }, [this.slideId, imageShapeId]);
            }

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
        const slide_ = slide(this.slideId);
        const content = slide_.slideData().slideTitle.data;

        if (content.text == newText) return;
        if (newText.trim().toLowerCase() == constants.SLIDE_TITLE_PLACEHOLDER.trim().toLowerCase()) return;

        content.text = newText;
        const slideTitleImageG = slide_.page().querySelector("g[alt='slidetitleimage']");
        if (slideTitleImageG) {
            // page has the slidetitleimage
            const slideTitleImageShapeId = slideTitleImageG.getAttribute("shape_id");
            const slideTitleImageShape = shape(this.slideId, slideTitleImageShapeId);
            slideTitleImageShape.data().image = null;

            findKeyword(newText, (slideId, shapeId, keyword) => {
                h1Image(slideId, shapeId, keyword);
            }, [this.slideId, slideTitleImageShapeId]);
        }
        autosizeForeignObject(this.el().querySelector("foreignObject"));
        relocateResizeCircleContainer(this.el());

    }
    /**
     * 
     * @param {String} newText 
     */
    this.setSubTitle = (newText) => {
        // Update the slide title
        const content = slide(this.slideId).slideData().subTitle.data;
        if (content.text == newText) return;
        if (newText.trim().toLowerCase() == constants.SLIDE_SUBTITLE_PLACEHOLDER.trim().toLowerCase()) return;

        content.text = newText;
        autosizeForeignObject(this.el().querySelector("foreignObject"));
        relocateResizeCircleContainer(this.el());

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

