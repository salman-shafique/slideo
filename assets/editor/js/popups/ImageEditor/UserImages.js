import React, { useState, useEffect } from 'react';
import UploadImageArea from "../../sidebar/images/upload/UploadImageArea";
import apiService from "Editor/js/utils/apiService";

export default function UserImages(props) {
    const [userImages, setUserImages] = useState([]);

    useEffect(() => {
        apiService({
            url: "/api/editor/image/userimages",
            success: (images) => {                
                setUserImages(images);
            }
        });
    }, []);

    return (
        <div className="uploadimagearea">
            <UploadImageArea images={ userImages } popup={ true } />    
        </div>
    );
}