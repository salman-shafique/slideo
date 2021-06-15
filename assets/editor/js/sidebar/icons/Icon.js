import React from "react";
import createNewIcon from "Editor/js/shapes/icon/createNewIcon";
import highlightIcon from "Editor/js/shapes/icon/highlightIcon";
import Events from "Editor/js/Events";


export default function Icon({ iconData }) {
    const onClick = () => {
        highlightIcon(iconData);

        // Add new icon
        createNewIcon({ icon: iconData, keyword: iconData.keyword });
        Events.slide.preview.update();

    }

    const onDragStart = (e) => {
        e.dataTransfer.setData("iconData", JSON.stringify(iconData));
    }

    return (
        <img onClick={onClick} draggable="true" onDragStart={onDragStart} iconid={iconData.id} className={"icon-item col-4 py-2 rounded"} src={iconData.url} />
    )
}