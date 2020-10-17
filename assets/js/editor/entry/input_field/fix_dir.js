import clear_text from "Editor/utils/clear_text";
import is_rtl from "./is_rtl";
import switch_direction from "./switch_direction";
import session from "Editor/session";
import add_event from "Editor/utils/add_event";

add_event("#slideTitle,#area", "keyup", function () {
    let text = clear_text(this.innerText || this.value);

    if (text)
        if (text.length >= 2) {
            if (is_rtl(text)) {
                if (session.DIRECTION != "rtl") {
                    switch_direction("rtl");
                }
            } else {
                if (session.DIRECTION != "ltr") {
                    switch_direction("ltr");
                }
            }
        }
})


