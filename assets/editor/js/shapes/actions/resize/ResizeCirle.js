import React from "react";

export default function ResizeCirle({ g, cx, cy, direction }) {




    // contentDocument.addEventListener('mousedown', startDrag);
    // contentDocument.addEventListener('touchstart', startDrag);
    // contentDocument.addEventListener('mousemove', drag);
    // contentDocument.addEventListener('touchmove', drag);
    // contentDocument.addEventListener('mouseup', endDrag);
    // contentDocument.addEventListener('touchend', endDrag);
    // contentDocument.addEventListener('touchcancel', endDrag);
    return (
        <circle
            onMouseDown={console.log("alp")}
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