import React, { useEffect, useRef } from 'react';
import Keyword from './Keyword';

export default function KeywordContainer({ keywords, setKeywords }) {
    const containerRef = useRef(null);

    const handleActive = (newActive) => {
        setKeywords(keywords.map((keyword, index) => {
            return {
                ...keyword,
                active: newActive === index
            }
        }));
    }

    const handleDelete = (deleted) => {
        setKeywords(keywords.filter((keyword, index) =>
            index !== deleted
        ));
    }

    useEffect(() => {  
        const keywordHtml = Array.from(containerRef.current.children).filter(keywordHtml => keywordHtml.classList.contains('active'))[0];

        if (keywordHtml) {
            containerRef.current.scrollTo(keywordHtml.offsetLeft, 0);
        }
    }, [keywords]);

    return (
        <div ref={ containerRef } className="keywords-list col-12 m-0 p-0">
            {
                keywords.map((item, index) => 
                    <Keyword key={ index } item={ item } handleActive={() => { handleActive(index); }}
                        handleDelete={() => { handleDelete(index); }} />
                )
            }
        </div>
    );
}