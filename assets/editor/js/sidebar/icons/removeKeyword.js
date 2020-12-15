
import select from "Editor/js/utils/selector/select";
import selectAll from "Editor/js/utils/selector/selectAll";
import toggleKeyword from "./toggleKeyword";

/**
 * 
 * @param {string} keyword 
 */
export default function removeKeyword(keyword) {
    console.log(keyword);
    const searchKeywordToHide = select('#Icons_Panel div[data-keyword="' + keyword + '"].search-keyword');
    searchKeywordToHide.classList.remove("active");
    searchKeywordToHide.style.display = "none";

    const iconContainerToHide = select('#sideBarIcons div[data-keyword="' + keyword + '"].icon-container');
    iconContainerToHide.style.display = "none";

    // Select next one
    const aKeywordEl = select('#Icons_Panel div[data-keyword].search-keyword.active');
    if (aKeywordEl) {
        toggleKeyword(aKeywordEl.getAttribute("data-keyword"));
        return;
    }
    select("#sideBarIconsEmpty").style.display = "";
}