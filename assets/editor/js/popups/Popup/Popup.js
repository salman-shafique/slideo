import React from 'react';

export default function Popup(props) {
    const classNames = `slidepopup ${props.visible ? 'slidepopup--visible' : undefined}`

    const parentNode = document.getElementById(props.parent);

    (props.offset.left > 0)
        ? (parentNode.style.left = props.offset.left + 'px') && (parentNode.style.right = 'initial')
        : (parentNode.style.left = 'initial') && (parentNode.style.right = 0)

    parentNode.style.top = props.offset.top + 'px';

    return (
        <div className={classNames} >
            { props.children}
        </div>
    );
}