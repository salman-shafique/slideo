import React from "react";
import apiService from "Editor/js/utils/apiService";
import slide from "Editor/js/entity/slide";
import Events from "Editor/js/Events";
import DesignItem from "./DesignItem";
import preloader from "Editor/js/components/preloader";
import hexToRgb from "Editor/js/sidebar/colors/hexToRgb";

export let allDesigns = [];

export default function DesignItems() {
  const [designs, setDesigns] = React.useState({});
  const [designItems, setDesignItems] = React.useState([]);

  const arrangeDesignItems = (freshDesignItems) => {
    let tmpDesignItems = [];
    freshDesignItems
      .sort((a, b) => b.id - a.id)
      .forEach((designData, i) => {
        designData.shapes.forEach((shape) => {
          if (shape.data.alt.includes("icon")) {
            if (shape.data.icon) {
              delete shape.data.icon;
              delete shape.data.keyword;
              delete shape.data.keywords;
              delete shape.data.inEnglish;
              delete shape.data.lang;
              delete shape.data.text;
              delete shape.data.title;
              delete shape.data.allTransforms;

              const defaultColorHex = `#${shape.data.alt.slice(0, 6)}`;
              const defaultColor = hexToRgb(defaultColorHex);

              shape.data.rgb = defaultColor;

              Events.saveChange.resetContent({
                id: shape.id,
                data: shape.data,
              });
            }
          } else if (shape.data.alt.includes("image")) {
            Events.listen("saveChange.inited", () => {
              if (shape.data.image) {
                delete shape.data.image;
                delete shape.data.keyword;
                delete shape.data.keywords;
                delete shape.data.inEnglish;
                delete shape.data.lang;
                delete shape.data.text;
                delete shape.data.title;
                delete shape.data.allTransforms;
                delete shape.data.isImageChanged;

                Events.saveChange.resetContent({
                  id: shape.id,
                  data: shape.data,
                });
              }
            });
          }
        });

        if (designData)
          tmpDesignItems.push(<DesignItem key={i} designData={designData} />);
      });
    setDesignItems(tmpDesignItems);
  };

  React.useEffect(() => {
    window.top.addEventListener("slide.display", (event) => {
      const slideId = event.data.slideId;
      const slideData = slide(slideId).slideData();

      const direction = slideData.direction;
      const capacity = String(slideData.sentences.length);

      if (!designs[direction]) designs[direction] = {};
      if (!designs[direction][capacity]) designs[direction][capacity] = [];

      if (designs[direction][capacity].length == 0) {
        designs[direction][capacity].push(null);

        preloader.show();
        apiService({
          url: "/api/style/get",
          data: {
            direction: direction,
            capacity: capacity,
          },
          success: (r) => {
            designs[direction][capacity] = r;
            setDesigns(designs);
            arrangeDesignItems(designs[direction][capacity]);
            allDesigns.push(designs[direction][capacity]);
            preloader.hide();
          },
        });
        return;
      }

      try {
        arrangeDesignItems(designs[direction][capacity]);
      } catch (error) {}
    });
  }, []);

  if (designItems.length == 0)
    return <h4 className={"text-center text-white"}>עיצוב מצגת אוטומטי</h4>;

  return designItems;
}
