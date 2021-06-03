import React, {useState} from 'react';
import Image from './Image';
import apiService from "Editor/js/utils/apiService";

export default function IconContainer({ images, keyword }) {
 
    const [currentImages, setImages] = useState(images)
    const [page, setPage] = useState(1);

    const getImages = () => {
        apiService({
            "url": `/api/editor/call/Pexels/find_images`,
            "data": {
                "keyword": keyword,
                "page": page
            },
            "success": (response) => {
                setImages([...currentImages, ...response.body])
                setPage(page + 1);
            }
        });
}
    return (
        <div className={"image-container"} data-keyword={ keyword }>
            {
                currentImages.map((item, i) => <Image key={ i } imageData={ item } />)
            }
            <span onClick={()=> getImages()} className="input-group-text search-button cursor-pointer text-white bg-secondary" style={{width: 100, margin: 'auto'}}>Load More</span>  
        </div>
    );
}