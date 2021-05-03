import React from 'react';
import Image from './Image';

export default function IconContainer({ images, keyword }) {
    return (
        <div className={"image-container"} data-keyword={ keyword }>
            {
                images.map((item, i) => <Image key={ i } imageData={ item } />)
            }
        </div>
    );
}