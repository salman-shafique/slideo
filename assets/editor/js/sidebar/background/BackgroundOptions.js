import React from "react";
import constants from "Editor/js/constants";
import ColorCircle from "Editor/js/sidebar/components/ColorCircle/index";
import slide from "Editor/js/entity/slide";


export default function BackgroundOptions() {
    const [background, setBackground] = React.useState(null);

    React.useEffect(() => {
        window.addEventListener("slide.display", (event) => {
            const slideId = event.data.slideId;
            const slide_ = slide(slideId);
            const slideData = slide_.slideData();
            setBackground(slideData.background.data);
        });
    }, []);

    if (!background) return "";

    return (
        <>
            <div className={"row mx-0 mt-3 bg-white rounded "}>
                <div className={"row col-12 m-0 p-0 " + (background.type == "solidFill" ? "" : "d-none")}>
                    <div className="col-9 d-flex align-items-center">
                        Background Color
                    </div>
                    <div className="col-3 position-static pt-1">
                        <ColorCircle
                            key="bgSolidFill"
                            FILL_TYPE={constants.FILL_TYPES.SOLID_FILL}
                            BACKGROUND
                        />
                    </div>
                </div>
                <div className={"row col-12 m-0 p-0 " + (background.type == "gradFill" ? "" : "d-none")}>
                    <div className="col-9 d-flex align-items-center">
                        Background Color - 1
                    </div>
                    <div className="col-3 position-static pt-1">
                        <ColorCircle
                            key="bgGradFill0"
                            FILL_TYPE={constants.FILL_TYPES.GRADIENT_FILL}
                            GRADIENT_STOP={0}
                            BACKGROUND
                        />
                    </div>
                    <div className="col-9 d-flex align-items-center">
                        Background Color - 2
                </div>
                    <div className="col-3 position-static pt-1">
                        <ColorCircle
                            key="bgGradFill1"
                            FILL_TYPE={constants.FILL_TYPES.GRADIENT_FILL}
                            GRADIENT_STOP={1}
                            BACKGROUND
                        />
                    </div>
                </div>
            </div>

        </>
    )
}