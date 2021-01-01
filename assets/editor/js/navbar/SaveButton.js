import React from "react";
import preloader from "Editor/js/components/preloader";
import apiService from "Editor/js/utils/apiService";
import slide from "Editor/js/entity/slide";
import shape from "Editor/js/entity/shape";
import session from "Editor/js/session";
import constants from "Editor/js/constants";


const preloader_ = preloader();

export function saveChanges() {
    const slides = session.PRESENTATION.slides;

    slides.forEach(aSlide => {
        preloader_.show();

        const slide_ = slide(aSlide.slideId);
        const svg = slide_.contentDocument().querySelector("svg");
        const SVG_WIDTH = constants.SVG_WIDTH(svg);
        const SVG_HEIGHT = constants.SVG_HEIGHT(svg);

        aSlide.shapes.forEach(aShape => {
            const shape_ = shape(aSlide.slideId, aShape.data.shape_id);
            shape_.saveTransforms(SVG_WIDTH, SVG_HEIGHT);
        });

        apiService({
            url: "/api/presentation/save/slide",
            data: {
                slide: aSlide
            },
            success: (r) => {
                if (r.success) {
                    const slideData = slide(r.slideId).slideData();
                    slideData.shapes = [];
                    r.newShapes.forEach(newShape => {
                        slideData.shapes.push(newShape)
                    });
                }
                preloader_.hide();
            }
        })
    });
}


export default function SaveButton() {
    return (
        <button onClick={saveChanges} className="btn btn-info bevel-btn horizontal-text-clip">
            לשמור
        </button>
    )
}