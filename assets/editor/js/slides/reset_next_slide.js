import session from "Editor/js/session";

export default function reset_next_slide() {
    session.NEXT_SLIDE = {
        "slideTitle": "",
        "sentences": [],
        'direction': 'rtl'
    };
}