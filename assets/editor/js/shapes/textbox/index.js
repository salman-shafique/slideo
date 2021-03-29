import session from "Editor/js/session";
import constants from "Editor/js/constants";
import shape from "Editor/js/entity/shape";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import sidebar from "Editor/js/entity/sidebar";
import Events from "Editor/js/Events";

/**
 * 
 * @param {SVGGElement} g 
 * @param {string} newText 
 */
export const updateText = (g, newText) => {
  const td = g.querySelector("td");
  td.innerHTML = "";
  td.append(newText);

  const alt = g.getAttribute("alt");

  if (alt.includes("h1|")) {
    // Update the H1
    shape(g).setH1(newText);
  } else if (alt.includes("paragraph|")) {
    // Update the OriginalSentence
    shape(g).setOriginalSentence(newText);
  } else if (alt == "slidetitle") {
    // Update the SlideTitle
    shape(g).setSlideTitle(newText);
  } else if (alt == "subtitle") {
    // Update the SubTitle
    shape(g).setSubTitle(newText);
  } else if (alt == "newtextbox") {
    // Update the SubTitle
    shape(g).setText(newText);
  }
}


const cancelEditing = (event) => {
  /**
  * @type {SVGGElement} g
  */
  const g = event.data.shape;
  if (getShapeType(g) != constants.SHAPE_TYPES.TEXTBOX) return;

  const td = g.querySelector("td");
  const newText = td.innerText.trim().replace(/\n/g, '');

  if (g.classList.contains("text_editing")) {
    g.classList.remove("text_editing");
    td.removeAttribute("contenteditable");
  }

  Events.shape.textbox.edit.ended({ newText });
  session.TEXT_EDITING = false;

  updateText(g, newText);
}

// Cancel editing here
Events.listen("shape.released", cancelEditing);

// Cancel editing when drag started
Events.listen("shape.drag.started", () => {
  session.SELECTED_ELEMENTS.forEach(selectedEl => {
    cancelEditing({ data: { shape: selectedEl.shape } });
  });
});
// Cancel editing when resize started
Events.listen("shape.resize.started", () => {
  session.SELECTED_ELEMENTS.forEach(selectedEl => {
    cancelEditing({ data: { shape: selectedEl.shape } });
  });
});

// Cancel editing when multiple elements selected
Events.listen("shape.selected", (event) => {
  if (session.SELECTED_ELEMENTS.length > 1) {
    session.SELECTED_ELEMENTS.forEach(selectedEl => {
      cancelEditing({ data: { shape: selectedEl.shape } });
    });
  }
  // Open the sidebar
  if (getShapeType(event.data.shape) == constants.SHAPE_TYPES.TEXTBOX)
    sidebar.open("Text_Tool");
});



