
import select from "Editor/js/utils/selector/select";
import selectAll from "Editor/js/utils/selector/selectAll";
/**
 * 
 * @param {string} keyword 
 */
export default function toggleKeyword(keyword) {
    // Images
    const allImageContainers = selectAll('#Images_Panel div.image-container[data-keyword]');
    allImageContainers.forEach(e => e.style.display = "none");
    // search-keyword
    const keywordsToDisable = selectAll('#Images_Panel div[data-keyword].search-keyword');
    keywordsToDisable.forEach(e => e.style.opacity = "0.7");

    // search-keyword
    const searchKeyword = select('#Images_Panel div[data-keyword="' + keyword + '"].search-keyword');
    searchKeyword.style.opacity = "1";
    searchKeyword.style.display = "";
    searchKeyword.classList.add("active");

    // Scroll into view
    select("#Keywords_list").scrollLeft = searchKeyword.offsetLeft - searchKeyword.offsetWidth / 2;

    const imageContainerToShow = select('#Images_Panel div.image-container[data-keyword="' + keyword + '"]');
    if (imageContainerToShow)
        imageContainerToShow.style.display = "";
}