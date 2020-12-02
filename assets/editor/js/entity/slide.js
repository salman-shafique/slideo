import session from "Editor/js/session";
import presentation from "Editor/js/entity/presentation";
import shape from "Editor/js/entity/shape";
import refresh_slide_prev_numbers from "Editor/js/slides/utils/refresh_slide_prev_numbers";
import html_to_element from "Editor/js/utils/html_to_element";
import add_event from "Editor/js/utils/add_event";
import select from "Editor/js/utils/selector/select";
import selectAll from "Editor/js/utils/selector/selectAll";
import createForeignObject from "Editor/js/shapes/textbox/createForeignObject";
import arrangeForeignObject from "Editor/js/shapes/textbox/arrangeForeignObject";
import h1Image from "Editor/js/shapes/image/h1Image";
import colorTemplate from "Editor/js/entity/colorTemplate";
import initializeG from "Editor/js/shapes/actions/drag/utils/initializeG";
import makeDraggable from "Editor/js/shapes/actions/makeDraggable";
import iconInit from "Editor/js/shapes/icon/iconInit";
import showDesignsByCapacity from "Editor/js/sidebar/designs/showDesignsByCapacity";
import selectImageElement from "Editor/js/shapes/image/selectImageElement";
import selectIconElement from "Editor/js/shapes/icon/selectIconElement";


