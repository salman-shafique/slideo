import React from 'react';

export default function Keyword({ item, handleActive, handleDelete }) {
    return (
        <div data-keyword={ item.keyword } className={`search-keyword ${ item.active ? 'active' : '' }`}>
            <span onClick={ handleActive } data-keyword={ item.keyword } className="keyword-text text-dark">{ item.keyword }</span>&emsp;
            <span className="text-dark keyword-dismiss" onClick={ handleDelete } data-keyword={ item.keyword }><i data-keyword={ item.keyword } className="fas fa-times"></i></span>
        </div>
    );
}