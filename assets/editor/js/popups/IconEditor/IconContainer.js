import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import Events from "Editor/js/Events";
import apiService from "Editor/js/utils/apiService";
import toastr from '../../components/toastr';
import session from '../../session';

export default function IconContainer({ icons, keyword }) {
    const [force, setForce] = useState(0);
    const [currentIcons, setIcons] = useState(icons)
    const [page, setPage] = useState(2);

    const forceUpdate = () => {
        setForce(force + 1);
    }

    const getIcons = () => {
        apiService({
            "url": `/api/editor/call/Icon/find_icons`,
            "data": {
                keyword,
                page
            },
            "success": (response) => {
                if (response?.body?.length === 1) {
                    toastr.error("There are no more results!");
                    return;
                }
                setIcons([...currentIcons, ...response.body])
                setPage(page + 1);
            }
        });
    }

    useEffect(() => {
       setIcons(icons)
       if(!session.SAVED){
         Events.saveChange.inited();
         session.SAVED = true;
       }
    }, [icons]);

  

    return (
        <div className={"icon-container"} data-keyword={keyword} style={{ "filter": "invert(100%) sepia(100%) saturate(0%) hue-rotate(46deg) brightness(104%) contrast(102%)" }}>
            {
                currentIcons.map((item, i) => <Icon key={i} keyword={keyword} forceUpdate={forceUpdate} iconData={item} />)
            }
            <span onClick={() => getIcons()} className="input-group-text search-button cursor-pointer text-white bg-secondary" style={{ width: 100, margin: 'auto' }}>Load More</span>
        </div>
    );
}