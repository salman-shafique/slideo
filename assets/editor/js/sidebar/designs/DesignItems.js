import React from "react";
import apiService from "Editor/js/utils/apiService";
import slide from "Editor/js/entity/slide";
import DesignItem from "./DesignItem";

export default function DesignItems() {

    const [designs, setDesigns] = React.useState({});
    const [designItems, setDesignItems] = React.useState([]);


    const arrangeDesignItems = (freshDesignItems)=>{
        let tmpDesignItems = [];
        freshDesignItems.forEach((designData, i) => {
            if (designData)
                tmpDesignItems.push(
                    <DesignItem key={i} designData={designData} />
                )
        });
        setDesignItems(tmpDesignItems);
    }

    if (Object.keys(designs).length == 0) {
        window.top.addEventListener('slide.display', (event) => {
            const slideId = event.data.slideId;
            const slideData = slide(slideId).slideData();

            const direction = slideData.direction;
            const capacity = String(slideData.sentences.length);

            if (!designs[direction])
                designs[direction] = {};
            if (!designs[direction][capacity])
                designs[direction][capacity] = [];

            if (designs[direction][capacity].length == 0) {
                designs[direction][capacity].push(null);
                apiService({
                    "url": "/api/style/get",
                    "data": {
                        "direction": direction,
                        "capacity": capacity,
                    },
                    "success": (r) => {
                        designs[direction][capacity] = r;
                        setDesigns(designs);
                        arrangeDesignItems(designs[direction][capacity]);
                    }
                })
                return;
            }

            try {
                arrangeDesignItems(designs[direction][capacity]);
            } catch (error) {}
        });

        return (
            <h4 className={"text-center text-white"}>Let's create beautiful presentations!</h4>
        )
    }
    return designItems;

}