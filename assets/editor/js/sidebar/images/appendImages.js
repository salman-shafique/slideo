import select from "Editor/js/utils/selector/select";
import stringToDOM from "Editor/js/utils/stringToDOM";
import appendKeyword from "./appendKeyword";
import toggleKeyword from "./toggleKeyword";

export default function appendImages(images, keyword) {
    // Check keyword
    if (!select('#Keywords_list div[data-keyword="' + keyword + '"].search-keyword'))
        appendKeyword(keyword);

    let sideBarImages = select("#sideBarImages");
    images.forEach(imageData => {
        let image = stringToDOM(
            '<img data-keyword="' + keyword + '" class="image-item" src="' + imageData.url + '?auto=compress&fit=crop&w=123&h=60"></img>'
        );
        sideBarImages.append(image);
    });
    toggleKeyword(keyword);
    select("#sideBarImagesEmpty").style.display = "none";
}