import React from "react";
import apiService from "Editor/js/utils/apiService";
import slide from "Editor/js/entity/slide";
import DesignItem from "./DesignItem";
import preloader from "Editor/js/components/preloader";


export default function DesignItems() {

    const [designs, setDesigns] = React.useState({});
    const [designItems, setDesignItems] = React.useState([]);


    const arrangeDesignItems = (freshDesignItems)=>{
        let tmpDesignItems = [];
        freshDesignItems
        .sort((a,b)=>b.id-a.id)
        .forEach((designData, i) => {
            if (designData)
                tmpDesignItems.push(
                    <DesignItem key={i} designData={designData} />
                )
        });
        setDesignItems(tmpDesignItems);
    }

    React.useEffect(()=>{
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

                preloader.show();
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
                        preloader.hide();
                    }
                })
                return;
            }

            try {
                arrangeDesignItems(designs[direction][capacity]);
            } catch (error) {}
        });
    },[]);


    if (designItems.length == 0)
        return (
            <h4 className={"text-center text-white"}>Let's create beautiful presentations!</h4>
        )
    
    return designItems;

}