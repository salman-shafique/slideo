import React from "react";
import "./style.css";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import { getOpacity } from "Editor/js/sidebar/components/OpacitySlider/utils";
import shape from "Editor/js/entity/shape";


export default function OpacitySlider({ SHAPE_TYPE }) {
    const [opacity, setOpacity] = React.useState(1.0);

    React.useEffect(() => {
        window.addEventListener("shape.selected", (event) => {
            if (session.SELECTED_ELEMENTS.length != 1) {
                setOpacity(1);
                return;
            };
            const g = event.data.shape;
            if (getShapeType(g) == constants.SHAPE_TYPES.AUTO_SHAPE)
                setOpacity(getOpacity(g));

        });
        window.addEventListener("shape.allReleased", () => {
            setOpacity(1);
        });
    }, []);

    const updateOpacity = (event) => {
        const newOpacity = event.target.value;
        session.SELECTED_ELEMENTS.forEach(selectedEl => {
            if (getShapeType(selectedEl.shape) == constants.SHAPE_TYPES.AUTO_SHAPE) {
                
                // opacity set before - Rm them
                const paths = selectedEl.shape.querySelectorAll("path[fill-opacity]");
                if (paths)
                    paths.forEach(path => {
                        path.removeAttribute("fill-opacity")
                    });

                // Opacity will used seen on g element
                selectedEl.shape.style.opacity = newOpacity;
                shape(selectedEl.shape).data().shape_opacity = newOpacity;
            }
        });
    }

    return (
        <input className="opacity-slider form-range" onChange={updateOpacity} type="range" defaultValue={opacity} min="0" max="1" step="0.01" />
    )
}