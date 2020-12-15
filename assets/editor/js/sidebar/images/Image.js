import React from "react";
import session from "Editor/js/session";
import selectH1Image from "Editor/js/shapes/image/selectH1Image";
import createNewImage from "Editor/js/shapes/image/createNewImage";

export default function Image({ imageData }) {
    const onClick = () => {
        if (session.SELECTED_ELEMENTS.length == 1) {
            const g = session.SELECTED_ELEMENTS[0].shape;
            const alt = g.getAttribute("alt");
            if (
                alt.includes("h1image|") ||
                alt == "slidetitleimage" ||
                alt == "newimage"
            ) {
                const shapeId = session.SELECTED_ELEMENTS[0].shapeId;
                selectH1Image(session.CURRENT_SLIDE, shapeId, imageData);
                return;
            }
        }
        // Add new picture
        createNewImage(imageData);

    }

    return (
        <img onClick={onClick} className={"new-image-item col-6 py-2 rounded"} src={imageData.url + '?auto=compress&fit=crop&w=123&h=60'} />
    )
}