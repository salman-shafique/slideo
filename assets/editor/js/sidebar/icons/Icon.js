import React from "react";
import createNewIcon from "Editor/js/shapes/icon/createNewIcon";
import highlightIcon from "Editor/js/shapes/icon/highlightIcon";


export default function Icon({ iconData }) {
    const onClick = () => {
        highlightIcon(iconData);

        // Add new icon
        createNewIcon({ icon: iconData, keyword: iconData.keyword });
    }

    return (
        <img onClick={onClick} iconid={iconData.id} className={"icon-item col-4 py-2 rounded"} src={iconData.url} />
    )
}