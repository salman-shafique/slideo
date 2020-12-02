
import select from "Editor/js/utils/selector/select";
import selectAll from "Editor/js/utils/selector/selectAll";
import toggleKeyword from "./toggleKeyword";

/**
 * 
 * @param {string} keyword 
 */
export default function removeKeyword(keyword) {
    let elementsToHide = selectAll('#Images_Panel *[data-keyword="' + keyword + '"]');
    elementsToHide.forEach(e => e.remove());

    // Select next one
    let aKeywordEl = select('#Images_Panel div[data-keyword].search-keyword');
    if(aKeywordEl){
        toggleKeyword(aKeywordEl.getAttribute("data-keyword"));
        return;
    }
    select("#sideBarImagesEmpty").style.display = "";
}