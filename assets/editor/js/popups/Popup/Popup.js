import React, { useEffect } from 'react';
import session from '../../session';

export default function Popup(props) {
    const classNames = `slidepopup ${props.visible ? 'slidepopup--visible' : undefined}`

    const setPopupPosition = (width, height, point, shape, parentNode) => {
        const scale = session.SELECTED_ELEMENTS[0].scale.startingA;
        const popupWidth = parentNode.offsetWidth;
        const popupHeight = parentNode.offsetHeight;
        // console.log('point',point);
        let left = null;
        let top = null;

        if (point.x >= width * 1 / 3 && point.x > popupWidth) {
            // SECTION 1 (RIGHT)
            left = point.x - popupWidth;
            top = point.y - popupHeight;

            top = top > 0 ? top : 0;
        } else if (point.y <= height - popupHeight - 20) {
            // SECTION 2 (TOP LEFT)
            left = point.x + 24;
            top = point.y;

            left = left > 25 ? left : 25;
        } else {
            // SECTION 3 (BOTTOM LEFT)
            left = point.x + shape.width * scale + 40;
            top = point.y - popupHeight;

            top = top > 0 ? top : 0;
        
            left = left >= width - popupWidth + 20 ? width - popupWidth + 20 : left;
        }


        parentNode.style.left = left + 'px';
        parentNode.style.top = top + 'px';
    }

    const initPopup = (container, parentNode) => {
        if (!container)
            return;

        const svgViewBox = container.contentDocument.children[0]?.viewBox?.baseVal;
        const scale = session.SELECTED_ELEMENTS[0].scale.startingA;

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

        let correctStartingE = props.shape.translate.startingE;
        let correctStartingF = props.shape.translate.startingF;
        
        correctStartingE = correctStartingE - (props.shape.size.x - props.shape.size.x * scale);
        correctStartingF = correctStartingF - (props.shape.size.y - props.shape.size.y * scale);

        const point = {
            x: (props.shape.size.x + correctStartingE) * normalized.width,
            y: (props.shape.size.y + props.shape.size.height * scale + correctStartingF) * normalized.height
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