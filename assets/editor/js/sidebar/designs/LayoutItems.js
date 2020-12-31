import React from "react";
import apiService from "Editor/js/utils/apiService";
import slide from "Editor/js/entity/slide";
import LayoutItem from "./LayoutItem";
import preloader from "Editor/js/components/preloader";

const preloader_ = preloader();
export default function LayoutItems() {

    const [layouts, setLayouts] = React.useState({});
    const [layoutItems, setLayoutItems] = React.useState([]);

    const arrangeLayoutItems = (freshDesignItems)=>{
        let layoutItemsTmp = [];
        freshDesignItems.forEach((layoutData, i) => {
            if (layoutData)
                layoutItemsTmp.push(
                    <LayoutItem key={i} layoutData={layoutData} />
                )
        });
        setLayoutItems(layoutItemsTmp);
    }

    if (Object.keys(layouts).length == 0) {
        window.top.addEventListener('slide.display', (event) => {
            const slideId = event.data.slideId;
            const slideData = slide(slideId).slideData();

            const direction = slideData.direction;
            const capacity = String(slideData.sentences.length);

            if (!layouts[direction])
                layouts[direction] = {};
            if (!layouts[direction][capacity])
                layouts[direction][capacity] = [];

            if (layouts[direction][capacity].length == 0) {
                layouts[direction][capacity].push(null);
                preloader_.show();
                apiService({
                    "url": "/api/layout/get",
                    "data": {
                        "direction": direction,
                        "capacity": capacity,
                    },
                    "success": (r) => {
                        layouts[direction][capacity] = r;
                        setLayouts(layouts);
                        arrangeLayoutItems(layouts[direction][capacity]);
                        preloader_.hide();
                    }
                });
            }

            try {
                arrangeLayoutItems(layouts[direction][capacity]);
            } catch (error) {}
        });

        return (
            <h4 className={"text-center"}>Let's create beautiful presentations!</h4>
        )
    }
    return layoutItems;

}