import React, { useState } from 'react';
import Image from './Image';
import apiService from "Editor/js/utils/apiService";
import toastr from '../../components/toastr';

export default function ImageContainer({ images, keyword }) {

    const [currentImages, setImages] = useState(images)
    const [page, setPage] = useState(2);

    const getImages = () => {
        apiService({
            "url": `/api/editor/call/Pexels/find_images`,
            "data": {
                "keyword": keyword,
                "page": page
            },
            "success": (response) => {
                if (response?.body?.length === 1) {
                    toastr.error("There are no more results!");
                    return;
                }
                setImages([...currentImages, ...response.body])
                setPage(page + 1);
            }
        });
    }
    return (
        <div className={"image-container"} data-keyword={keyword}>
            {
                currentImages.map((item, i) => <Image key={i} imageData={item} />)
            }
            <span onClick={() => getImages()} className="input-group-text search-button cursor-pointer text-white bg-secondary" style={{ width: 100, margin: 'auto' }}>Load More</span>
        </div>
    );
}