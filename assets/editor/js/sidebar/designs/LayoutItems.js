import React from "react";
import apiService from "Editor/js/utils/apiService";
import slide from "Editor/js/entity/slide";
import LayoutItem from "./LayoutItem";
import preloader from "Editor/js/components/preloader";


//Need to check if one layout is selected.
//NEED To set layouts in designspanel, or find a way to keep the layouts showing, even though the whole design panel is being hidden.
//If I can pass state of selected layouts back up to design panel, i should be able to send it back down to layoutitems


export default function LayoutItems(props) {

    const [layouts, setLayouts] = React.useState({});
    const [layoutItems, setLayoutItems] = React.useState([]);

    React.useEffect(() => {
        console.log('layouts', layouts)
        console.log('layout items', layoutItems)
    });

    const [layoutSelected, setLayoutSelected] = React.useState(false);
    const sendData = (trueFalse) => {
        props.parentCallback("hey popsie, hows it going", trueFalse);
        setLayoutSelected(trueFalse);
        console.log(layoutSelected);
    }
    const arrangeLayoutItems = (freshDesignItems)=>{

        
        let layoutItemsTmp = [];
        freshDesignItems.forEach((layoutData, i) => {
            if (layoutData)
                layoutItemsTmp.push(
                    <LayoutItem 
                        key={i} 
                        layoutData={layoutData} 
                        sendData={sendData} 
                        setSelectedLayouts={props.setSelectedLayouts}
                        setIsMenuOpen={props.setIsMenuOpen}
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