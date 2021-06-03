import React, { useState } from 'react';
import Icon from './Icon';
import apiService from "Editor/js/utils/apiService";

export default function IconContainer({ icons, keyword }) {
    const [force, setForce] = useState(0);
    const [currentIcons, setIcons] = useState(icons)

    const [page, setPage] = useState(1);


    const forceUpdate = () => {
        setForce(force + 1);
    }

    const getIcons = () => {
            apiService({
                "url": `/api/editor/call/Icon/find_icons`,
                "data": {
                    "keyword": keyword,
                    "limit": 50,
                    "page": page
                },
                "success": (response) => {
                    setIcons([...currentIcons, ...response.body])
                    setPage(page + 1);
                }
            });
    }

    return (
        <div className={"icon-container"} data-keyword={ keyword } style={{"filter":"invert(100%) sepia(100%) saturate(0%) hue-rotate(46deg) brightness(104%) contrast(102%)"}}>
            {
                currentIcons.map((item, i) => <Icon key={ i } keyword={ keyword } forceUpdate={ forceUpdate } iconData={ item } />)
            }
            <span onClick={()=> getIcons()} className="input-group-text search-button cursor-pointer text-white bg-secondary" style={{width: 100, margin: 'auto'}}>Load More</span>  
        </div>
    );
}