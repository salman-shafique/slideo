import React from "react";
import apiService from "Editor/js/utils/apiService";
import slide from "Editor/js/entity/slide";
import LayoutItem from "./LayoutItem";

export default function LayoutItems() {

    const [layouts, setLayouts] = React.useState({});
    const [layoutItems, setLayoutItems] = React.useState([]);

    if (Object.keys(layouts).length == 0) {
        window.top.addEventListener('slide.display', (event) => {
            const slideId = event.slideId;
            const slideData = slide(slideId).slideData();

            const direction = slideData.direction;
            const capacity = String(slideData.sentences.length);

            if (!layouts[direction])
                layouts[direction] = {};
            if (!layouts[direction][capacity])
                layouts[direction][capacity] = [];

            if (layouts[direction][capacity].length == 0) {
                apiService({
                    "url": "/api/layout/get",
                    "data": {
                        "direction": direction,
                        "capacity": capacity,
                    },
                    "success": (r) => {
                        layouts[direction][capacity] = r;
                        setLayouts(layouts);
                    }
                })
            }

            try {
                let layoutItemsTmp = [];
                layouts[direction][capacity].forEach((layoutData, i) => {
                    layoutItemsTmp.push(
                        <LayoutItem key={i} layoutData={layoutData} />
                    )
                });
                setLayoutItems(layoutItemsTmp);
            } catch (error) {
                
            }
        });

        return (
            <h1>No layout items here</h1>
        )
    }
    return layoutItems;
 
}