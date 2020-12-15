import React from "react";
import session from "Editor/js/session";
import selectIcon from "Editor/js/shapes/icon/selectIcon";

export default function Icon({ iconData }) {
    const onClick = () => {
        if (session.SELECTED_ELEMENTS.length == 1) {
            const g = session.SELECTED_ELEMENTS[0].shape;
            if (g.getAttribute("alt").includes("icon|")) {
                const shapeId = session.SELECTED_ELEMENTS[0].shapeId;
                selectIcon(session.CURRENT_SLIDE,shapeId,iconData);
            }
        }
    }

    return (
        <img onClick={onClick} className={"icon-item col-4 py-2 rounded"} src={iconData.url} />
    )
}