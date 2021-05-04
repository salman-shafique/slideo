import slide from "Editor/js/entity/slide";

export default function refresh_slide_prev_numbers() {
    let slide_prevs = document.querySelectorAll(".slide-thumbnail[data-slide-id][is-active='true']");
    if (slide_prevs)
        slide_prevs.forEach((slide_prev, index) => {
            slide_prev.querySelector("span.slide-sl").innerText = index + 1;
            let slideId = slide_prev.dataset.slideId;

            let slideCounter = slide(slideId).contentDocument().querySelector('g[alt="slidecounter"] text tspan[fill]');
            if (slideCounter)
                slideCounter.innerHTML = index + 1;
        });
}