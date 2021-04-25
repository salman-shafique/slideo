import React, { useEffect } from 'react';
import session from '../../session';

export default function Popup(props) {
    const classNames = `slidepopup ${props.visible ? 'slidepopup--visible' : undefined}`

    const setPopupPosition = (width, height, point, shape, parentNode) => {
        const popupWidth = parentNode.offsetWidth;
        const popupHeight = parentNode.offsetHeight;

        if (point.x >= width * 1 / 3 && point.x > popupWidth) {
            // SECTION 1 (RIGHT)

            const left = point.x - popupWidth + 12;
            let top = point.y - popupHeight;

            top = top > 0 ? top : 0;

            parentNode.style.left = left + 'px';
            parentNode.style.top = top + 'px';

        } else if (point.y <= height - popupHeight - 20) {
            // SECTION 2 (TOP LEFT)

            let left = point.x + 24;
            const top = point.y;

            left = left > 25 ? left : 25;

            parentNode.style.left = left + 'px';
            parentNode.style.top = top + 'px';

        } else {
            // SECTION 3 (BOTTOM LEFT)
            let left = point.x + shape.width + 40;
            let top = point.y - popupHeight;

            top = top > 0 ? top : 0;
            left = left >= width - popupWidth + 20 ? width - popupWidth + 20 : left;

            parentNode.style.left = left + 'px';
            parentNode.style.top = top + 'px';
        }
    }

    const initPopup = (container, parentNode) => {
        if (!container)
            return;

        const svgViewBox = container.contentDocument.children[0]?.viewBox?.baseVal;

        if (!svgViewBox)
            return;

        const normalized = {
            width: container.offsetWidth / svgViewBox.width,
            height: container.offsetHeight / svgViewBox.height
        }

        const shape = {
            height: props.shape.size.height * normalized.height,
            width: props.shape.size.width * normalized.width
        }

        const point = {
            x: (props.shape.size.x + props.shape.translate.startingE) * normalized.width,
            y: (props.shape.size.y + props.shape.size.height + props.shape.translate.startingF) * normalized.height
        }

        setPopupPosition(container.offsetWidth, container.offsetHeight, point, shape, parentNode);
    }

    useEffect(() => {
        const parentNode = document.getElementById(props.parent);
        const slideContainer = document.getElementById(session.CURRENT_SLIDE);

        // only init popup when shape is active
        if (!props.shape) {
            return;
        }

        // This if needed to avoid quick popup position render
        if (!parentNode.offsetHeight)
            return;

        initPopup(slideContainer, parentNode);

        const observer = new ResizeObserver(() => {
            initPopup(slideContainer, parentNode);
        });

        observer.observe(parentNode);

        return () => {
            observer.unobserve(parentNode);
        };
    });


    return (
        <div className={classNames} >
            { props.children}
        </div>
    );
}