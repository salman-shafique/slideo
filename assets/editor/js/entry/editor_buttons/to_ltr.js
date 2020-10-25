
import add_event from "Editor/js/utils/add_event";
import swicth_direction from "Editor/js/entry/input_field/switch_direction";

add_event("#entry_to_ltr", "click", function () {
    swicth_direction("ltr");
})