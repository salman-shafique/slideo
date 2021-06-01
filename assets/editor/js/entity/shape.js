import slide from "Editor/js/entity/slide";
import select from "Editor/js/utils/selector/select";
import add_event from "Editor/js/utils/add_event";
import autosizeForeignObject from "Editor/js/shapes/textbox/autosizeForeignObject";
import { relocateResizeCircleContainer } from "Editor/js/shapes/actions/resize/utils/copyTransform";
import iconInit from "Editor/js/shapes/icon/iconInit";
import findKeyword from "../utils/findKeyword";
import h1Image from "Editor/js/shapes/image/h1Image";
import constants from "Editor/js/constants";
import session from "Editor/js/session";
import getTransform from "Editor/js/shapes/actions/drag/utils/getTransform";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import { validColorAttributes } from "Editor/js/sidebar/colors/utils";
import getClipPath from "Editor/js/shapes/actions/resize/utils/getClipPath";
import Events from "../Events";

/**
 * 
 * @param {SVGGElement|String} slideId 
 * @param {String} shapeId 
 */
export default function shape(slideId, shapeId) {

   

    if (!(this instanceof shape)) return new shape(...arguments);

    if (slideId.tagName == "g") {
        this.slideId = session.CURRENT_SLIDE;
        this.shapeId = slideId.getAttribute("shape_id");
    } else {
        this.slideId = slideId;
        this.shapeId = shapeId;
    }


    /**
     * @returns {object} shapeData
     */
    this.data = () => {
        let shapeData = {};
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

    this.remove = () => {
        if (this.el()) {
            this.el().classList.add("d-none");
            this.data().active = "false";
        }
    }
    this.restore = () => {
        if (this.el()) {
            this.el().classList.remove("d-none");
            this.data().active = "true";
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
        if (content.text.trim() != newText.trim()) {
            this.data().text = content.text = newText;

            const iconG = slide_.page().querySelector("g[alt$='icon|" + contentNumber + "']");
            
             // page has an icon, update it
             const iconShapeId = iconG.getAttribute("shape_id");
             const iconShape = shape(this.slideId, iconShapeId);

            if (iconG && !iconShape.data().isIconChanged) {
                // page has an icon, update it
                iconShape.data().icon = null;

                findKeyword(newText, (slideId, shapeId, keyword) => {
                    iconInit(slideId, shapeId, keyword);
                    Events.popup.keyword.updated({ data: { keyword, slideId } });
                }, [this.slideId, iconShapeId]);
            }

            const h1ImageG = slide_.page().querySelector("g[alt='h1image|" + contentNumber + "']");
            const imageShapeId = h1ImageG.getAttribute("shape_id");
            const imageShape = shape(this.slideId, imageShapeId);
            
            if (h1ImageG && !imageShape.data().isImageChanged) {
                // page has an h1 image update it 
                imageShape.data().image = null;
                findKeyword(newText, (slideId, shapeId, keyword) => {
                    h1Image(slideId, shapeId, keyword);
                    Events.popup.keyword.updated({ data: { keyword, slideId } });
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
        if (content.text.trim() != newText.trim()) {
            this.data().text = content.text = newText;
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
        if (newText.trim() == constants.SLIDE_TITLE_PLACEHOLDER.trim()) return;

        this.data().text = content.text = newText;
        const slideTitleImageG = slide_.page().querySelector("g[alt='slidetitleimage']");
        if (slideTitleImageG) {
            // page has the slidetitleimage
            const slideTitleImageShapeId = slideTitleImageG.getAttribute("shape_id");
            const slideTitleImageShape = shape(this.slideId, slideTitleImageShapeId);
            slideTitleImageShape.data().image = null;

            findKeyword(newText, (slideId, shapeId, keyword) => {
                h1Image(slideId, shapeId, keyword);
                Events.popup.keyword.updated({ data: { keyword, slideId } });
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
        if (newText.trim() == constants.SLIDE_SUBTITLE_PLACEHOLDER.trim()) return;

        this.data().text = content.text = newText;
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
        if (!content) return;
        if (!content.text) return;

        if (content.text.trim() != newText.trim()) {
            this.data().text = content.text = newText;
            autosizeForeignObject(this.el().querySelector("foreignObject"));
            relocateResizeCircleContainer(this.el());
        }
    }

    this.saveTransforms = (SVG_WIDTH, SVG_HEIGHT) => {
        const data = this.data();
        if (data.active == "false") return;
        data.allTransforms = getTransform(this.el());
        if (!data.allTransforms) return;

        if (data.allTransforms.translate)
            delete data.allTransforms.translate.transform;
        if (data.allTransforms.scale)
            delete data.allTransforms.scale.transform;
        if (data.allTransforms.rotate)
            delete data.allTransforms.rotate.transform;

        data.allTransforms.SVG_WIDTH = SVG_WIDTH;
        data.allTransforms.SVG_HEIGHT = SVG_HEIGHT;

    }

    this.moveToSavedPosition = () => {
        const data = this.data();
        if (!data) return;

        const savedAllTransforms = data.allTransforms;
        if (!savedAllTransforms) return;

        const g = this.el();
        const allTransforms = getTransform(g);

        try {
            allTransforms.scale.transform.setScale(
                parseFloat(savedAllTransforms.scale.startingA),
                parseFloat(savedAllTransforms.scale.startingA)
            )
        } catch (error) { }


        try {
            allTransforms.translate.transform.setTranslate(
                parseFloat(savedAllTransforms.translate.startingE),
                parseFloat(savedAllTransforms.translate.startingF)
            )
        } catch (error) { }

        try {
            // Cropped image
            if (getShapeType(g) == constants.SHAPE_TYPES.IMAGE) {
                if (!savedAllTransforms.crop)
                    savedAllTransforms.crop = getClipPath();
                g.querySelector("image").style.clipPath = `polygon(
                ${savedAllTransforms.crop.lt.startingX}% ${savedAllTransforms.crop.lt.startingY}%, 
                ${savedAllTransforms.crop.rt.startingX}% ${savedAllTransforms.crop.rt.startingY}%, 
                ${savedAllTransforms.crop.rb.startingX}% ${savedAllTransforms.crop.rb.startingY}%, 
                ${savedAllTransforms.crop.lb.startingX}% ${savedAllTransforms.crop.lb.startingY}%
            )`;
            }
        } catch (error) { }
    }

    /**
     * Update the SVGGElement attributes according to saved data
     */
    this.updateAttrs = () => {
        const g = this.el();
        const data = this.data();
        // For now we only need to update color attributes
        validColorAttributes.forEach(colorAttributeName => {
            if (data[colorAttributeName])
                g.setAttribute(colorAttributeName, data[colorAttributeName]);
        });
    }
}

