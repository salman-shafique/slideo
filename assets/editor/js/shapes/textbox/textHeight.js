import reactToDOM from "Editor/js/utils/reactToDOM";
import React from "react";


export default function textHeight(td){
    const textSpan = reactToDOM(
        <span style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
        </span>
    );

    td.appendChild(textSpan);
    textSpan.innerText = td.innerText
    const textHeight = textSpan.offsetHeight

    td.removeChild(td.childNodes[1])

    return textHeight
}