import session from "Editor/js/session";
import constants from "Editor/js/constants";
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
import h1Image from "Editor/js/shapes/image/h1Image";
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
import selectTextboxElement, {
  openTextboxElement,
} from "Editor/js/shapes/textbox/selectTextboxElement";
import createNewTextbox from "Editor/js/shapes/textbox/createNewTextbox";
import createNewImage from "Editor/js/shapes/image/createNewImage";
import createNewIcon from "Editor/js/shapes/icon/createNewIcon";
import updateColor from "Editor/js/shapes/actions/color/updateColor";
import preloader from "Editor/js/components/preloader";
import reduceFontSize from "Editor/js/shapes/textbox/reduceFontSize";
import { addLogo } from "../sidebar/branding/utils";
import { renderDOMPopup } from "Editor/js/popups";
import apiService from "../utils/apiService";
import { saveSlidesOrder } from "Editor/js/slides/saveSlidesOrder.js";
import getMousePosition from "../shapes/actions/drag/utils/getMousePosition";

const chunkDesigns = {};

export default function slide(slideId) {
  if (!(this instanceof slide)) return new slide(...arguments);

  this.slideId = slideId;
  this.slideData = () => presentation().getSlideData(slideId);

  this.object = function () {
    return select(`object.main-container[id="${this.slideId}"]`);
  };

  /**
   * @returns {HTMLElement}
   */
  this.objectPrev = function () {
    return select(`.slide-thumbnail[data-slide-id="${this.slideId}"]`);
  };

  /**
   * @returns {HTMLObjectElement}
   */
  this.objectElement = function () {
    return select(`object.main-container[id="${this.slideId}"]`);
  };

  /**
   * @returns {Document}
   */
  this.contentDocument = function () {
    return select(`object.main-container[id="${this.slideId}"]`)
      .contentDocument;
  };

  this.prevDocument = function () {
    return window.top.document.getElementById("prev_" + this.slideId)
      ?.contentDocument;
  };
  /**
   * @returns {HTMLElement}
   */
  this.documentElement = function () {
    return select(`object.main-container[id="${this.slideId}"]`)
      ?.contentDocument?.documentElement;
  };

  /**
   * @returns {HTMLElement} Page G element
   */
  this.page = function () {
    return this.documentElement()?.querySelector("g.SlideGroup g.Page");
  };

  /**
   * @returns {HTMLElement} Slide G element
   */
  this.slideG = function () {
    return this.documentElement()?.querySelector("g.SlideGroup g.Slide");
  };

  this.appendToPresentation = function (slideData) {
    session.PRESENTATION.slides.push(slideData);
    session.PRESENTATION.slidesOrder.push(slideData.slideId);
    return slide(slideData.slideId);
  };

  this.insertToPage = function () {
    let slideData = this.slideData();

    let miniPrevHtml = `
    <div class="slide-thumbnail" data-slide-id="${this.slideId}" is-active="${slideData.isActive}" draggable="true">
        <object id="prev_${this.slideId}" type="image/svg+xml" data="${slideData.style.svgFile}" class="col-12 p-0 rounded"></object>
        <div class="remove-slide" data-slide-id="${this.slideId}">
            <i class="fas fa-trash-alt text-white" style="pointer-events:none"></i>
        </div>
        <span class="slide-sl text-white mr-2"></span>
    </div>
    `;

    let miniPrev = stringToDOM(miniPrevHtml);

    miniPrev.ondragstart = (e) => {
      e.dataTransfer.setData("dragId", miniPrev.getAttribute("data-slide-id"));
    };

    miniPrev.ondragover = (e) => {
      e.preventDefault();
    };

    miniPrev.ondrop = (e) => {
      e.preventDefault();
      let o = session.PRESENTATION.slidesOrder;

      let dragId = e.dataTransfer.getData("dragId");
      let dropId = miniPrev.getAttribute("data-slide-id");
      if (!dragId || !dropId) return;
      if (dragId == dropId) return;

      let dragOrder = o.findIndex((i) => i === dragId);
      let dropOrder = o.findIndex((i) => i === dropId);

      o[dropOrder] = dragId;
      o[dragOrder] = dropId;

      let parent = document.getElementById("slides_preview");
      let ix = Array.from(parent.children);
      ix.map((e, i) => {
        let attr = ix[i].getAttributeNode("data-slide-id").value;
        if (attr === dragId) {
          parent.insertBefore(ix[i], parent.children[dropOrder]);
        }
        if (attr === dropId) {
          parent.insertBefore(ix[i], parent.children[dragOrder]);
        }
      });

      saveSlidesOrder();
      refresh_slide_prev_numbers();
    };

    add_event(miniPrev, "click", function (event) {
      if (event.target.classList.contains("remove-slide")) return;
      slide(this.dataset.slideId).display();
    });

    add_event(select("object", miniPrev), "load", function () {
      let slideId = this.getAttribute("id").split("_")[1];
      slide(slideId).cloneToMiniPrev();
    });

    add_event(select(".remove-slide", miniPrev), "click", (event) => {
      const slideId = event.target.dataset.slideId;
      slide(slideId).delete();
    });

    document.getElementById("slides_preview").appendChild(miniPrev);

    let mainHtml = `
        <object is-active="${slideData.isActive}" id="${this.slideId}" data-slide-id="${this.slideId}" type="image/svg+xml" data="${slideData.style.svgFile}" class="col-12 p-0 rounded main-container" style="visibility:hidden"></object>
        `;
    let main = stringToDOM(mainHtml);

    main.ondragover = (e) => {
      e.preventDefault();
    };

    main.ondrop = (e) => {
      let data;
      let mouseDiff = getMousePosition(e);
      if (e.dataTransfer.getData("imageData")) {
        data = JSON.parse(e.dataTransfer.getData("imageData"));
        createNewImage({
          image: data,
          keyword: data.keyword,
          mouseDiff: mouseDiff,
        });
      } else {
        data = JSON.parse(e.dataTransfer.getData("iconData"));
        createNewIcon({
          icon: data,
          keyword: data.keyword,
          mouseDiff: mouseDiff,
        });
      }
      Events.slide.preview.update();
    };

    // Init the slide - move etc
    add_event(main, "load", function () {
      preloader.show(() => slide(this.dataset.slideId).initSlide());
    });
    document.getElementById("SlideContainer").appendChild(main);

    renderDOMPopup();

    return this;
  };

  this.initSlide = function () {
    this.object().style.visibility = "visible";

    // Custom styles
    this.insertCustomStyles();

    // Create g for the filters
    const contentDocument = this.contentDocument();
    const filterContainer = contentDocument.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    filterContainer.setAttribute("id", "filterContainer");
    this.slideG().appendChild(filterContainer);

    // update textbox style.direction
    // Show the loaded slide
    let slideData = this.slideData();

    slideData.shapes.forEach((shape_) => {
      const shapeCls = shape(this.slideId, shape_.data.shape_id);
      let contentNumber, foreignObject, text, direction, content, g;
      // Built in textboxes
      if (shape_.data.alt.includes("h1|")) {
        try {
          contentNumber = shape_.data.alt.split("|")[1];
          content = slideData.analyzedContent[contentNumber].h1.data;
          shape_.data.text = text = content.text;
          direction = content.direction;
          Object.assign(shape_.data, content);
        } catch {
          shapeCls.remove();
        }
      } else if (shape_.data.alt.includes("paragraph|")) {
        try {
          contentNumber = shape_.data.alt.split("|")[1];
          content =
            slideData.analyzedContent[contentNumber].originalSentence.data;
          shape_.data.text = text = content.text;
          direction = content.direction;
          Object.assign(shape_.data, content);
          if (text == slideData.analyzedContent[contentNumber].h1.data.text)
            // Rm paragraph if it is same as h1
            throw new DOMException();
        } catch {
          shapeCls.remove();
        }
      } else if (shape_.data.alt == "slidetitle") {
        content = slideData.slideTitle.data;
        shape_.data.text = text = content.text;
        direction = content.direction;

        Object.assign(shape_.data, content);
      } else if (shape_.data.alt == "subtitle") {
        content = slideData.subTitle.data;
        if (!content.text)
          // Place holder slide title
          content = {
            text: constants.SLIDE_SUBTITLE_PLACEHOLDER,
            direction: slideData.direction,
          };
        shape_.data.text = text = content.text;
        direction = content.direction;
        Object.assign(shape_.data, content);
      } else if (shape_.data.alt == "newtextbox") {
        createNewTextbox(shape_.data, this.slideId);
      }
      g = shapeCls.el();
      if (text && g) {
        foreignObject = createForeignObject(
          this.contentDocument(),
          shape_.data
        );

        arrangeForeignObject(foreignObject, shape_.data, text, direction);
        g.innerHTML = "";
        g.classList.add("no-outline");
        g.appendChild(foreignObject);
      }

      // Built in images icon - h1 - slidetitle
      if (shape_.data.alt.includes("icon|")) {
        contentNumber = shape_.data.alt.split("|").pop();
        content = slideData.analyzedContent[contentNumber].icon.data;
        Object.assign(shape_.data, content);
        iconInit(this.slideId, shape_.data.shape_id, content.keyword);
        // Add event listener
        shapeCls.addEvent("click", selectIconElement);
      } else if (shape_.data.alt.includes("h1image|")) {
        contentNumber = shape_.data.alt.split("|")[1];
        content = slideData.analyzedContent[contentNumber].h1Image.data;
        Object.assign(shape_.data, content);
        h1Image(this.slideId, shape_.data.shape_id, content.keyword);
        // Add event listener
      } else if (shape_.data.alt == "slidetitleimage") {
        content = slideData.slideTitleImage.data;
        if (!content.keyword && !content.image) {
          let slideTitleImagePlaceholderUrl = g
            .querySelector("image")
            .getAttribute("xlink:href");
          content = {
            image: {
              url: slideTitleImagePlaceholderUrl,
              keyword: "",
            },
            keyword: "",
          };
        }
        Object.assign(shape_.data, content);
        h1Image(this.slideId, shape_.data.shape_id, content.keyword);
        // Add event listener
      } else if (shape_.data.alt == "newimage") {
        createNewImage(shape_.data, this.slideId);
      } else if (shape_.data.alt == "newicon") {
        createNewIcon(shape_.data, this.slideId);
      } else if (shape_.data.alt == "image") {
        // handle the builtin images
        if (!shape_.data.keyword && !shape_.data.image) {
          const imagePlaceholderUrl = g
            .querySelector("image")
            .getAttribute("xlink:href");

          shape_.data.image = {
            url: imagePlaceholderUrl,
            keyword: "",
          };
          shape_.data.keyword = "";
        }
        h1Image(this.slideId, shape_.data.shape_id, shape_.data.keyword);
        // Add event listener
      }

      g = shapeCls.el();
      if (g) {
        // Update the SVG attributes
        shapeCls.updateAttrs();
        // initialize the transform
        initializeG(g);
        // Move to saved position
        shapeCls.moveToSavedPosition();
        // initialize the filters
        colorFilters(g).init(this.slideId);
        // Update color
        updateColor(g).init(this.slideId);
      }
      if (shape_.data.active == "false") shapeCls.remove();
    });

    // Adjust slidetitle bounding_box
    // const stitle = this.page().querySelector('g[alt="slidetitle"]')
    // autosizeForeignObject(stitle.querySelector("foreignObject"));

    // Background
    updateColor().background(this.slideId);

    this.display();

    // Add event listeners
    makeDraggable(this.contentDocument());
    keyboardListener(this.contentDocument());
    this.contentDocument().addEventListener("click", (e) => {
      if (session.SELECTED_ELEMENTS.length !== 1) return;
      if (
        session.SELECTED_ELEMENTS[0].shapeType === constants.SHAPE_TYPES.TEXTBOX
      ) {
        //text
        openTextboxElement(e);
      } else if (
        session.SELECTED_ELEMENTS[0].shapeType === constants.SHAPE_TYPES.IMAGE
      ) {
        //image
        Events.popup.image.open({
          shapeId: session.SELECTED_ELEMENTS[0].shapeId,
        });
      } else if (
        session.SELECTED_ELEMENTS[0].shapeType === constants.SHAPE_TYPES.ICON
      ) {
        //icon
        Events.popup.icon.open({
          shapeId: session.SELECTED_ELEMENTS[0].shapeId,
        });
      }
    });

    this.contentDocument().addEventListener("dblclick", (e) => {
      if (
        session.SELECTED_ELEMENTS[0].shapeType === constants.SHAPE_TYPES.TEXTBOX
      ) {
        //text
        selectTextboxElement(e);
      }
    });
    this.contentDocument().addEventListener("contextmenu", (e) => {
      e.preventDefault();

      // While triggering the "contextMenu.open" event, send the target too.
      Events.contextMenu.open({ target: e.target, event: e });
    });

    // Reduce the font sizes slidetitle
    reduceFontSize(selectAll("g[alt^='slidetitle']", this.page()));

    // Reduce the font sizes h1
    reduceFontSize(selectAll("g[alt^='h1|']", this.page()));

    // Reduce the font sizes paragraph
    reduceFontSize(selectAll("g[alt^='paragraph|']", this.page()));

    // Slide numbers
    refresh_slide_prev_numbers();

    // Update z-index
    this.updateZIndex();

    // Add logo, if there is not
    addLogo(session?.PRESENTATION?.settings?.logo?.image, this.slideId);

    // Update the mini prevs
    setTimeout(() => {
      this.cloneToMiniPrev();
    }, 2500);

    return this;
  };

  this.updateZIndex = () => {
    // First check if the shape_index saved before
    /**
     * @type {Array} shapes
     */
    const shapes = this.slideData().shapes;
    for (let index = 0; index < shapes.length; index++) {
      const shape_ = shapes[index];
      if (!shape_.data.shape_index) return;
      if (typeof shape_.data.shape_index != "number") return;
    }

    const elementTree = this.page();
    const background = elementTree.querySelector(".Background");
    shapes
      .slice(0)
      .sort((a, b) => b.data.shape_index - a.data.shape_index)
      .forEach((e, i) => {
        const g = shape(this.slideId, e.data.shape_id).el();
        if (g)
          elementTree.insertBefore(
            shape(this.slideId, e.data.shape_id).el(),
            background.nextElementSibling
          );
      });
  };

  this.saveZIndex = () => {
    const elementTree = this.page();
    for (let i = 0; i < elementTree.children.length; i++) {
      const shape_ = shape(elementTree.children[i]);
      if (!shape_) return;
      const data = shape_.data();
      if (!data) return;
      data.shape_index = i;
    }
  };

  this.display = function () {
    // Deselect elements
    deSelectAll();

    selectAll(".slide-thumbnail").forEach((e) => {
      e.classList.remove("active-slide");
    });

    selectAll("object.main-container").forEach((e) => {
      e.style.display = "none";
    });

    if (session.SAVED == false) {
      let firstSlide = select(
        'div.slide-thumbnail[data-slide-id="' +
          session.PRESENTATION.slidesOrder[0] +
          '"]'
      );
      firstSlide.classList.add("active-slide");

      let firstDisplay = select(
        `object.main-container[id="${session.PRESENTATION.slidesOrder[0]}"]`
      );
      firstDisplay.style.display = "";

      // Update the session CURRENT_SLIDE
      session.CURRENT_SLIDE = session.PRESENTATION.slidesOrder[0];

      // Dispatch the selection event
      Events.slide.display({ slideId: session.PRESENTATION.slidesOrder[0] });
    } else {
      this.objectPrev().classList.add("active-slide");
      this.object().style.display = "";
      // Update the session CURRENT_SLIDE
      session.CURRENT_SLIDE = this.slideId;

      // Dispatch the selection event
      Events.slide.display({ slideId: this.slideId });
    }

    return this;
  };

  this.cloneToMiniPrev = (force = false) => {
    if (
      session.LAST_MINIPREV_UPDATE[this.slideId] + 1000 > Date.now() &&
      !force
    )
      return;

    const contentDocument = window.top.document.getElementById(
      "prev_" + this.slideId
    ).contentDocument;

    if (contentDocument?.querySelector("svg")) {
      /**
       * @type {SVGGElement} clone
       */

      const clone = this.slideG()?.cloneNode(true);

      if (!clone) return;

      clone.style.visibility = "hidden";
      // Clear the clone
      let title;
      let subTitle;
      if (clone.querySelector("[alt='slidetitle']") !== null) {
        title = clone.querySelector("[alt='slidetitle'] td");
        if (title?.outerText === constants.SLIDE_TITLE_PLACEHOLDER)
          clone.querySelector("[alt='slidetitle']").remove();
      } else if (clone.querySelector("[alt='subtitle']") !== null) {
        subTitle = clone.querySelector("[alt='subtitle'] td");
        if (subTitle?.outerText === constants.SLIDE_SUBTITLE_PLACEHOLDER)
          clone.querySelector("[alt='subtitle']").remove();
      }

      clone
        .querySelectorAll(
          "circle[direction],line[direction],.replace-icon,.edit-textbox-icon,.image-icon,.d-none"
        )
        ?.forEach((e) => e.remove());

      const oldSlideG = contentDocument.querySelector("g.SlideGroup g.Slide");
      oldSlideG.parentElement.appendChild(clone);

      setTimeout(() => {
        oldSlideG.remove();
        clone.style.visibility = "visible";
      }, 500);
      session.LAST_MINIPREV_UPDATE[this.slideId] = Date.now();
    }
  };

  this.changeDesign = (designData) => {
    const slideData = this.slideData();
    const newAddedShapes = slideData.shapes
      .map((shape_) => {
        if (["newtextbox", "newimage", "newicon"].includes(shape_.data.alt))
          return shape_;
      })
      .filter((e) => e);

    slideData.style = { ...designData };
    slideData.shapes = [...designData.shapes, ...newAddedShapes];
    slideData.colorTemplate = { ...designData.colorTemplate };
    slideData.background = { ...designData.background };

    this.updateOnPage();
  };

  this.updateOnPage = () => {
    let slideData = this.slideData();
    let miniPrev = select(
      'div.slide-thumbnail[data-slide-id="' + this.slideId + '"]'
    );
    let miniPrevObject = select("object", miniPrev);
    miniPrevObject.setAttribute("data", slideData.style.svgFile);
    // load event will be triggered
    let main = select("object[id='" + this.slideId + "']");
    main.setAttribute("data", slideData.style.svgFile);
    // load event will be triggered
    return this;
  };

  this.appendNewShape = (newShapeData) => {
    let addedBefore = false;
    const shapes = this.slideData().shapes;
    shapes.forEach((shape_) => {
      if (shape_.data.shape_id == newShapeData.data.shape_id)
        addedBefore = true;
    });
    if (!addedBefore) shapes.push(newShapeData);
  };

  this.delete = (pushToHistory = true) => {
    const miniPrev = this.objectPrev();
    miniPrev.setAttribute("is-active", "false");
    const object = this.object();
    object.setAttribute("is-active", "false");
    this.slideData().isActive = false;
    presentation().nextOf(this.slideId);
    refresh_slide_prev_numbers();

    apiService({
      url: "/api/editor/slide/delete",
      data: {
        slideId: this.slideId,
      },
    });
    if (pushToHistory) Events.slide.deleted({ slideId: this.slideId });
  };

  this.restore = () => {
    const miniPrev = this.objectPrev();
    miniPrev.setAttribute("is-active", "true");
    const object = this.object();
    object.setAttribute("is-active", "true");
    this.slideData().isActive = true;
    apiService({
      url: "/api/editor/slide/restore",
      data: {
        slideId: this.slideId,
      },
    });
    this.display();
    refresh_slide_prev_numbers();
    Events.slide.restored({ slideId: this.slideId });
  };

  this.insertCustomStyles = () => {
    const styles = reactToDOM(
      <style>{`
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

		.text_editing foreignObject.bounding_box:hover{
            outline: none;
        }

        /* g>foreignObject outline bug */
        .no-outline{
            outline:none !important;
        }
        foreignObject.bounding_box:hover{
            outline: solid cyan 50px;
            overflow: hidden;
        }
        g:not(.text_editing)>foreignObject.bounding_box:hover .edit-textbox-icon, g:not(.text_editing)>foreignObject.bounding_box:hover .replace-icon{
            display: none;
        }
        foreignObject { overflow: visible; }
        foreignObject table {
            position: fixed;
            word-break: break-word;
        }
        .edit-textbox-icon, .replace-icon, .image-icon {
            font-size: 1301px;
            position: absolute;
            display: none;
            pointer-events:all !important;
            justify-content: center;
            width: 1.6em;
            height: 1.6em;
            background: cyan;
            bottom: -50px;
            left: -1650px;
            border-top-left-radius: 300px;
            border-bottom-left-radius: 300px;
            width: 1600px;
            height: 1600px;
            transform-origin: bottom right;
            transition: 0.5s;
        }
        .active{
          display: block
        }
       

            foreignObject.bounding_box::selection .edit-textbox-icon,foreignObject.bounding_box::selection .replace-icon 
            {
              display: block !important;
            }
            foreignObject.bounding_box::selection .image-icon{
              display: flex !important;              
            }


        .edit-textbox-icon:hover, .replace-icon:hover, .image-icon:hover {
            box-shadow: -0.06em 0.06em 0.13em 0.04em #8c8c8c;
            transition: 0.5s;
        }
        .edit-textbox-icon:hover .edit-textbox-icon-inner-wrapper {
            transition: 0.5s;
            color: #00115d;
        }
        .edit-textbox-icon-inner-wrapper {
            transition: 0.5s;
            position: absolute;
            left: 0.12em;
            bottom: 0.06em;
            color: #2f53d6;
        }
		
        .replace-icon {
            padding: 5.5% 11% 11% 11%;
            box-sizing: border-box;
        }
        .image-icon {
            padding: 100px;
            box-sizing: border-box;
        }
        foreignObject:hover > .image-icon {
            display: flex;
        }
        g:not(.text_editing)>foreignObject.bounding_box:hover .edit-textbox-icon{
            display:block;
        }
        editing.highlighted{
            background-color: #3390ff;
            color: white;
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
        .d-none {
            display:none !important
        }

		.text_editing foreignObject.bounding_box:hover .edit-textbox-icon
            {
              display: none!important;
            }

        `}</style>,
      null,
      "http://www.w3.org/2000/svg"
    );

    this.contentDocument().querySelector("svg").appendChild(styles);
    this.prevDocument().querySelector("svg").appendChild(styles.cloneNode());
  };
}
