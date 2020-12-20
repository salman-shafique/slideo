
// Deselect textbox here
window.addEventListener("shape.released", (event) => {
  /**
  * @type {SVGGElement} g
  */
  const g = event.data.shape;
  if (g.querySelector("foreignObject")) {
    console.log(g);

    if (g.classList.contains("text_editing"))
      g.classList.remove("text_editing");
  }
})