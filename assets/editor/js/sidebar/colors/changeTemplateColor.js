import add_event from "Editor/js/utils/add_event";

add_event(".color_template_dropdown_item", "click", function() {
let colorsContainer = this.querySelector(".colors-container");

   console.log(colorsContainer); 
})
