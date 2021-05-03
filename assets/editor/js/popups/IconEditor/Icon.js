import React from "react";
import session from "Editor/js/session";
import selectIcon from "Editor/js/shapes/icon/selectIcon";
import createNewIcon from "Editor/js/shapes/icon/createNewIcon";
import highlightIcon from "Editor/js/shapes/icon/highlightIcon";


export default function Icon({ iconData, keyword, forceUpdate }) {
    const onClick = () => {
        const shapes = session.PRESENTATION.slides.filter(slide => slide.slideId === session.CURRENT_SLIDE)[0].shapes.map(shape => shape.data);
        const selectedShapes = session.SELECTED_ELEMENTS.map(shape => shape.shapeId);

        const selectedIcons = shapes.filter(shape => selectedShapes.includes(shape.shape_id.toString()));

        for (const icon of selectedIcons)
            icon.keyword = keyword;

        highlightIcon(iconData);
        forceUpdate();

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

    const getClass = () => {
        if (!session.SELECTED_ELEMENTS[0])
            return;

        const selectedIconUrl = session.SELECTED_ELEMENTS[0].shape.querySelector('image').getAttribute('xlink:href').split('/');
        const selectedIcon = selectedIconUrl[selectedIconUrl.length - 1];
        const popupIconUrl = iconData.url.split('/');
        const popupIcon = popupIconUrl[popupIconUrl.length - 1];

        let iconClass = 'icon-item col-4 py-2 rounded';

        if (popupIcon === selectedIcon)
            iconClass += ' active';

        return iconClass;
    }

    return (
        <img onClick={onClick} iconid={iconData.id} className={getClass()} src={iconData.url} />
    )
}