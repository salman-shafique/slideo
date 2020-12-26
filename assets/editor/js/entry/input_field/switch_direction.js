import session from "Editor/js/session";
import "Editor/css/direction.css";


export default function switch_direction(dir) {

    let previousDirection;
    if (dir == "rtl")
        previousDirection = "ltr";
    else
        previousDirection = "rtl";

    document.querySelectorAll("." + previousDirection).forEach(e => {
        e.classList.remove(previousDirection);
        e.classList.add(dir);
    });

    session.DIRECTION = dir;
}