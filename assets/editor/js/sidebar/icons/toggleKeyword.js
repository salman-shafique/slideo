
import select from "Editor/js/utils/selector/select";
import selectAll from "Editor/js/utils/selector/selectAll";
/**
 * 
 * @param {string} keyword 
 */
export default function toggleKeyword(keyword) {
    // Icons
    let allIcons = selectAll('#Icons_Panel img[data-keyword]');
    allIcons.forEach(e => e.style.display = "none");
    // search-keyword
    let keywordsToDisable = selectAll('#Icons_Panel div[data-keyword].search-keyword');
    keywordsToDisable.forEach(e => e.style.opacity = "0.7");

    // search-keyword
    let searchKeyword = select('#Icons_Panel div[data-keyword="' + keyword + '"].search-keyword');
    searchKeyword.style.opacity = "1";
    searchKeyword.style.display = "";
    searchKeyword.classList.add("active");

    // Scroll into view
    select("#Icon_keywords_list").scrollLeft = searchKeyword.offsetLeft - searchKeyword.offsetWidth / 2;
    
    let iconsToShow = selectAll('#Icons_Panel img[data-keyword="' + keyword + '"]');
    iconsToShow.forEach(e => e.style.display = "");
}