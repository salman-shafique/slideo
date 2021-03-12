import React from "react";
import apiService from "Editor/js/utils/apiService";
import slide from "Editor/js/entity/slide";
import LayoutItem from "./LayoutItem";
import preloader from "Editor/js/components/preloader";

export default function LayoutItems(props) {
    const [layouts, setLayouts] = React.useState({});
    const [layoutItems, setLayoutItems] = React.useState([]);
    const [layoutSelected, setLayoutSelected] = React.useState(false);

    const arrangeLayoutItems = (freshDesignItems)=>{
        let layoutItemsTmp = [];
        freshDesignItems.forEach((layoutData, i) => {
            if (layoutData)
                layoutItemsTmp.push(
                    <LayoutItem 
                        key={i} 
                        layoutData={layoutData} 
                        setSelectedLayouts={props.setSelectedLayouts}
                        setIsMenuOpen={props.setIsMenuOpen}
                        isMenuOpen={props.isMenuOpen}
                        clearSelectedLayout={props.clearSelectedLayout}
                    />
                )
        });
        setLayoutItems(layoutItemsTmp);
    }

    React.useEffect(()=>{
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
                preloader.show();
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
                        preloader.hide();
                    }
                });
            }

            try {
                arrangeLayoutItems(layouts[direction][capacity]);
            } catch (error) {}
        });
    },[]);


    if (layoutItems.length == 0)
        return (
            <h4 className={"text-center"}>Let's create beautiful presentations!</h4>
        )
    
    return layoutItems;

}