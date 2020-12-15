
import select from "Editor/js/utils/selector/select";
import selectAll from "Editor/js/utils/selector/selectAll";
import toggleKeyword from "./toggleKeyword";

/**
 * 
 * @param {string} keyword 
 */
export default function removeKeyword(keyword) {
    const searchKeywordToHide = select('#Images_Panel div[data-keyword="' + keyword + '"].search-keyword');
    searchKeywordToHide.classList.remove("active");
    searchKeywordToHide.style.display = "none";
    
    const imageContainerToHide = select('#Images_Panel div[data-keyword="' + keyword + '"].image-container');
    imageContainerToHide.style.display = "none";

    // Select next one
    const aKeywordEl = select('#Images_Panel div[data-keyword].search-keyword.active');
    if (aKeywordEl) {
        toggleKeyword(aKeywordEl.getAttribute("data-keyword"));
        return;
    }
    select("#sideBarImagesEmpty").style.display = "";
}