import session from "Editor/session";

export default function reset_next_slides() {
    session.NEXT_SLIDE = {
        "slideTitle": "",
        "sentences": [],
        'direction': 'rtl'
    };
    session.NEW_SLIDES = [];
}