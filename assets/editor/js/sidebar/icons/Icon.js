import React from "react";
import session from "Editor/js/session";
import selectIcon from "Editor/js/shapes/icon/selectIcon";
import createNewIcon from "Editor/js/shapes/icon/createNewIcon";

export default function Icon({ iconData }) {
    const onClick = () => {
        if (session.SELECTED_ELEMENTS.length == 1) {
            const g = session.SELECTED_ELEMENTS[0].shape;
            const alt = g.getAttribute("alt");
            if (alt.includes("icon|") ||
                alt == "newicon") {
                const shapeId = session.SELECTED_ELEMENTS[0].shapeId;
                selectIcon(session.CURRENT_SLIDE, shapeId, iconData);
                return;
            }
        }
        // Add new icon
        createNewIcon({ icon: iconData, keyword: iconData.keyword });
    }

    return (
        <img onClick={onClick} className={"icon-item col-4 py-2 rounded"} src={iconData.url} />
    )
}