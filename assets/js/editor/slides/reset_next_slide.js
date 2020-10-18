import session from "Editor/session";

export default function reset_next_slide() {
    session.NEXT_SLIDE = {
        "slideTitle": "",
        "sentences": [],
        'direction': 'rtl'
    };
}