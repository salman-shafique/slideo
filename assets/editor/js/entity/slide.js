import session from "Editor/js/session";
import Events from "Editor/js/Events";
import presentation from "Editor/js/entity/presentation";
import shape from "Editor/js/entity/shape";
import refresh_slide_prev_numbers from "Editor/js/slides/utils/refresh_slide_prev_numbers";
import stringToDOM from "Editor/js/utils/stringToDOM";
import add_event from "Editor/js/utils/add_event";
import select from "Editor/js/utils/selector/select";
import selectAll from "Editor/js/utils/selector/selectAll";
import createForeignObject from "Editor/js/shapes/textbox/createForeignObject";
import arrangeForeignObject from "Editor/js/shapes/textbox/arrangeForeignObject";
import autosizeForeignObject from "Editor/js/shapes/textbox/autosizeForeignObject";
import h1Image from "Editor/js/shapes/image/h1Image";
import colorTemplate from "Editor/js/entity/colorTemplate";
import initializeG from "Editor/js/shapes/actions/drag/utils/initializeG";
import makeDraggable from "Editor/js/shapes/actions/drag/makeDraggable";
import iconInit from "Editor/js/shapes/icon/iconInit";
import selectImageElement from "Editor/js/shapes/image/selectImageElement";
import selectIconElement from "Editor/js/shapes/icon/selectIconElement";
import colorFilters from "Editor/js/shapes/actions/color/colorFilters";
import deSelectAll from "Editor/js/shapes/actions/drag/utils/deSelectAll";
import reactToDOM from "Editor/js/utils/reactToDOM";
import React from "react";
import keyboardListener from "Editor/js/shapes/actions/keyboard/index";
import selectTextboxElement from "Editor/js/shapes/textbox/selectTextboxElement";

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

    /**
     * @returns {HTMLElement} Page G element
     */
    this.page = function () {
        return this.documentElement().querySelector("g.SlideGroup g.Page");
    }

    /**
     * @returns {HTMLElement} Slide G element
     */
    this.slideG = function () {
        return this.documentElement().querySelector("g.SlideGroup g.Slide");
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
        let miniPrev = stringToDOM(miniPrevHtml);

        add_event(miniPrev, "click", function () {
            slide(this.dataset.slideId).display();
        });

        add_event(select("object", miniPrev), "load", function () {
            let slideId = this.getAttribute("id").split("_")[1];
            slide(slideId).cloneToMiniPrev();
        });

        document.getElementById("slides_preview").appendChild(miniPrev);


        let mainHtml = `
        <object id="${this.slideId}" data-slide-id="${this.slideId}" type="image/svg+xml" data="${slideData.style.svgFile}" class="col-12 p-0 rounded main-container" style="visibility:hidden"></object>
        `;
        let main = stringToDOM(mainHtml);

        // Init the slide - move etc
        add_event(main, "load", function () {
            slide(this.dataset.slideId).initSlide();
        });
        document.getElementById("SlideContainer").appendChild(main);

        return this;
    }

    this.initSlide = function () {
        console.log(session);

        this.object().style.visibility = "visible";

        // Custom styles
        this.insertCustomStyles();

        // Create g for the filters
        const contentDocument = this.contentDocument();
        const filterContainer = contentDocument.createElementNS("http://www.w3.org/2000/svg", "g");
        filterContainer.setAttribute("id", "filterContainer");
        contentDocument.querySelector("g.SlideGroup g.Page").appendChild(filterContainer);

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
                    if (!content.text) throw new DOMException();
                    shape_.data.text = text = content.text;
                    direction = content.direction;
                    Object.assign(shape_.data, content);
                } catch {
                    shape(this.slideId, shape_.data.shape_id).remove();
                }
            } else if (shape_.data.alt == "subtitle") {
                try {
                    content = slideData.subTitle.data;
                    if (!content.text) throw new DOMException();
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
                    // Add event listener
                    shape(this.slideId, shape_.data.shape_id).addEvent("dblclick", selectTextboxElement);
                }
            }

            // Built in images icon - h1 - slidetitle
            if (shape_.data.alt.includes("icon|")) {
                contentNumber = shape_.data.alt.split("|").pop();
                content = slideData.analyzedContent[contentNumber].icon.data;
                Object.assign(shape_.data, content);
                iconInit(this.slideId, shape_.data.shape_id, content.keyword);
                // Add event listener
                shape(this.slideId, shape_.data.shape_id).addEvent("click", selectIconElement);
            } else if (shape_.data.alt.includes("h1image|")) {
                contentNumber = shape_.data.alt.split("|")[1];
                content = slideData.analyzedContent[contentNumber].h1Image.data;
                Object.assign(shape_.data, content);
                h1Image(this.slideId, shape_.data.shape_id, content.keyword);
                // Add event listener
                shape(this.slideId, shape_.data.shape_id).addEvent("click", selectImageElement);

            } else if (shape_.data.alt == "slidetitleimage") {
                try {
                    content = slideData.slideTitleImage.data;
                    if (!content.keyword) throw new DOMException();
                    Object.assign(shape_.data, content);
                    h1Image(this.slideId, shape_.data.shape_id, content.keyword);
                    // Add event listener
                    shape(this.slideId, shape_.data.shape_id).addEvent("click", selectImageElement);
                } catch {
                    shape(this.slideId, shape_.data.shape_id).remove();
                }
            }

            g = shape(this.slideId, shape_.data.shape_id).el();
            if (g) {
                // initialize the transform and move
                initializeG(g);
                // initialize the filters
                colorFilters(g).init();
            }

        });

        this.display();

        // Add event listeners
        makeDraggable(this.contentDocument());
        keyboardListener(this.contentDocument());

        // Color template
        colorTemplate(this.slideId).changeColors();

        // Autosize the foreignObjects
        selectAll("g[alt]>foreignObject.bounding_box", this.page()).forEach(foreignObject => {
            autosizeForeignObject(foreignObject);
        });

        // Slide numbers
        refresh_slide_prev_numbers();

        // Update the mini prevs
        this.cloneToMiniPrev();

        return this;
    }

    this.display = function () {
        // Deselect elements
        deSelectAll();

        selectAll(".slide-thumbnail").forEach(e => {
            e.classList.remove("active-slide");
        });
        this.objectPrev().classList.add("active-slide");

        selectAll("object.main-container").forEach(e => {
            e.style.display = "none";
        });
        this.object().style.display = "";

        // Update the session CURRENT_SLIDE
        session.CURRENT_SLIDE = this.slideId;

        // Update the color circles
        colorTemplate(this.slideId).updateColorCirles();

        // Dispatch the selection event
        Events.slide.display({ slideId: this.slideId });

        return this;
    }

    this.cloneToMiniPrev = () => {
        let contentDocument = window.top.document.getElementById("prev_" + this.slideId).contentDocument;
        if (contentDocument.querySelector("svg")) {
            let clone = this.contentDocument().querySelector("g.SlideGroup g.Page").cloneNode(true);
            contentDocument.querySelector("g.SlideGroup g.Page").remove();
            contentDocument.querySelector("g.SlideGroup g.Slide").appendChild(clone);
        }
    }

    this.chunkDesigns = {}

    this.changeDesign = (designData) => {
        if (!this.chunkDesigns[String(designData.id)])
            this.chunkDesigns[String(designData.id)] = designData;

        const slideData = this.slideData();
        slideData.style = this.chunkDesigns[String(designData.id)];
        slideData.shapes = this.chunkDesigns[String(designData.id)].shapes;
        slideData.colorTemplate = this.chunkDesigns[String(designData.id)].colorTemplate;

        this.updateOnPage();
    }

    this.updateOnPage = () => {
        let slideData = this.slideData();
        let miniPrev = select('div.slide-thumbnail[data-slide-id="' + this.slideId + '"]');
        let miniPrevObject = select("object", miniPrev);
        miniPrevObject.setAttribute("data", slideData.style.svgFile);
        // load event will be triggered
        let main = select("object[id='" + this.slideId + "']");
        main.setAttribute("data", slideData.style.svgFile);
        // load event will be triggered
        return this;
    }


    this.insertCustomStyles = () => {
        const styles = reactToDOM(<style>{`
        g.SlideGroup g.Page{
            fill: transparent
        }
        .draggable:hover {
            cursor: pointer;
            outline: solid cyan 20px;
        }
        .draggable *:not(.bounding_box){
            pointer-events:none;
        }
        .text_editing *{
            pointer-events:all !important;
        }
        foreignObject { overflow: visible; }
        foreignObject table {
            position: fixed;
            word-break: break-word;
        }

        /* Resize elements */
        circle[direction="lt"] {
            cursor: nwse-resize;
        }
        circle[direction="t"] {
            cursor: ns-resize;
        }
        circle[direction="rt"] {
            cursor: nesw-resize;
        }
        circle[direction="r"] {
            cursor: ew-resize;
        }
        circle[direction="rb"] {
            cursor: nwse-resize;
        }
        circle[direction="b"] {
            cursor: ns-resize;
        }
        circle[direction="lb"] {
            cursor: nesw-resize;
        }
        circle[direction="l"] {
            cursor: ew-resize;
        }
        .dragging *{
            cursor: grabbing !important;
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
        }
        .dragging *::selection {
            background: none !important;
        }
        `}</style>,
            null,
            "http://www.w3.org/2000/svg"
        );

        this.contentDocument().querySelector("svg").appendChild(styles);

    }
}

