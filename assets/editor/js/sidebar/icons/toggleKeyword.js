
import select from "Editor/js/utils/selector/select";
import selectAll from "Editor/js/utils/selector/selectAll";
import createFilter from "Editor/js/sidebar/icons/createFilter";

/**
 * 
 * @param {string} keyword 
 */
export default function toggleKeyword(keyword, rgb = "") {
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
    if (rgb)
        if (iconContainerToShow.getAttribute("rgb") != rgb) {
            const filter = createFilter(rgb.split(" "));
            iconContainerToShow.setAttribute("style","filter: "+filter);
            iconContainerToShow.setAttribute("rgb", rgb);
        }

    iconContainerToShow.style.display = "";
}