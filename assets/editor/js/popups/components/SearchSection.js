import React, { useState, useEffect, useRef } from 'react';
import KeywordContainer from './KeywordContainer';

export default function SearchSection({ keywords, setKeywords, fetchNewData, children }) {
    const [searchValue, setSearchValue] = useState('');
    const inputRef = useRef(null);

    const handleInput = (e) => {
        setSearchValue(e.target.value);
    }

    const handleSearch = () => {
        fetchNewData(searchValue);        
        setSearchValue('');
    }

    useEffect(() => {
        const listerner = (e) => {
            if (e.key !== 'Enter') {
                return;
            }
            
            handleSearch();
            inputRef.current.blur();
        }

        inputRef.current.addEventListener('keydown', listerner);

        return () => {
            if (inputRef.current)
                inputRef.current.removeEventListener('keydown', listerner);
        }
    }, [searchValue]);

    return (
        <div className="search-section">
            <div className="input-group mb-2">
                <input ref={ inputRef } type="text" onChange={ handleInput } value={ searchValue }
                    className="form-control keyword-search" placeholder="Search all icons" />
                <div className="input-group-append">
                    <span onClick={ handleSearch } className="input-group-text search-button cursor-pointer text-white bg-secondary">
                        <i className="fas fa-search"></i>
                    </span>
                </div>
            </div>
            <div className="row m-0 rounded">
                <KeywordContainer keywords={ keywords } setKeywords={ setKeywords } />
                { children }
            </div>
        </div>
    );
}