import React, { useState } from 'react';
import KeywordContainer from './KeywordContainer';

import ColorCircle from "Editor/js/sidebar/components/ColorCircle/index";
import constants from "Editor/js/constants";

import apiService from "Editor/js/utils/apiService";

export default function SearchSection({ keywords, setKeywords, icons, setIcons }) {
    const [searchValue, setSearchValue] = useState('');

    const handleInput = (e) => {
        setSearchValue(e.target.value);
    }

    const handleSearch = () => {
        if (searchValue === '')
            return;

        if (keywords.filter(item => item.keyword.toLowerCase() === searchValue.toLowerCase()).length)
            return;

        setKeywords([{
            keyword: searchValue,
            active: true
        }].concat(keywords.map(keyword => { return { ...keyword, active: false }})));


        if (icons.filter(item => item.keyword.toLowerCase() === searchValue.toLowerCase()).length)
            return;
    
        apiService({
            "url": "/api/editor/call/Icon/find_icons",
            "data": {
                "keyword": searchValue,
                "limit": 50
            },
            "success": (response) => {       
                setIcons(icons.concat({
                    keyword: searchValue,
                    icons: response.body
                }));
            }
        });

        setSearchValue('');
    }

    return (
        <div className="search-section">
            <div className="input-group mb-2">
                <input type="text" onChange={ handleInput } value={ searchValue }
                    className="form-control keyword-search" placeholder="Search all icons" />
                <div className="input-group-append">
                    <span onClick={ handleSearch } className="input-group-text search-button cursor-pointer text-white bg-secondary">
                        <i className="fas fa-search"></i>
                    </span>
                </div>
            </div>
            <div className="row m-0 rounded">
                <KeywordContainer keywords={ keywords } setKeywords={ setKeywords } />
                <div className="col-9 m-0 d-flex align-items-center my-white-text">Icon Color</div>
                <div className="col-3 position-static pt-1">
                    <ColorCircle key={"icon"} SHAPE_TYPE={constants.SHAPE_TYPES.ICON} />
                </div>
            </div>
        </div>
    );
}