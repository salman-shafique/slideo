import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import Events from "Editor/js/Events";
import apiService from "Editor/js/utils/apiService";
import toastr from '../../components/toastr';
import session from '../../session';
import slide from "Editor/js/entity/slide";
import shape from "Editor/js/entity/shape";



export default function IconContainer({ icons, keyword }) {
    const [force, setForce] = useState(0);
    const [currentIcons, setIcons] = useState(icons)
    const [page, setPage] = useState(2);

    const forceUpdate = () => {
        setForce(force + 1);
        const selectedShape = session.SELECTED_ELEMENTS[0].shapeId;
        const slide_ = slide(session.CURRENT_SLIDE).slideData();
        const shape_ = slide_.shapes.find(aShape => aShape.data.shape_id == selectedShape);
        const shapeData = shape_.data
        
        if(shapeData.keywords){
            shapeData.keywords[0] = (keyword)
        }else {
            shapeData['keywords'] = [keyword]
        }
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
         session.SAVED = true;
         Events.saveChange.inited();
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