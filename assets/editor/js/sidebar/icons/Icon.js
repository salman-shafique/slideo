import React from "react";
import session from "Editor/js/session";


export default function Icon({ iconData }) {
    const onClick = () => {
        console.log(session.SELECTED_ELEMENTS, iconData);

    }


    return (
        <img onClick={onClick} className={"icon-item col-4 py-2 rounded"} src={iconData.url} />
    )
}