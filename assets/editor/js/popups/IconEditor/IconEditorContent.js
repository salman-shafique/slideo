import React, { useState } from 'react';
import SearchSection from './SearchSection';
import MainSection from './MainSection';

export default function IconEditorContent() {
    const [keywords, setKeywords] = useState([]);
    const [icons, setIcons] = useState([]);

    const getActiveKeyword = () => {
        const found = keywords.filter(item => item.active)[0];

        return found ? found.keyword : null;
    }

    const getActiveIcons = () => {
        const activeKeyword = getActiveKeyword();
        const found = icons.filter(data => data.keyword === activeKeyword)[0];

        return found ? found.icons : null;
    }

    return (
        <>
            <SearchSection keywords={ keywords } setKeywords={ setKeywords } icons={ icons } setIcons={ setIcons } />
            <MainSection icons={ getActiveIcons() } keyword={ getActiveKeyword() } />
        </>
    );
}