import React from 'react';

export default function MainSection({ children }) {
    return (
        <div className="main-section">
            <div className="images-gallery custom-scrollbar vertical-scroll">
                <div className="col-12">
                    { children }
                </div>
            </div>
        </div>
    );
}