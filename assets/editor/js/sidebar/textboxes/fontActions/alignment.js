import React from "react";
import session from "Editor/js/session";
import constants from "Editor/js/constants";
import getShapeType from "Editor/js/shapes/actions/drag/utils/getShapeType";
import shape from "Editor/js/entity/shape";
import Events from "Editor/js/Events";

export default function AlignmentBtn(props) {
    const [alignmentSelected, setAlignmentSelected] = React.useState(constants.ALIGNMENTS.CENTER);

    /**
     * 
     * @param {SVGGElement} g 
     */
    const getAlignment = (g) => {
        const shapeId = g.getAttribute("shape_id");
        const data = shape(session.CURRENT_SLIDE, shapeId).data();
        if (data)
            return data.alignment;
        return "2";
    }

    React.useEffect(() => {
        Events.listen("shape.selected", (event) => {
            if (!session.INITED) return;
            if (session.SELECTED_ELEMENTS.length != 1) {
                setAlignmentSelected(null);
                return;
            };

            const g = event.data.shape;
            if (getShapeType(g) == constants.SHAPE_TYPES.TEXTBOX)
                setAlignmentSelected(getAlignment(g));

        });
        Events.listen("shape.allReleased", () => {
            setAlignmentSelected(null);
        });
    }, []);


    /**
     * 
     * @param {SVGGElement} g 
     * @param {string} alignment 
     */
    const set = (g, alignment) => {
        const shapeId = g.getAttribute("shape_id");
        const shape_ = shape(session.CURRENT_SLIDE, shapeId);

        shape_.data().alignment = alignment;
        g.querySelector("table").style.textAlign = constants.ALIGNMENTS[alignment];

    }

    const leftAlignment = () => {
        let changed = false;
        session.SELECTED_ELEMENTS.forEach(selectedEl => {
            if (getShapeType(selectedEl.shape) == constants.SHAPE_TYPES.TEXTBOX) {
                set(selectedEl.shape, constants.ALIGNMENTS.LEFT)
                changed = true;
            }
        });

        if (changed)
            setAlignmentSelected(constants.ALIGNMENTS.LEFT);
    }

    const centerAlignment = () => {
        let changed = false;
        session.SELECTED_ELEMENTS.forEach(selectedEl => {
            if (getShapeType(selectedEl.shape) == constants.SHAPE_TYPES.TEXTBOX) {
                set(selectedEl.shape, constants.ALIGNMENTS.CENTER)
                changed = true;
            }
        });

        if (changed)
            setAlignmentSelected(constants.ALIGNMENTS.CENTER);
    }

    const rightAlignment = () => {
        let changed = false;
        session.SELECTED_ELEMENTS.forEach(selectedEl => {
            if (getShapeType(selectedEl.shape) == constants.SHAPE_TYPES.TEXTBOX) {
                set(selectedEl.shape, constants.ALIGNMENTS.RIGHT)
                changed = true;
            }
        });

        if (changed)
            setAlignmentSelected(constants.ALIGNMENTS.RIGHT);
    }
    return (
        <>
            <div className="col-4 p-0 text-center">
                <button onClick={leftAlignment} className={"btn btn-" + (alignmentSelected != constants.ALIGNMENTS.LEFT ? "light" : "secondary")}>
                    <i className="fas fa-align-left"></i>
                </button>
            </div>
            <div className="col-4 p-0 text-center">
                <button onClick={centerAlignment} className={"btn btn-" + (alignmentSelected != constants.ALIGNMENTS.CENTER ? "light" : "secondary")}>
                    <i className="fas fa-align-center"></i>
                </button>
            </div>
            <div className="col-4 p-0 text-center">
                <button onClick={rightAlignment} className={"btn btn-" + (alignmentSelected != constants.ALIGNMENTS.RIGHT ? "light" : "secondary")}>
                    <i className="fas fa-align-right"></i>
                </button>
            </div>
        </>
    )
}
