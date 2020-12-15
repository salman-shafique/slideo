import React from "react";
import session from "Editor/js/session";
import selectH1Image from "Editor/js/shapes/image/selectH1Image";

export default function Image({ imageData }) {
    const onClick = () => {
        if (session.SELECTED_ELEMENTS.length == 1) {
            const g = session.SELECTED_ELEMENTS[0].shape;
            if (g.getAttribute("alt").includes("h1image|")) {
                const shapeId = session.SELECTED_ELEMENTS[0].shapeId;
                selectH1Image(session.CURRENT_SLIDE, shapeId, imageData);
            }
        }
    }

    return (
        <img onClick={onClick} className={"new-image-item col-6 py-2 rounded"} src={imageData.url + '?auto=compress&fit=crop&w=123&h=60'} />
    )
}