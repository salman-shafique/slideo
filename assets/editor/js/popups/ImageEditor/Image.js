import React from "react";
import session from "Editor/js/session";
import selectH1Image from "Editor/js/shapes/image/selectH1Image";
import createNewImage from "Editor/js/shapes/image/createNewImage";
import highlightImage from "Editor/js/shapes/image/highlightImage";

export default function Image({ imageData, forceUpdate }) {
    const onClick = () => {
        highlightImage(imageData);
        forceUpdate();

        if (session.SELECTED_ELEMENTS.length == 1) {
            const g = session.SELECTED_ELEMENTS[0].shape;
            const alt = g.getAttribute("alt");
            if (
                alt.includes("h1image|") ||
                alt == "slidetitleimage" ||
                alt == "newimage" ||
                alt == "image"
            ) {
                const shapeId = session.SELECTED_ELEMENTS[0].shapeId;
                selectH1Image(session.CURRENT_SLIDE, shapeId, imageData, true);
                return;
            }
        }
        // Add new picture
        createNewImage({ image: imageData, keyword: imageData.keyword });
    }

    return (
        <img onClick={onClick} imageid={imageData.id} className={"new-image-item col-6 py-2 rounded"} src={imageData.url + '?auto=compress&fit=crop&w=123'} />
    )
}