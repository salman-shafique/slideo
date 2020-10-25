export default function refresh_slide_prev_numbers() {
    let slide_prevs = document.querySelectorAll(".slide-thumbnail[data-slide-id]");
    if (slide_prevs)
        slide_prevs.forEach((slide_prev, index) => {
            slide_prev.querySelector("span.slide-sl").innerText = index + 1;
        });
}