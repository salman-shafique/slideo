import React from "react";
import session from "Editor/js/session";
import selectH1Image from "Editor/js/shapes/image/selectH1Image";
import createNewImage from "Editor/js/shapes/image/createNewImage";
import highlightImage from "Editor/js/shapes/image/highlightImage";
import Events from "Editor/js/Events";

export default function Image({ imageData }) {
    const onClick = () => {
        highlightImage(imageData);

        // Add new picture
        createNewImage({ image: imageData, keyword: imageData.keyword });
        Events.slide.preview.update();
    }

    return (
        <img onClick={onClick} imageid={imageData.id} className={"new-image-item col-6 py-2 rounded"} src={imageData.url + '?auto=compress&fit=crop&w=123'} />
    )
}