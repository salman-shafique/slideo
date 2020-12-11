import React from "react";
import session from "Editor/js/session";
import apiService from "Editor/js/utils/apiService";
import slide from "Editor/js/entity/slide";
import DesignItem from "./DesignItem";

export default function DesignItems() {

    const [designs, setDesigns] = React.useState({});
    const [designItems, setDesignItems] = React.useState([]);

    if (Object.keys(designs).length == 0) {
        window.top.addEventListener('slide.display', (event) => {
            const slideId = event.slideId;
            const slideData = slide(slideId).slideData();

            const direction = slideData.direction;
            const capacity = String(slideData.sentences.length);

            if (!designs[direction])
                designs[direction] = {};
            if (!designs[direction][capacity])
                designs[direction][capacity] = [];

            if (designs[direction][capacity].length == 0) {
                apiService({
                    "url": "/api/style/get",
                    "data": {
                        "direction": direction,
                        "capacity": capacity,
                    },
                    "success": (r) => {
                        designs[direction][capacity] = r;
                        setDesigns(designs);
                    }
                })
            }

            try {
                let designItemsTmp = [];
                designs[direction][capacity].forEach((designData, i) => {
                    designItemsTmp.push(
                        <DesignItem key={i} designData={designData} />
                    )
                });
                setDesignItems(designItemsTmp);
            } catch (error) {
                
            }
        });

        return (
            <h1>No design items here</h1>
        )
    }
    return designItems;
 
}