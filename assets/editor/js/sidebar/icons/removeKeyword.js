
import select from "Editor/js/utils/selector/select";
import selectAll from "Editor/js/utils/selector/selectAll";
import toggleKeyword from "./toggleKeyword";

/**
 * 
 * @param {string} keyword 
 */
export default function removeKeyword(keyword) {
    let searchKeywordToHide = select('#Icons_Panel div[data-keyword="' + keyword + '"].search-keyword');
    searchKeywordToHide.classList.remove("active");
    searchKeywordToHide.style.display = "none";
    
    let iconsToHide = selectAll('#Icons_Panel img[data-keyword="' + keyword + '"]');
    iconsToHide.forEach(e => {
        e.style.display = "none"
    });

    // Select next one
    let aKeywordEl = select('#Icons_Panel div[data-keyword].search-keyword.active');
    if (aKeywordEl) {
        toggleKeyword(aKeywordEl.getAttribute("data-keyword"));
        return;
    }
    select("#sideBarIconsEmpty").style.display = "";
}