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
import findKeyword from "Editor/js/utils/findKeyword";


export default function slide(slideId) {
    if (!(this instanceof slide)) return new slide(...arguments);

    this.slideData = presentation().getSlideData(slideId);
    this.object = function () {
        return select(`object.main-container[id="${this.slideData.slideId}"]`);
    }
    this.objectPrev = function () {
        return select(`.slide-thumbnail[data-slide-id="${this.slideData.slideId}"]`);
    }
    this.contentDocument = function () {
        return select(`object.main-container[id="${this.slideData.slideId}"]`).contentDocument;
    }
    this.documentElement = function () {
        return select(`object.main-container[id="${this.slideData.slideId}"]`).contentDocument.documentElement;
    }

    this.appendToPresentation = function (slideData) {
        session.PRESENTATION.slides.push(slideData);
        session.PRESENTATION.slidesOrder.push(slideData.slideId);
        return slide(slideData.slideId);
    }

    this.insertToPage = function () {
        let miniPrevHtml = `
        <div class="slide-thumbnail" data-slide-id="${this.slideData.slideId}">
            <object id="prev_${this.slideData.slideId}" type="image/svg+xml" data="${this.slideData.style.svgFile}" class="col-12 p-0 rounded"></object>
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
        <object id="${this.slideData.slideId}" data-slide-id="${this.slideData.slideId}" type="image/svg+xml" data="${this.slideData.style.svgFile}" class="col-12 p-0 rounded main-container" style="visibility:hidden"></object>
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
        this.slideData.shapes.forEach(shape_ => {
            if (shape_.data.alt) {
                let contentNumber, foreignObject, text, direction, g, content;
                // Built in textboxes
                if (shape_.data.alt.includes("h1|")) {
                    try {
                        contentNumber = shape_.data.alt.split("|")[1];
                        content = this.slideData.analyzedContent[contentNumber].h1.data;
                        shape_.data.text = text = content.text;
                        direction = content.direction;
                        Object.assign(shape_.data, content);
                    } catch {
                        shape(this.slideData.slideId, shape_.data.shape_id).remove();
                    }
                } else if (shape_.data.alt.includes("paragraph|")) {
                    try {
                        contentNumber = shape_.data.alt.split("|")[1];
                        content = this.slideData.analyzedContent[contentNumber].originalSentence.data;
                        shape_.data.text = text = content.text;
                        direction = content.direction;
                        Object.assign(shape_.data, content);
                        if (text == this.slideData.analyzedContent[contentNumber].h1.data.text)
                            // Rm paragraph if it is same as h1
                            throw new DOMException();
                    } catch {
                        shape(this.slideData.slideId, shape_.data.shape_id).remove();
                    }
                } else if (shape_.data.alt == "slidetitle") {
                    try {
                        content = this.slideData.slideTitle.data;
                        shape_.data.text = text = content.text;
                        direction = content.direction;
                        Object.assign(shape_.data, content);
                    } catch {
                        shape(this.slideData.slideId, shape_.data.shape_id).remove();
                    }
                } else if (shape_.data.alt == "subtitle") {
                    try {
                        content = this.slideData.subTitle.data;
                        shape_.data.text = text = content.text;
                        direction = content.direction;
                        Object.assign(shape_.data, content);
                    } catch {
                        shape(this.slideData.slideId, shape_.data.shape_id).remove();
                    }
                }
                if (text) {
                    // Append foreignObjects
                    g = shape(this.slideData.slideId, shape_.data.shape_id).el();
                    if (g) {
                        foreignObject = createForeignObject(this.contentDocument(), shape_.data);
                        arrangeForeignObject(foreignObject, shape_.data, text, direction);
                        g.innerHTML = "";
                        g.appendChild(foreignObject);
                    }
                }
                // Built in images
                let keyword;
                if (shape_.data.alt.includes("h1image|")) {
                    contentNumber = shape_.data.alt.split("|")[1];
                    keyword = this.slideData.analyzedContent[contentNumber].h1.data.text;
                    h1Image(this.slideData.slideId, shape_.data.shape_id, keyword);
                } else if (shape_.data.alt == "slidetitleimage") {
                    try {
                        keyword = this.slideData.slideTitle.data.keyword;
                        if (!keyword) throw new DOMException();
                        h1Image(this.slideData.slideId, shape_.data.shape_id, keyword);
                    } catch {
                        shape(this.slideData.slideId, shape_.data.shape_id).remove();
                    }
                }

            }
        });
        this.display();
        this.cloneToMiniPrev();
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

        return this;
    }

    this.cloneToMiniPrev = ()=>{
        let clone = this.contentDocument().querySelector("svg").cloneNode(true);
        clone.id = "";
        document.getElementById("prev_" + this.slideData.slideId).contentDocument.querySelector("svg").remove();
        document.getElementById("prev_" + this.slideData.slideId).contentDocument.appendChild(clone);
    }

}

