import select from "Editor/js/utils/selector/select";
import reactToDOM from "Editor/js/utils/reactToDOM";
import appendKeyword from "./appendKeyword";
import toggleKeyword from "./toggleKeyword";
import React from "react";
import ReactDOM from "react-dom";
import Image from "./Image";

export default function appendImages(images, keyword) {
    keyword = keyword.trim();
    // Check keyword
    if (!select('#Keywords_list div[data-keyword="' + keyword + '"].search-keyword'))
        appendKeyword(keyword);

    const sideBarImages = select("#sideBarImages");
    const div = reactToDOM(
        <div className={"image-container"} data-keyword={keyword}>

        </div>
    );
    sideBarImages.append(div);
    const imageEls = [];
    images.forEach((imageData, i) => {
        imageData.keyword = keyword;
        imageEls.push(
            <Image key={i} imageData={imageData} />
        )
    });
    ReactDOM.render(imageEls, div);

    toggleKeyword(keyword);
    select("#sideBarImagesEmpty").style.display = "none";
}