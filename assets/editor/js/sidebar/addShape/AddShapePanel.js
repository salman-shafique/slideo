import React from "react";

export default function AddShapePanel() {

    return (
        <>
            <div id="Images_Tool" className="tool">
                <i className="fas fa-images"></i>
                <p className="single-line">Images</p>
            </div>
            <div id="Icons_Tool" className="tool">
                <i className="fas fa-icons"></i>
                <p className="single-line">Icons</p>
            </div>
            <div id="Text_Tool" className="tool">
                <i className="fas fa-font"></i>
                <p className="single-line">Text</p>
            </div>
        </>
    )
}