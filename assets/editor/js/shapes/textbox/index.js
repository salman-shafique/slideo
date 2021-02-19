import session from "Editor/js/session";
import constants from "Editor/js/constants";
import shape from "Editor/js/entity/shape";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import sidebar from "Editor/js/entity/sidebar";


const cancelEditing = (event) => {
  /**
  * @type {SVGGElement} g
  */
  const g = event.data.shape;
  if (getShapeType(g) != constants.SHAPE_TYPES.TEXTBOX) return;

  const alt = g.getAttribute("alt");
  const td = g.querySelector("td");

  const newText = td.innerText.trim().replace(/\n/g, '');
  td.innerHTML = "";
  td.append(newText);

  if (g.classList.contains("text_editing")) {
    g.classList.remove("text_editing");
    td.removeAttribute("contenteditable");
  }
  session.TEXT_EDITING = false;

  if (alt.includes("h1|")) {
    // Update the H1
    shape(session.CURRENT_SLIDE, g.getAttribute("shape_id")).setH1(newText);
  }
  else if (alt.includes("paragraph|")) {
    // Update the OriginalSentence
    shape(session.CURRENT_SLIDE, g.getAttribute("shape_id")).setOriginalSentence(newText);
  }
  else if (alt == "slidetitle") {
    // Update the SlideTitle
    shape(session.CURRENT_SLIDE, g.getAttribute("shape_id")).setSlideTitle(newText);
  }
  else if (alt == "subtitle") {
    // Update the SubTitle
    shape(session.CURRENT_SLIDE, g.getAttribute("shape_id")).setSubTitle(newText);
  }
  else if (alt == "newtextbox") {
    // Update the SubTitle
    shape(session.CURRENT_SLIDE, g.getAttribute("shape_id")).setText(newText);
  }

}

// Cancel editing here
window.addEventListener("shape.released", cancelEditing);

// Cancel editing when drag started
window.addEventListener("shape.drag.started", () => {
  session.SELECTED_ELEMENTS.forEach(selectedEl => {
    cancelEditing({ data: { shape: selectedEl.shape } });
  });
});
// Cancel editing when resize started
window.addEventListener("shape.resize.started", () => {
  session.SELECTED_ELEMENTS.forEach(selectedEl => {
    cancelEditing({ data: { shape: selectedEl.shape } });
  });
});

// Cancel editing when multiple elements selected
window.addEventListener("shape.selected", (event) => {
  if (session.SELECTED_ELEMENTS.length > 1) {
    session.SELECTED_ELEMENTS.forEach(selectedEl => {
      cancelEditing({ data: { shape: selectedEl.shape } });
    });
  }
  // Open the sidebar
  if (getShapeType(event.data.shape) == constants.SHAPE_TYPES.TEXTBOX)
    sidebar.open("Text_Tool");
});



