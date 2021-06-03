import React, { useState, useEffect } from 'react';
import SearchSection from '../components/SearchSection';
import MainSection from '../components/MainSection';
import UserImages from './UserImages';
import ImageContainer from './ImageContainer';

import useKeyword from '../hooks/useKeyword';

export default function ImageEditorContent(props) {
    const [uploadImages, setUploadImages] = useState(false);
    const hook = useKeyword('Pexels/find_images');
    const activeImages = hook.getActiveData();

    useEffect(() => {
        hook.setKeywords(hook.keywords.concat({ active: true, keyword: props.keyword.toLowerCase() ? props.keyword.toLowerCase() : null }));
        hook.fetchNewData(props.keyword.toLowerCase() ? props.keyword.toLowerCase() : null)
    }, [props.keyword])

    return (
        <>
            {
                !uploadImages ?
                    <SearchSection keywords={hook.keywords} setKeywords={hook.setKeywords} fetchNewData={hook.fetchNewData} /> :
                    undefined
            }
            <MainSection>
                {
                    activeImages && !uploadImages ? <ImageContainer images={activeImages} keyword={props.keyword.toLowerCase()} /> : undefined
                }
            </MainSection>
            {
                uploadImages ? <UserImages /> : undefined
            }
            <div className="control-section">
                {
                    uploadImages ?
                        <button onClick={() => { setUploadImages(false); }} className="btn btn-danger btn-sm btn-full horizontal-text-clip">Cancel</button> :
                        <button onClick={() => { setUploadImages(true); }} className="btn btn-primary btn-sm btn-full control-button horizontal-text-clip">My Images</button>
                }
            </div>
        </>
    );
}