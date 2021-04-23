import React from 'react';
import IconContainer from './IconContainer';

export default function MainSection({ icons, keyword }) {
    return (
        <div className="main-section">
            <div className="images-gallery custom-scrollbar vertical-scroll">
                <div className="col-12">
                    { 
                        icons ? 'Please Select Icon' : 'Please Search for Icons'
                    }
                    {
                        icons ? <IconContainer icons={ icons } keyword={ keyword } /> : undefined
                    }
                </div>
            </div>
        </div>
    );
}