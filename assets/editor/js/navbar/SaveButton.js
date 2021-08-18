import React from "react";
import preloader from "Editor/js/components/preloader";
import apiService from "Editor/js/utils/apiService";
import slide from "Editor/js/entity/slide";
import shape from "Editor/js/entity/shape";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import deSelectAll from "Editor/js/shapes/actions/drag/utils/deSelectAll";
import base64 from "Editor/js/utils/base64";

export function saveChanges(callback = null) {
    preloader.show();
    
    const slides = session.PRESENTATION.slides;
    
    // deSelectAll();
   
    // SetTimeout commented to prevent preloader to show up on every little changes made
    // setTimeout(() => { 
        slides.forEach((aSlide, i) => {

            const slide_ = slide(aSlide.slideId);
            const svg = slide_.contentDocument().querySelector("svg");
            const SVG_WIDTH = constants.SVG_WIDTH(svg);
            const SVG_HEIGHT = constants.SVG_HEIGHT(svg);

            aSlide.shapes.forEach(aShape => {
                const shape_ = shape(aSlide.slideId, aShape.data.shape_id);
                shape_.saveTransforms(SVG_WIDTH, SVG_HEIGHT);
            });

            // Save the zIndex;
            slide_.saveZIndex();

            const encoded = base64.encode(JSON.stringify(aSlide));
            apiService({
                url: "/api/presentation/save/slide",
                data: {
                    slide: encoded
                },
                // Commented async false to make the call asynchronous 
                // async: false, 
                success: (r) => {
                    if (r.success) {
                        const slideData = slide(r.slideId).slideData();
                        slideData.shapes = [];
                        r.newShapes.forEach(newShape => {
                            slideData.shapes.push(newShape)
                        });
                    }
                    if (i == slides.length - 1)
                        if (typeof callback == "function") {
                            preloader.hide();
                            callback();
                        }

                }
            });
        });

        // Save presentation settings
        apiService({
            url: "/api/presentation/save/settings",
            data: {
                settings: session.PRESENTATION.settings,
                history: session.PRESENTATION.history,
                slidesOrder: session.PRESENTATION.slidesOrder
            }
        });
        preloader.hide();
    // }, 50);
}

export default function SaveButton() {
    return (
        <button onClick={saveChanges} className="btn btn-info bevel-btn horizontal-text-clip d-none">
            לשמור
        </button>
    )
}