export default function slide(slideId) {
    if (!(this instanceof slide)) return new slide(...arguments);

    this.slideId = slideId;
    this.slideData = () => presentation().getSlideData(slideId);

    this.object = function () {
        return select(`object.main-container[id="${this.slideId}"]`);
    }

    /**
     * @returns {HTMLElement}
     */
    this.objectPrev = function () {
        return select(`.slide-thumbnail[data-slide-id="${this.slideId}"]`);
    }

    /**
     * @returns {HTMLObjectElement}
     */
    this.objectElement = function () {
        return select(`object.main-container[id="${this.slideId}"]`);
    }

    /**
     * @returns {Document}
     */
    this.contentDocument = function () {
        return select(`object.main-container[id="${this.slideId}"]`).contentDocument;
    }

    /**
     * @returns {HTMLElement}
     */
    this.documentElement = function () {
        return select(`object.main-container[id="${this.slideId}"]`).contentDocument.documentElement;
    }

    this.appendToPresentation = function (slideData) {
        session.PRESENTATION.slides.push(slideData);
        session.PRESENTATION.slidesOrder.push(slideData.slideId);
        return slide(slideData.slideId);
    }

    this.insertToPage = function () {
        let slideData = this.slideData();
        let miniPrevHtml = `
        <div class="slide-thumbnail" data-slide-id="${this.slideId}">
            <object id="prev_${this.slideId}" type="image/svg+xml" data="${slideData.style.svgFile}" class="col-12 p-0 rounded"></object>
            <div class="remove-slide">
                <i class="fas fa-trash-alt text-white"></i>
            </div>
            <span class="slide-sl text-white mr-2"></span>
        </div>
        `;
        let miniPrev = html_to_element(miniPrevHtml);

        add_event(miniPrev, "click", function () {
            slide(this.dataset.slideId).display();
        });

        document.getElementById("slides_preview").appendChild(miniPrev);

        let mainHtml = `
        <object id="${this.slideId}" data-slide-id="${this.slideId}" type="image/svg+xml" data="${slideData.style.svgFile}" class="col-12 p-0 rounded main-container" style="visibility:hidden"></object>
        `;
        let main = html_to_element(mainHtml);

        // Init the slide - move etc
        add_event(main, "load", function () {
            slide(this.dataset.slideId).initSlide();
        });
        document.getElementById("SlideContainer").appendChild(main);

        refresh_slide_prev_numbers();
        return this;
    }

    this.initSlide = function () {
        console.log(session);

        this.object().style.visibility = "visible";

        // update textbox style.direction
        // Show the loaded slide
        let slideData = this.slideData();
        slideData.shapes.forEach(shape_ => {
            if (shape_.data.active == false) {
                shape(this.slideId, shape_.data.shape_id).remove();
                return;
            };

            let contentNumber, foreignObject, text, direction, g, content;
            // Built in textboxes
            if (shape_.data.alt.includes("h1|")) {
                try {
                    contentNumber = shape_.data.alt.split("|")[1];
                    content = slideData.analyzedContent[contentNumber].h1.data;
                    shape_.data.text = text = content.text;
                    direction = content.direction;
                    Object.assign(shape_.data, content);
                } catch {
                    shape(this.slideId, shape_.data.shape_id).remove();
                }
            } else if (shape_.data.alt.includes("paragraph|")) {
                try {
                    contentNumber = shape_.data.alt.split("|")[1];
                    content = slideData.analyzedContent[contentNumber].originalSentence.data;
                    shape_.data.text = text = content.text;
                    direction = content.direction;
                    Object.assign(shape_.data, content);
                    if (text == slideData.analyzedContent[contentNumber].h1.data.text)
                        // Rm paragraph if it is same as h1
                        throw new DOMException();
                } catch {
                    shape(this.slideId, shape_.data.shape_id).remove();
                }
            } else if (shape_.data.alt == "slidetitle") {
                try {
                    content = slideData.slideTitle.data;
                    shape_.data.text = text = content.text;
                    direction = content.direction;
                    Object.assign(shape_.data, content);
                } catch {
                    shape(this.slideId, shape_.data.shape_id).remove();
                }
            } else if (shape_.data.alt == "subtitle") {
                try {
                    content = slideData.subTitle.data;
                    shape_.data.text = text = content.text;
                    direction = content.direction;
                    Object.assign(shape_.data, content);
                } catch {
                    shape(this.slideId, shape_.data.shape_id).remove();
                }
            }
            if (text) {
                // Append foreignObjects
                g = shape(this.slideId, shape_.data.shape_id).el();
                if (g) {
                    foreignObject = createForeignObject(this.contentDocument(), shape_.data);
                    arrangeForeignObject(foreignObject, shape_.data, text, direction);
                    g.innerHTML = "";
                    g.appendChild(foreignObject);
                }
            }

            // Built in images icon - h1 - slidetitle
            if (shape_.data.alt.includes("icon|")) {
                contentNumber = shape_.data.alt.split("|").pop();
                content = slideData.analyzedContent[contentNumber].icon.data;
                Object.assign(shape_.data, content);
                iconInit(this.slideId, shape_.data.shape_id,content.keyword );
                // Add event listener
                shape(this.slideId, shape_.data.shape_id).addEvent("click", selectIconElement);
            } else if (shape_.data.alt.includes("h1image|")) {
                contentNumber = shape_.data.alt.split("|")[1];
                content = slideData.analyzedContent[contentNumber].h1.data;
                Object.assign(shape_.data, content);
                h1Image(this.slideId, shape_.data.shape_id, content.text);
                // Add event listener
                shape(this.slideId, shape_.data.shape_id).addEvent("click", selectImageElement);

            } else if (shape_.data.alt == "slidetitleimage") {
                try {
                    content = slideData.slideTitle.data;
                    if (!content.keyword) throw new DOMException();
                    Object.assign(shape_.data, content);
                    h1Image(this.slideId, shape_.data.shape_id, content.keyword);
                } catch {
                    shape(this.slideId, shape_.data.shape_id).remove();
                }
            }

            // initialize the transform and move
            initializeG(shape(this.slideId, shape_.data.shape_id).el());

        });

        this.display();
        this.cloneToMiniPrev();
        // Add event listeners
        makeDraggable(this.contentDocument());

        colorTemplate(session.PRESENTATION.colorTemplateId).updateSlideColors(this.slideId);
        return this;
    }

    this.display = function () {
        selectAll(".slide-thumbnail").forEach(e => {
            e.classList.remove("active-slide");
        });
        this.objectPrev().classList.add("active-slide");

        selectAll("object.main-container").forEach(e => {
            e.style.display = "none";
        });
        this.object().style.display = "";

        showDesignsByCapacity(this.slideData().sentences.length);
        // Update the session CURRENT_SLIDE
        session.CURRENT_SLIDE = this.slideId;
        return this;
    }

    this.cloneToMiniPrev = () => {

        if (document.getElementById("prev_" + slideId).contentDocument.querySelector("svg")) {
            let clone = this.contentDocument().querySelector("g.SlideGroup g.Page").cloneNode(true);
            window.top.document.getElementById("prev_" + slideId).contentDocument.querySelector("g.SlideGroup g.Page").remove();
            window.top.document.getElementById("prev_" + slideId).contentDocument.querySelector("g.SlideGroup g.Slide").appendChild(clone);
        } else {
            add_event(document.getElementById("prev_" + this.slideId), "load", function () {
                let slideId = this.getAttirbute("id").split("_")[1];
                let clone = window.top.document.getElementById(slideId).contentDocument.querySelector("g.SlideGroup g.Page").cloneNode(true);
                window.top.document.getElementById("prev_" + slideId).contentDocument.querySelector("g.SlideGroup g.Page").remove();
                window.top.document.getElementById("prev_" + slideId).contentDocument.querySelector("g.SlideGroup g.Slide").appendChild(clone);
            })
        }
    }

}

