
import select from "Editor/js/utils/selector/select";
import selectAll from "Editor/js/utils/selector/selectAll";
/**
 * 
 * @param {string} keyword 
 */
export default function toggleKeyword(keyword) {
    // Images
    let allImages = selectAll('#Images_Panel img[data-keyword]');
    allImages.forEach(e => e.style.display = "none");
    // search-keyword
    let keywordsToDisable = selectAll('#Images_Panel div[data-keyword].search-keyword');
    keywordsToDisable.forEach(e => e.style.opacity = "0.7");

    // search-keyword
    let searchKeyword = select('#Images_Panel div[data-keyword="' + keyword + '"].search-keyword');
    searchKeyword.style.opacity = "1";
    searchKeyword.style.display = "";
    searchKeyword.classList.add("active");

    // Scroll into view
    select("#Keywords_list").scrollLeft = searchKeyword.offsetLeft - searchKeyword.offsetWidth / 2;
    
    let imagesToShow = selectAll('#Images_Panel img[data-keyword="' + keyword + '"]');
    imagesToShow.forEach(e => e.style.display = "");
}