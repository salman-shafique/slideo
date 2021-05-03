import React from 'react';
import Keyword from './Keyword';

export default function KeywordContainer({ keywords, setKeywords }) {
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

    return (
        <div className="keywords-list col-12 m-0 p-0">
            {
                keywords.map((item, index) => 
                    <Keyword key={ index } item={ item } handleActive={() => { handleActive(index); }}
                        handleDelete={() => { handleDelete(index); }} />
                )
            }
        </div>
    );
}