import React, { useState } from 'react';
import apiService from "Editor/js/utils/apiService";

export default function useKeyword(apiEndpoint) {
    const [keywords, setKeywords] = useState([]);
    const [data, setData] = useState([]);

    const getActiveKeyword = () => {
        const found = keywords.filter(item => item.active)[0];

        return found ? found.keyword : null;
    }

    const getActiveData = () => {
        const activeKeyword = getActiveKeyword();
        const found = data.filter(data => data.keyword === activeKeyword)[0];
        return found ? found.data : null;
    }

    const fetchNewData = (searchKeyword) => {
        if (searchKeyword === '')
            return;

        if (keywords.filter(item => item.keyword.toLowerCase() === searchKeyword.toLowerCase()).length)
            return;


        setKeywords([{
            keyword: searchKeyword,
            active: true
        }]
        .concat(keywords.map(keyword => { return { ...keyword, active: false } })));

        if (data.filter(item => item.keyword.toLowerCase() === searchKeyword.toLowerCase()).length)
            return;

        apiService({
            "url": `/api/editor/call/${apiEndpoint}`,
            "data": {
                "keyword": searchKeyword
            },
            "success": (response) => {
                setData(data.concat({
                    keyword: searchKeyword,
                    data: response.body
                }));
            }
        });

    }

    return {
        keywords,
        setKeywords,
        setData,
        getActiveKeyword,
        getActiveData,
        fetchNewData
    }
}