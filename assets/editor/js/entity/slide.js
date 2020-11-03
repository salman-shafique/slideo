import session from "Editor/js/session";
import presentation from "Editor/js/entity/presentation";
import refresh_slide_prev_numbers from "Editor/js/slides/utils/refresh_slide_prev_numbers";
import html_to_element from "Editor/js/utils/html_to_element";
import add_event from "Editor/js/utils/add_event";
import select from "Editor/js/utils/selector/select";
import selectAll from "Editor/js/utils/selector/selectAll";
import createForeignObject from "Editor/js/shapes/textbox/createForeignObject";
import arrangeForeignObject from "Editor/js/shapes/textbox/arrangeForeignObject";
import h1Image from "Editor/js/shapes/image/h1Image";


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
        <img src="https://dummyimage.com/1200x800/b30909/000000&text=${this.slideData.slideId}">
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
        this.slideData.shapes.forEach(shape => {
            if (shape.data.alt) {
                let contentNumber, foreignObject, text, direction, g;

                // Built in textboxes
                if (shape.data.alt.includes("h1|")) {
                    contentNumber = shape.data.alt.split("|")[1];
                    try {
                        text = this.slideData.analyzedContent[contentNumber].h1.data.h1;
                        direction = this.slideData.analyzedContent[contentNumber].h1.data.direction;
                    } catch {
                        this.getShape(shape.data.shape_id).remove();
                    }
                } else if (shape.data.alt.includes("paragraph|")) {
                    try {
                        contentNumber = shape.data.alt.split("|")[1];
                        text = this.slideData.analyzedContent[contentNumber].originalSentence.data.originalSentence;
                        direction = this.slideData.analyzedContent[contentNumber].originalSentence.data.direction;
                    } catch {
                        this.getShape(shape.data.shape_id).remove();
                    }
                } else if (shape.data.alt.includes("slidetitle")) {
                    try {
                        text = this.slideData.slideTitle.data.slideTitle;
                        direction = this.slideData.slideTitle.data.direction;
                    } catch {
                        this.getShape(shape.data.shape_id).remove();
                    }
                } else if (shape.data.alt.includes("subtitle")) {
                    try {
                        text = this.slideData.subTitle.data.subTitle;
                        direction = this.slideData.slideTitle.data.direction;
                    } catch {
                        this.getShape(shape.data.shape_id).remove();
                    }
                }
                if (text) {
                    // Append foreignObjects
                    g = this.getShape(shape.data.shape_id);
                    if (g) {
                        foreignObject = createForeignObject(this.contentDocument(), shape.data);
                        arrangeForeignObject(foreignObject, shape.data, text, direction);
                        g.innerHTML = "";
                        g.appendChild(foreignObject);
                        console.log(foreignObject);
                    }
                }
                // Built in h1 image
                let keyword;
                if (shape.data.alt.includes("h1image|")) {
                    contentNumber = shape.data.alt.split("|")[1];
                    keyword = this.slideData.analyzedContent[contentNumber].h1.data.h1;
                    h1Image(this.slideData.slideId, shape.data.shape_id, keyword);
                }

            }
        });
        this.display();
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

    this.getShapeData = function (shapeId) {
        let shapeData;
        this.slideData.shapes.forEach(shape => {
            if (shape.data.shape_id == shapeId)
                shapeData = shape.data;
        });
        return shapeData;
    }
    this.getShape = function (shapeId) {
        return this.documentElement().querySelector("g[shape_id='" + shapeId + "']");
    }
}

