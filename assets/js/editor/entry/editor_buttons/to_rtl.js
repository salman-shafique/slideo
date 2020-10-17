
import add_event from "Editor/utils/add_event";
import swicth_direction from "Editor/entry/input_field/switch_direction";

add_event("#entry_to_rtl", "click", function () {
    swicth_direction("rtl");
})