import React from "react";
import session from "Editor/js/session";
import getMousePosition from "Editor/js/shapes/actions/drag/utils/getMousePosition";
import Events from "Editor/js/Events";

export default function ResizeCirle({ g, cx, cy, direction }) {

    const startResizing = (event) => {
        session.SCALING_DIRECTION = direction;
        session.SAVED_MOUSE_POS = getMousePosition(event);
        session.SHAPE_STATE = "RESIZING";
        // Trigger event
        Events.shape.resize.started();
    }

    return (
        <circle
            onMouseDown={startResizing}
            xmlns="http://www.w3.org/2000/svg"
            cx={cx}
            cy={cy}
            r="150"
            fill="white"
            strokeWidth="50"
            stroke="gray"
            direction={direction}
        />

    )
}