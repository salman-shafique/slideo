
import select from "Editor/js/utils/selector/select";
import selectAll from "Editor/js/utils/selector/selectAll";

/**
 * 
 * @param {string} keyword 
 */
export default function toggleKeyword(keyword) {
    // Icons
    const allIconContainers = selectAll('#Icons_Panel div.icon-container[data-keyword]');
    allIconContainers.forEach(e => e.style.display = "none");
    // search-keyword
    const keywordsToDisable = selectAll('#Icons_Panel div[data-keyword].search-keyword');
    keywordsToDisable.forEach(e => e.style.opacity = "0.7");

    // search-keyword
    const searchKeyword = select('#Icons_Panel div[data-keyword="' + keyword + '"].search-keyword');
    searchKeyword.style.opacity = "1";
    searchKeyword.style.display = "";
    searchKeyword.classList.add("active");

    // Scroll into view
    select("#Icon_keywords_list").scrollLeft = searchKeyword.offsetLeft - searchKeyword.offsetWidth / 2;

    const iconContainerToShow = select('#Icons_Panel div.icon-container[data-keyword="' + keyword + '"]');
    if (iconContainerToShow)
        iconContainerToShow.style.display = "";

    // Empty list
    document.querySelector("#sideBarIconsEmpty").style.display = "none";
}