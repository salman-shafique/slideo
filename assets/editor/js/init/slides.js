import slide from "Editor/entity/slide";


jQuery(function () {
    let slide_els = document.querySelectorAll("#slides_init slide[data-slide-id]");
    if (slide_els)
        slide_els.forEach(slide_el => {
            let slide_id = slide_el.dataset.slideId;
            new slide(slide_id);
        });
})
